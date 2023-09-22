import 'systemjs-webpack-interop/auto-public-path';
import {
  IAppConfig,
  MenuItemAreaType,
  IntegrationRegistrationOptions,
  LogoTypeSource,
  RootComponentProps,
} from '@akashaorg/typings/lib/ui';
import routes from './routes';
import { ContentBlockStore } from './plugins/content-block-store';

/**
 * All the plugins must export an object like this:
 */
export const register: (opts: IntegrationRegistrationOptions) => IAppConfig = opts => ({
  mountsIn: opts.layoutConfig?.pluginSlotId,
  routes: {
    ...routes,
  },
  i18nNamespace: ['app-extensions'],
  loadingFn: () => import('./components'),
  title: 'AKASHA Core Extensions',
  menuItems: {
    label: 'Extensions',
    area: [MenuItemAreaType.AppArea],
    logo: { type: LogoTypeSource.ICON, value: 'akasha' },
    subRoutes: [],
  },
  extends: (matcher, loader) => {
    matcher({
      'install-app': loader(() => import('./extensions/install-app')),
    });
  },
});

export const getPlugin = (
  props: RootComponentProps & {
    encodeAppName: (name: string) => string;
    decodeAppName: (name: string) => string;
  },
) => {
  const contentBlockStore = ContentBlockStore.getInstance(props.uiEvents);
  return {
    contentBlockStore: {
      getInfos: contentBlockStore.getContentBlockInfos,
      getMatchingBlock: contentBlockStore.getMatchingBlock,
    },
  };
};
