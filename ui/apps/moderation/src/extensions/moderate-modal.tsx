import * as React from 'react';
import ReactDOM from 'react-dom';
import singleSpaReact from 'single-spa-react';
import DS from '@akashaorg/design-system';
import { I18nextProvider, useTranslation } from 'react-i18next';
import { RootExtensionProps } from '@akashaorg/typings/ui';
import { BrowserRouter as Router } from 'react-router-dom';
import { useModeration, withProviders, useGetLogin, ThemeWrapper } from '@akashaorg/ui-awf-hooks';
import { BASE_DECISION_URL } from '../services/constants';

const { ModerateModal, ErrorLoader } = DS;

const ModerateModalComponent = (props: RootExtensionProps) => {
  const { extensionData } = props;

  const loginQuery = useGetLogin();

  const { t } = useTranslation('app-moderation-ewa');

  const handleModalClose = () => {
    props.singleSpa.navigateToUrl(location.pathname);
  };

  const itemType = React.useMemo(() => {
    if (extensionData.hasOwnProperty('itemType') && typeof extensionData.itemType === 'string') {
      return extensionData.itemType;
    }
  }, [extensionData]);

  const moderateMutation = useModeration();

  const onModerate = React.useCallback(
    (dataToSign: Record<string, string>) => {
      moderateMutation.mutate({
        dataToSign,
        contentId: extensionData.entryId,
        contentType: itemType,
        url: `${BASE_DECISION_URL}/moderate`,
        isPending: extensionData.status === 'pending',
      });
    },

    [itemType, extensionData, moderateMutation],
  );

  React.useEffect(() => {
    if (moderateMutation.status === 'success') {
      handleModalClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [moderateMutation]);

  return (
    <ModerateModal
      titleLabel={t('Make a Decision')}
      altTitleLabel={t('Review a Decision')}
      decisionLabel={t('Decision')}
      optionLabels={[t('Delist'), t('Keep')]}
      optionValues={['Delist', 'Keep']}
      descriptionLabel={t('Evaluation')}
      descriptionPlaceholder={t('Please explain the reason(s)')}
      footerText1Label={t('If you are unsure, you can refer to our')}
      footerLink1Label={t('Code of Conduct')}
      footerUrl1={'/legal/code-of-conduct'}
      cancelLabel={t('Cancel')}
      errorText={moderateMutation.error ? `${moderateMutation.error}` : ''}
      user={loginQuery.data?.pubKey || ''}
      requesting={moderateMutation.status === 'loading'}
      isReview={extensionData.status !== 'pending'}
      closeModal={handleModalClose}
      onModerate={onModerate}
    />
  );
};

const Wrapped = (props: RootExtensionProps) => {
  return (
    <Router>
      <I18nextProvider i18n={props.plugins?.translation?.i18n}>
        <ModerateModalComponent {...props} />
      </I18nextProvider>
    </Router>
  );
};

const reactLifecycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: withProviders(Wrapped),
  renderType: 'createRoot',
  errorBoundary: (err, errorInfo, props: RootExtensionProps) => {
    if (props.logger) {
      props.logger.error(`${JSON.stringify(err)}, ${errorInfo}`);
    }
    return (
      <ThemeWrapper {...props}>
        <ErrorLoader type="script-error" title="Error in moderate modal" details={err.message} />
      </ThemeWrapper>
    );
  },
});

export const bootstrap = reactLifecycles.bootstrap;

export const mount = reactLifecycles.mount;

export const unmount = reactLifecycles.unmount;
