import singleSpaReact from 'single-spa-react';
import React from 'react';
import ReactDOMClient from 'react-dom/client';
import { IRootComponentProps, RootComponentType } from '@akashaorg/typings/lib/ui';
import { CreateLifecyclesOptions } from '../utils/create-lifecycles';

const reactLifecycles = (rootComponent: RootComponentType, options: CreateLifecyclesOptions) => {
  return singleSpaReact({
    React,
    ReactDOMClient,
    loadRootComponent: async (props: IRootComponentProps) => {
      const mod = await rootComponent();
      if (!mod.default) {
        options.onModuleError?.(new Error('Root component must export a default React component'), {
          name: props.name,
          domElement: props.domElement,
        });
        return null;
      }
      return mod.default as React.ElementType;
    },
    errorBoundary: (err, info, props: IRootComponentProps) => {
      options.onRenderError(err, props);
      return null;
    },
  });
};

export default reactLifecycles;
