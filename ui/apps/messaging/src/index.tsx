import 'systemjs-webpack-interop/auto-public-path';
import { chatRoute, inboxRoute, settingsRoute } from './routes';
import {
  IAppConfig,
  IntegrationRegistrationOptions,
  MenuItemAreaType,
  MenuItemType,
  LogoTypeSource,
} from '@akashaorg/typings/ui';
import getSDK, { Logger } from '@akashaorg/awf-sdk';
import { filter, mergeMap } from 'rxjs';
import { AUTH_EVENTS } from '@akashaorg/typings/sdk';

export const initialize = (options: IntegrationRegistrationOptions & { logger: Logger }) => {
  const notification: any = options.plugins['@akashaorg/app-notifications'].notification;
  const sdk = getSDK();

  if (notification && typeof notification.notify === 'function') {
    notification.listenLogin(() => {
      const markAsRead$ = sdk.api.globalChannel.pipe(
        filter(
          data =>
            data.event === AUTH_EVENTS.MARK_MSG_READ || data.event === AUTH_EVENTS.NEW_MESSAGES,
        ),
      );

      // get messages for the 1st time
      sdk.api.auth
        .getConversation(null)
        .then(response => {
          notification.notify(
            '@akashaorg/app-messaging',
            response.data.filter(m => !m.read),
          );
        })
        .catch(err => {
          options.logger.error(`Error fetching messages: ${err}`);
        });
      // listen for mark as read
      markAsRead$
        .pipe(
          mergeMap(() => {
            return sdk.api.auth.getConversation(null).then(res => {
              notification.notify(
                '@akashaorg/app-messaging',
                res.data.filter(m => !m.read),
              );
            });
          }),
        )
        .subscribe({
          error: err => {
            options.logger.error(`There was an error when trying to refetch messages: ${err}`);
          },
        });
    });
  }
};

export const register: (opts: IntegrationRegistrationOptions) => IAppConfig = opts => ({
  loadingFn: () => import('./components'),
  mountsIn: opts.layoutConfig?.pluginSlotId,
  i18nNamespace: ['app-messaging'],
  routes: {
    inbox: inboxRoute,
    chat: chatRoute,
    settings: settingsRoute,
  },
  extends: (match, loader) => {
    match({
      'profile-mini-card-footer-extension': loader(
        () => import('./extensions/mini-profile-message-button'),
      ),
      'profile-card-action-extension': loader(() => import('./extensions/profile-message-button')),
    });
  },
  title: 'Messaging | Ethereum World',
  menuItems: {
    label: 'Messaging',
    type: MenuItemType.App,
    logo: { type: LogoTypeSource.ICON, value: 'EnvelopeIcon' },
    area: [MenuItemAreaType.UserAppArea],
    subRoutes: [],
  },
});
