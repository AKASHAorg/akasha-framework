import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from '@tanstack/react-router';
import Stack from '@akashaorg/design-system-core/lib/components/Stack';
import Card from '@akashaorg/design-system-core/lib/components/Card';
import Text from '@akashaorg/design-system-core/lib/components/Text';
import ErrorLoader from '@akashaorg/design-system-core/lib/components/ErrorLoader';
import Button from '@akashaorg/design-system-core/lib/components/Button';
import { useAkashaStore, useRootComponentProps } from '@akashaorg/ui-core-hooks';
import { NotificationEvents, NotificationTypes } from '@akashaorg/typings/lib/ui';
import ExtensionReleasePublishForm from '@akashaorg/design-system-components/lib/components/ExtensionReleasePublishForm';
import { DRAFT_EXTENSIONS, DRAFT_RELEASES } from '../../../constants';
import { NetworkStatus } from '@apollo/client';
import Modal from '@akashaorg/design-system-core/lib/components/Modal';
import Spinner from '@akashaorg/design-system-core/lib/components/Spinner';
import { AkashaAppApplicationType } from '@akashaorg/typings/lib/sdk/graphql-types-new';

type EditTestReleasePageProps = {
  extensionId: string;
  networkStatus: NetworkStatus;
  extensionName?: string;
  extensionType?: AkashaAppApplicationType;
};

const getDraftExtension = (extensionId: string, authenticatedDID: string) => {
  try {
    const draftExtensions = JSON.parse(
      localStorage.getItem(`${DRAFT_EXTENSIONS}-${authenticatedDID}`),
    );
    if (!draftExtensions) {
      return null;
    }
    return draftExtensions.find(ext => ext.id === extensionId);
  } catch (error) {
    return error;
  }
};

export const EditTestReleasePage: React.FC<EditTestReleasePageProps> = ({
  extensionId,
  extensionName,
  extensionType,
  networkStatus,
}) => {
  const navigate = useNavigate();
  const { t } = useTranslation('app-extensions');

  const { uiEvents, baseRouteName, getCorePlugins } = useRootComponentProps();
  const navigateTo = getCorePlugins().routing.navigateTo;
  const uiEventsRef = React.useRef(uiEvents);
  const [isLoadingTestMode, setIsLoadingTestMode] = useState(false);
  const testModeRedirectUrl = useRef<string>();

  const {
    data: { authenticatedDID },
  } = useAkashaStore();

  const showErrorNotification = React.useCallback((title: string) => {
    uiEventsRef.current.next({
      event: NotificationEvents.ShowNotification,
      data: {
        type: NotificationTypes.Error,
        title,
      },
    });
  }, []);

  const draftReleases = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem(`${DRAFT_RELEASES}-${authenticatedDID}`)) || [];
    } catch (error) {
      showErrorNotification(error);
    }
  }, [authenticatedDID, showErrorNotification]);

  const localRelease = draftReleases.find(release => release.applicationID === extensionId);

  const draftExtension = getDraftExtension(extensionId, authenticatedDID);
  const draftExtensionError = draftExtension instanceof Error || false;

  const baseAppInfo = useMemo(() => {
    if (draftExtension) {
      return {
        id: draftExtension.id,
        name: draftExtension.name,
        applicationType: draftExtension.applicationType,
      };
    }
    // if a published extension exists for this id use the data from it
    if (networkStatus === NetworkStatus.ready && extensionName && extensionType) {
      return {
        id: extensionId,
        name: extensionName,
        applicationType: extensionType,
      };
    }
  }, [draftExtension, networkStatus, extensionName, extensionType, extensionId]);

  useEffect(() => {
    if (draftExtensionError) {
      showErrorNotification(draftExtension);
    }
  }, [draftExtension, draftExtensionError, showErrorNotification]);

  useEffect(() => {
    const testModeLoader = getCorePlugins().testModeLoader;
    let unsubscribe;
    let timeout;
    if (testModeLoader) {
      unsubscribe = testModeLoader.subscribe(({ currentStatus }) => {
        if (
          currentStatus &&
          currentStatus ===
            getCorePlugins().testModeLoader.getStaticStatusCodes().status
              .EXTENSION_TEST_LOAD_SUCCESS
        ) {
          timeout = setTimeout(() => {
            window.location.href = `${window.location.origin}/${testModeRedirectUrl.current}`;
          }, 3000);
        }
      });
    }
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [baseAppInfo, getCorePlugins, navigateTo]);

  const handleConnectButtonClick = () => {
    navigateTo?.({
      appName: '@akashaorg/app-auth-ewa',
      getNavigationUrl: (routes: Record<string, string>) => {
        return `${routes.Connect}?${new URLSearchParams({
          redirectTo: `${baseRouteName}/release-manager/${extensionId}/edit-test-release`,
        }).toString()}`;
      },
    });
  };

  const handleClickSubmit = appReleaseFormData => {
    // remove the old local test release so we can update it
    const newLocalDraftReleases = draftReleases.filter(
      draftRelease => draftRelease.applicationID !== extensionId,
    );
    // update the local draft release to reflect the form data
    const newLocalRelease = {
      ...localRelease,
      version: appReleaseFormData?.versionNumber,
      source: appReleaseFormData?.sourceURL,
      description: appReleaseFormData?.description,
    };
    // save the new list of local draft releases in local storage
    localStorage.setItem(
      `${DRAFT_RELEASES}-${authenticatedDID}`,
      JSON.stringify([...newLocalDraftReleases, newLocalRelease]),
    );
    const testModeLoader = getCorePlugins().testModeLoader;

    if (!baseAppInfo) {
      return showErrorNotification(`This release does not belong to an extension.`);
    }

    testModeLoader.load({
      applicationID: localRelease.applicationID,
      source: appReleaseFormData.sourceURL,
      appName: baseAppInfo.name,
      applicationType: baseAppInfo.applicationType,
    });
    testModeRedirectUrl.current = `${baseAppInfo.name}`;
    setIsLoadingTestMode(true);
  };

  const handleClickCancel = () => {
    navigate({
      to: '/release-manager/$extensionId',
      params: { extensionId },
    });
  };

  if (!authenticatedDID) {
    return (
      <ErrorLoader
        type="not-authenticated"
        title={`${t('Uh-oh')}! ${t('You are not connected')}!`}
        details={`${t('To check your extensions you must be connected')} ⚡️`}
      >
        <Button
          variant="primary"
          size="md"
          label={t('Connect')}
          onClick={handleConnectButtonClick}
        />
      </ErrorLoader>
    );
  }

  return (
    <>
      <Modal show={isLoadingTestMode}>
        <Spinner />
        <Text variant="body2" customStyle="px-4 py-2">
          {t('Loading test mode')}
        </Text>
      </Modal>
      <Card padding={0}>
        <Stack spacing="gap-y-2">
          <Stack padding={16}>
            <Text variant="h5" weight="semibold" align="center">
              {t('Release Notes')}
            </Text>
            <ExtensionReleasePublishForm
              defaultValues={{
                versionNumber: localRelease?.version || '',
                description: localRelease?.description || '',
                sourceURL: '',
              }}
              validationLabels={{
                version: t('Version should follow Semantic Versioning standard'),
                descriptionMin: t('Must be at least 10 characters'),
                descriptionMax: t('Must be less than 2000 characters'),
                sourceURL: t('URL is required'),
              }}
              versionNumberLabel={t('Version Number')}
              descriptionFieldLabel={t('Description')}
              descriptionPlaceholderLabel={t('A brief description about this release')}
              sourceURLFieldLabel={t('Source URL')}
              sourceURLPlaceholderLabel={t('Webpack dev server / ipfs')}
              cancelButton={{
                label: t('Cancel'),
                handleClick: handleClickCancel,
              }}
              nextButton={{
                label: t('Test Release'),
                handleClick: handleClickSubmit,
              }}
            />
          </Stack>
        </Stack>
      </Card>
    </>
  );
};
