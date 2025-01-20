import { ParcelConfigObject } from 'single-spa';
import { ExtensionActivity, SupportedUILibs } from './app-loader';
import { RootComponentType } from './extensions';

/**
 * Type defining configuration object for loading an extension point
 **/
export type ExtensionPointInterface = {
  mountsIn: string;
  activeWhen?: ExtensionActivity;
  loadingFn?: () => Promise<ParcelConfigObject>;
  rootComponent?: RootComponentType;
};

/**
 * Interface defining an extension point state store defined as a plugin
 **/
export interface IExtensionPointStorePlugin {
  registerExtensionPoints: (
    extensionPoints: (ExtensionPointInterface & { appName: string })[],
  ) => void;
  registerExtensionPoint(extensionPoint: ExtensionPointInterface & { appName: string }): void;
  getExtensionPoints: () => ExtensionPointInterface[];
  getMatchingExtensions: (
    slotName: string,
    location: Location,
  ) => (ExtensionPointInterface & { appName: string })[];
}
