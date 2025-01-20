import { IRootComponentProps, SupportedUILibs, WidgetInterface } from '@akashaorg/typings/lib/ui';

export type CreateLifecyclesOptions = {
  logger: IRootComponentProps['logger'];
  /**
   * Called when the application failed to render due to an error
   */
  onRenderError?: (error: Error, props?: IRootComponentProps) => void;
  /**
   * Called whenever there is a script error.
   * Can also catch other unhandled errors.
   */
  onScriptError?: (error: Error) => void;
  /**
   * Called when there is an error in importing the module
   * or the imported module is not valid (ex: missing default export)
   */
  onModuleError?: (
    error: Error,
    extensionInfo: {
      name: IRootComponentProps['name'];
      domElement?: IRootComponentProps['domElement'];
    },
  ) => void;
};

export const createLifecycles = async (
  rootComponent: () => Promise<{ default: unknown }>,
  UILib: SupportedUILibs = SupportedUILibs.react,
  options: CreateLifecyclesOptions,
) => {
  if (UILib === SupportedUILibs.react) {
    const reactLifecycles = (await import('../react/react-lifecycles')).default;
    return reactLifecycles(rootComponent, options);
  }
};
