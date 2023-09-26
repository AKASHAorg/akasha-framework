import React from 'react';
import ReactDOM from 'react-dom';
import singleSpaReact from 'single-spa-react';
import ErrorLoader from '@akashaorg/design-system-core/lib/components/ErrorLoader';
import { RootComponentProps } from '@akashaorg/typings/lib/ui';
import { withProviders } from '@akashaorg/ui-awf-hooks';

import App from './App';

const reactLifecycles = singleSpaReact({
  React,
  ReactDOMClient: ReactDOM,
  rootComponent: withProviders(App),
  errorBoundary: (error, errorInfo, props: RootComponentProps) => {
    if (props.logger) {
      props.logger.error(`${JSON.stringify(error)}, ${errorInfo}`);
    }
    return (
      <ErrorLoader type="script-error" title="Error in profile plugin" details={error.message} />
    );
  },
});

export const bootstrap = reactLifecycles.bootstrap;

export const mount = reactLifecycles.mount;

export const unmount = reactLifecycles.unmount;
