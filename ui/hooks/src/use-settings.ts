import { useQuery } from '@tanstack/react-query';
import getSDK from '@akashaorg/awf-sdk';
import { logError } from './utils/error-handler';

export const SETTING_KEY = 'Notification-Settings';

function convertArray(array: [[string, string | number | boolean]]) {
  return Object.fromEntries(array);
}

async function saveSettings(app: string, options: any /* [[string, string | number | boolean]] */) {
  if (!options || !app) return;

  const sdk = getSDK();

  const fetchExistingSettings = await sdk.services.settings.get(app);
  const existingSettings = fetchExistingSettings.data?.options;

  let settings = null;

  if (existingSettings && existingSettings.length > 0) {
    const optionsConverted = convertArray(options);
    const existingSettingsConverted = convertArray(existingSettings);

    Object.assign(existingSettingsConverted, optionsConverted);
    settings = Object.keys(existingSettingsConverted).map(key => [
      key,
      existingSettingsConverted[key],
    ]);
  } else {
    settings = options;
  }

  const res = await sdk.services.settings.set(app, settings);
  return res;
}

/**
 * Hook to save app's settings using sdk settings service
 * @param app - The app's name for example @akashaorg/app-akasha-verse
 * @param options - Array of option pairs [optionName, value]
 * @example useSaveSettings hook
 * ```typescript
 * const saveSettings = useSaveSettings('@akashaorg/app-akasha-verse', [['key', 'value']]);
 * ```
 */
export function useSaveSettings(app: string, options: any) {
  return useQuery([SETTING_KEY, app], () => saveSettings(app, options), {
    enabled: !!options,
    onError: (err: Error) => logError('useSaveSettings', err),
    onSuccess: data => data,
  });
}

const getSettings = async (app: string) => {
  const sdk = getSDK();

  return sdk.services.settings.get(app);
};

/**
 * Hook to get saved settings for an app
 * @example useGetSettings hook
 * ```typescript
 * const savedSettingsQuery = useGetSettings('@akashaorg/app-akasha-verse');
 *
 * const savedSettings = savedSettingsQuery.data;
 * ```
 */
export function useGetSettings(app: string) {
  return useQuery([SETTING_KEY, app], () => getSettings(app), {
    enabled: !!app,
    onError: (err: Error) => logError('useGetSettings', err),
  });
}
