import 'systemjs-webpack-interop/auto-public-path';
import {
  IntegrationRegistrationOptions,
  IWidgetConfig,
} from '@akashaproject/ui-awf-typings/lib/app-loader';
/**
 * All widgets must export an object like this:
 */
export const register: (opts: IntegrationRegistrationOptions) => IWidgetConfig = opts => {
  return {
    mountsIn: opts.layoutConfig.cookieWidgetSlotId,
    loadingFn: () => import('./components'),
    activeWhen: () => true,
    // does not have routes
    routes: {
      rootRoute: null,
    },
  };
};
