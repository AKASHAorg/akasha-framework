import * as React from 'react';
import i18next from 'i18next';
import ReactDOM from 'react-dom';
import { useQueryClient } from 'react-query';
import Fetch from 'i18next-fetch-backend';
import singleSpaReact from 'single-spa-react';
import DS from '@akashaproject/design-system';
import Backend from 'i18next-chained-backend';
import LocalStorageBackend from 'i18next-localstorage-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { I18nextProvider, initReactI18next, useTranslation } from 'react-i18next';
import { BrowserRouter as Router, useLocation } from 'react-router-dom';
import { RootComponentProps } from '@akashaproject/ui-awf-typings';
import { ENTRY_KEY } from '@akashaproject/ui-awf-hooks/lib/use-posts.new';
import { PROFILE_KEY } from '@akashaproject/ui-awf-hooks/lib/use-profile.new';
import { COMMENT_KEY } from '@akashaproject/ui-awf-hooks/lib/use-comments.new';
import {
  useLoginState,
  useErrors,
  moderationRequest,
  withProviders,
  useReasons,
} from '@akashaproject/ui-awf-hooks';
import { BASE_REPORT_URL } from '../services/constants';

const { ReportModal, ToastProvider } = DS;

const ReportModalComponent = (props: RootComponentProps) => {
  const { logger, activeModal } = props;

  const [requesting, setRequesting] = React.useState<boolean>(false);
  const [success, setSuccess] = React.useState<boolean>(false);

  const [, errorActions] = useErrors({ logger });

  const [loginState] = useLoginState({
    onError: errorActions.createError,
  });

  const [reasons, reasonsActions] = useReasons({ onError: errorActions.createError });

  const { t } = useTranslation();
  const location = useLocation();
  const queryClient = useQueryClient();

  React.useEffect(() => {
    reasonsActions.fetchReasons({ active: true });
  }, []);

  const handleModalClose = () => {
    props.singleSpa.navigateToUrl(location.pathname);
  };

  const contentType = React.useMemo(() => {
    if (activeModal.hasOwnProperty('contentType') && typeof activeModal.contentType === 'string') {
      return activeModal.contentType;
    }
  }, [activeModal]);

  const updateOnSuccess = (isSuccess: boolean) => {
    // this method utilises react-query to update reported state depending on contentType
    if (contentType === 'post') {
      queryClient.setQueryData<unknown>([ENTRY_KEY, activeModal.entryId], prev => ({
        ...prev,
        reported: true,
        reason: reasons[0],
      }));
    }
    if (contentType === 'reply') {
      queryClient.setQueryData<unknown>([COMMENT_KEY, activeModal.entryId], prev => ({
        ...prev,
        reported: true,
        reason: reasons[0],
      }));
    }
    if (contentType === 'account') {
      queryClient.setQueryData<unknown>([PROFILE_KEY, activeModal.entryId], prev => ({
        ...prev,
        reported: true,
        reason: reasons[0],
      }));
    }
    return setSuccess(isSuccess);
  };

  const onReport = (dataToSign: Record<string, unknown>) => {
    moderationRequest.modalClickHandler({
      dataToSign,
      setRequesting,
      contentId: activeModal.entryId,
      contentType: contentType,
      url: `${BASE_REPORT_URL}/new`,
      modalName: 'report-modal',
      logger: props.logger,
      callback: updateOnSuccess,
    });
  };

  return (
    <ToastProvider autoDismiss={true} autoDismissTimeout={5000}>
      <ReportModal
        titleLabel={t(`Report ${contentType === 'account' ? activeModal.user : contentType}`)}
        successTitleLabel={t('Thank you for helping us keep Ethereum World safe! 🙌')}
        successMessageLabel={t(
          `We will investigate this ${contentType} and take appropriate action.`,
        )}
        optionsTitleLabel={t('Please select a reason')}
        optionLabels={reasons.map((el: string) => t(el))}
        optionValues={reasons}
        descriptionLabel={t('Explanation')}
        descriptionPlaceholder={t('Please explain your reason(s)')}
        footerText1Label={t('If you are unsure, you can refer to our')}
        footerLink1Label={t('Code of Conduct')}
        footerUrl1={'/legal/code-of-conduct'}
        footerText2Label={t('and')}
        footerLink2Label={t('Terms of Service')}
        footerUrl2={'/legal/terms-of-service'}
        cancelLabel={t('Cancel')}
        reportLabel={t('Report')}
        blockLabel={t('Block User')}
        closeLabel={t('Close')}
        user={loginState.pubKey ? loginState.pubKey : ''}
        contentId={activeModal.entryId}
        contentType={contentType}
        requesting={requesting}
        success={success}
        closeModal={handleModalClose}
        onReport={onReport}
      />
    </ToastProvider>
  );
};

const Wrapped = (props: RootComponentProps) => {
  const { logger } = props;

  i18next
    .use(initReactI18next)
    .use(Backend)
    .use(LanguageDetector)
    .use({
      type: 'logger',
      log: logger.info,
      warn: logger.warn,
      error: logger.error,
    })
    .init({
      fallbackLng: 'en',
      ns: ['moderation-app'],
      saveMissing: false,
      saveMissingTo: 'all',
      load: 'languageOnly',
      debug: true,
      cleanCode: true,
      keySeparator: false,
      defaultNS: 'moderation-app',
      backend: {
        backends: [LocalStorageBackend, Fetch],
        backendOptions: [
          {
            prefix: 'i18next_res_v0',
            expirationTime: 24 * 60 * 60 * 1000,
          },
          {
            loadPath: '/locales/{{lng}}/{{ns}}.json',
          },
        ],
      },
    });

  return (
    <Router>
      <React.Suspense fallback={<></>}>
        <I18nextProvider i18n={i18next}>
          <ReportModalComponent {...props} />
        </I18nextProvider>
      </React.Suspense>
    </Router>
  );
};

const reactLifecycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: withProviders(Wrapped),
  errorBoundary: (err, errorInfo, props: RootComponentProps) => {
    if (props.logger) {
      props.logger.error(`${JSON.stringify(err)}, ${errorInfo}`);
    }
    return <div>!</div>;
  },
});

export const bootstrap = reactLifecycles.bootstrap;

export const mount = reactLifecycles.mount;

export const unmount = reactLifecycles.unmount;
