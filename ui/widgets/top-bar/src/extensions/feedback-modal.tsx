import * as React from 'react';
import singleSpaReact from 'single-spa-react';
import ReactDOM from 'react-dom';
import { RootComponentProps } from '@akashaproject/ui-awf-typings';
import DS from '@akashaproject/design-system';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { withProviders } from '@akashaproject/ui-awf-hooks';

const { FeedbackModal } = DS;

const FeedbackModalContainer = (props: RootComponentProps) => {
  const { t } = useTranslation('ui-widget-topbar');
  const location = useLocation();

  const handleFeedbackModalClose = () => {
    props.singleSpa.navigateToUrl(location.pathname);
  };

  return (
    <FeedbackModal
      titleLabel={t("We'd love to hear your feedback!")}
      subtitleLabel={t('If you find any bugs or problems, please let us know')}
      openAnIssueLabel={t('Open an Issue')}
      emailUsLabel={t('Email Us')}
      footerTextLabel={t(
        'Join our Discord channel to meet everyone, say "Hello!", provide feedback and share ideas.',
      )}
      footerLinkText1Label={t('Join in')}
      footerLinkText2Label={t('Discord')}
      openIssueLink={'https://github.com/AKASHAorg/akasha-world-framework/issues/new/choose'}
      emailUsLink={'mailto:feedback@ethereum.world'}
      joinDiscordLink={'https://discord.gg/A5wfg6ZCRt'}
      closeModal={handleFeedbackModalClose}
    />
  );
};

const Wrapped = (props: RootComponentProps) => (
  <Router>
    <FeedbackModalContainer {...props} />
  </Router>
);

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
