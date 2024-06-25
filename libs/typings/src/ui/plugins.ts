import { IUserStore } from './store';

/**
 * Interface defining plugin configuration object
 */
export interface IPluginConf {
  [namespace: string]: {
    [key: string]: any;
  };
}

/**
 * Type defining param of a function which fetches profile info
 * @internal
 **/
type GetUserInfo = {
  profileDID: string;
};

/**
 * Interface defining method for fetching profile info inside a profile plugin
 */
export interface IGetProfileInfo<T> {
  getProfileInfo(params: GetUserInfo): Promise<{ data: T; error: string }>;
}

/**
 * Interface defining a profile plugin
 */
export interface IProfilePlugin<T> {
  get userStore(): IUserStore<T>;
  getProfileInfo: IGetProfileInfo<T>['getProfileInfo'];
}
