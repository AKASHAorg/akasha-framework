import initDI from '@akashaproject/sdk-core';
import DIContainer from '@akashaproject/sdk-runtime/lib/DIContainer';
import AppLoader from '@akashaproject/sdk-ui-plugin-loader';
import {
  ILoaderConfig,
  IPluginEntry,
  IWidgetEntry,
} from '@akashaproject/ui-awf-typings/lib/app-loader';
import initChannel, { globalChannel } from './channel';
import * as operators from 'rxjs/operators';
import { forkJoin, from, zip, of, concat } from 'rxjs';
import startApi from './api';

export function init(appLoaderOptions: {
  config: ILoaderConfig;
  initialApps: { plugins?: IPluginEntry[]; widgets?: IWidgetEntry[] };
}) {
  // tslint:disable-next-line:no-console
  const di: DIContainer = initDI();
  // general channel to send service calls
  const channel = initChannel(di);
  const apiChannels = startApi(channel, di);
  // tslint:disable-next-line:no-console
  console.log(apiChannels, 'api channels!!!!!!!');
  // tslint:disable-next-line:no-console
  console.log(globalChannel, 'global replay channel!!!!');
  const appLoader = new AppLoader(
    appLoaderOptions.config,
    appLoaderOptions.initialApps,
    apiChannels,
    globalChannel,
  );
  return Object.assign({}, apiChannels, {
    appLoader,
  });
}
