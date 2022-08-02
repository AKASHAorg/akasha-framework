import 'systemjs-webpack-interop/auto-public-path';
import routes, { COC, DG, PP, TOS, TOU } from './routes';
import {
  IAppConfig,
  MenuItemAreaType,
  MenuItemType,
  IntegrationRegistrationOptions,
  LogoTypeSource,
} from '@akashaorg/typings/ui';

export const register: (opts: IntegrationRegistrationOptions) => IAppConfig = opts => ({
  mountsIn: opts.layoutConfig?.pluginSlotId,
  routes: {
    devGuidelines: routes[DG],
    codeOfConduct: routes[COC],
    privacyPolicy: routes[PP],
    termsOfService: routes[TOS],
    termsOfUse: routes[TOU],
  },
  loadingFn: () => import('./components'),
  i18nNamespace: ['app-legal'],
  menuItems: {
    label: 'Legal',
    type: MenuItemType.App,
    logo: { type: LogoTypeSource.ICON, value: 'legal' },
    area: [MenuItemAreaType.OtherArea],
    subRoutes: Object.keys(routes).map((routeLabel, idx) => ({
      label: routeLabel,
      index: idx,
      route: routes[routeLabel],
      type: MenuItemType.Internal,
    })),
  },
});
