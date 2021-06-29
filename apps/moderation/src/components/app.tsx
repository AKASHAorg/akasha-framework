import * as React from 'react';
import DS from '@akashaproject/design-system';
import { IAkashaError, RootComponentProps } from '@akashaproject/ui-awf-typings';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-chained-backend';
import Fetch from 'i18next-fetch-backend';
import LocalStorageBackend from 'i18next-localstorage-backend';

import AppRoutes from './app-routes';

const { ThemeSelector, lightTheme, darkTheme, Box } = DS;

export default class Application extends React.Component<RootComponentProps> {
  public state: { errors: any } = {
    errors: {},
  };
  public componentDidCatch(error: Error, errorInfo: any) {
    if (this.props.logger) {
      this.props.logger.error('moderation-app error %j %j', error, errorInfo);
    }
    if (!this.state.errors['caught.critical']) {
      this.setState({
        errors: {
          'caught.critical': {
            error: new Error(`${error} \n Additional info: \n ${errorInfo}`),
            critical: false,
          },
        },
      });
    }
  }
  public handleError(err: IAkashaError) {
    if (this.props.logger) {
      this.props.logger.error('moderation-app error %j', err);
    }
    if (!this.state.errors[err.errorKey]) {
      this.setState({
        errors: {
          [err.errorKey]: err,
        },
      });
    }
  }
  render() {
    const { logger } = this.props;

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
        ns: ['moderation-ewa'],
        saveMissing: false,
        saveMissingTo: 'all',
        load: 'languageOnly',
        debug: true,
        cleanCode: true,
        keySeparator: false,
        defaultNS: 'moderation-ewa',
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
      <Box width="100vw">
        <React.Suspense fallback={<>Loading</>}>
          <ThemeSelector
            settings={{ activeTheme: 'Light-Theme' }}
            availableThemes={[lightTheme, darkTheme]}
          >
            <I18nextProvider i18n={i18next}>
              <AppRoutes {...this.props} onError={this.handleError} />
            </I18nextProvider>
          </ThemeSelector>
        </React.Suspense>
      </Box>
    );
  }
}
