import 'systemjs-webpack-interop/auto-public-path';
import {
  IntegrationRegistrationOptions,
  IWidgetConfig,
} from '@akashaproject/ui-awf-typings/lib/app-loader';

/**
 * All widgets must export an object like this:
 */
export const register: (opts: IntegrationRegistrationOptions) => IWidgetConfig = opts => ({
  loadingFn: () => import('./components'),
  title: 'Ethereum World',
  i18nNamespace: ['ui-widget-sidebar'],
  mountsIn: opts.layoutConfig?.sidebarSlotId,
  activeWhen: () => true,
});
