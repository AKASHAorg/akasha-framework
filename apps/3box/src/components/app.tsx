import React, { PureComponent } from 'react';
import { I18nextProvider } from 'react-i18next';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  RouteComponentProps,
  /* Redirect, */
} from 'react-router-dom';
import MyBoxProfile from './my-box-profile';
import BoxSettings from './box-settings';
import BoxProfile from './3box-profile';
import DS from '@akashaproject/design-system';
import {
  default as subRoutes,
  rootRoute,
  EDIT_PAGE,
  SETTINGS_PAGE,
  MY_PROFILE_PAGE,
} from '../routes';
import ErrorInfoCard from './error-info-card';

const { ThemeSelector, lightTheme, darkTheme } = DS;

const PageNotFound = () => {
  return (
    <div>
      This page is unknown to <code>3Box app</code>
    </div>
  );
};

export default class App extends PureComponent<any> {
  public state: { errors: any } = {
    errors: {},
  };
  public componentDidCatch(error: Error, errorInfo: any) {
    console.error(error, errorInfo, 'critical error');
    this.setState({
      errors: {
        'caught.critical': {
          error: new Error(`${error} \n Additional info: \n ${errorInfo}`),
          critical: true,
        },
      },
    });
  }
  public componentDidMount() {
    // catch all errors (in case of uncaught errors occures)
    // if an error bubbles up till here, it's generally uncaught one.
    // treat it as critical because we don't know about it
    window.onerror = (message, source, col, line, _error) => {
      this.setState({
        errors: {
          'uncaught.critical': {
            error: {
              message,
              stack: `Line: ${line} \nColumn: ${col} \nSource: ${source}`,
            },
            critical: true,
          },
        },
      });
    };
  }
  public render() {
    const { i18n, sdkModules, channelUtils } = this.props;

    return (
      <React.Suspense fallback={<>Loading</>}>
        <I18nextProvider i18n={i18n ? i18n : null}>
          <ThemeSelector
            settings={{ activeTheme: 'Light-Theme' }}
            availableThemes={[lightTheme, darkTheme]}
            style={{ height: '100%' }}
            plain={true}
          >
            <ErrorInfoCard errors={this.state.errors}>
              <Router>
                {/* Make the edit page default landing page for this app */}
                {/* <Redirect from={rootRoute} to={subRoutes[EDIT_PAGE]} exact={true} /> */}
                <Switch>
                  <Route
                    path={subRoutes[EDIT_PAGE]}
                    render={routeProps => (
                      <MyBoxProfile
                        {...routeProps}
                        sdkModules={sdkModules}
                        channelUtils={channelUtils}
                      />
                    )}
                  />
                  <Route
                    path={subRoutes[SETTINGS_PAGE]}
                    render={(routeProps: RouteComponentProps) => (
                      <BoxSettings
                        {...routeProps}
                        sdkModules={sdkModules}
                        channelUtils={channelUtils}
                      />
                    )}
                  />
                  <Route
                    path={subRoutes[MY_PROFILE_PAGE]}
                    render={(routeProps: RouteComponentProps) => (
                      <BoxProfile
                        {...routeProps}
                        sdkModules={sdkModules}
                        channelUtils={channelUtils}
                      />
                    )}
                  />
                  <Route path={rootRoute} component={PageNotFound} />
                </Switch>
              </Router>
            </ErrorInfoCard>
          </ThemeSelector>
        </I18nextProvider>
      </React.Suspense>
    );
  }
}
