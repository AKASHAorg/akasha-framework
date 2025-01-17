import { WorldConfig } from '@akashaorg/typings/lib/ui';
import getSDK from '@akashaorg/core-sdk';
import { AkashaApp, SortOrder } from '@akashaorg/typings/lib/sdk/graphql-types-new';
import { ILogger } from '@akashaorg/typings/lib/sdk/log';
import { GetAppsByPublisherDidQuery } from '@akashaorg/typings/lib/sdk/graphql-operation-types-new';
import { DeepTarget } from './type-utils';

/**
 * Retrieves the latest version of a published app from the Akasha Registry.
 *
 * @param appName - The name of the app to retrieve.
 * @param logger - An optional logger instance to use for logging.
 * @returns The latest version of the app, including its source, version, ID, creation date, and manifest data.
 * @throws Error if the PUBLIC_INDEXING_DID environment variable is not defined.
 */
export const getRemoteExtensionLatestVersion = async (appName: string, logger?: ILogger) => {
  const sdk = getSDK();
  const did = sdk.services.common.misc.getIndexingDID();
  const log = logger || console;
  if (!did) {
    throw new Error('Indexing DID is not defined');
  }
  const app = await sdk.services.gql.client.GetAppsByPublisherDID(
    {
      id: did,
      first: 1,
      filters: { where: { name: { equalTo: appName } } },
      sorting: { createdAt: SortOrder.Desc },
    },
    { context: { source: sdk.services.gql.contextSources.default } },
  );
  if (!('akashaAppList' in app.node)) {
    log.warn(`An error occurred while fetching app ${appName}`);
    return;
  }
  const appNode = app?.node?.akashaAppList?.edges.length
    ? app?.node?.akashaAppList?.edges[0].node
    : undefined;

  if (!appNode?.id) {
    log.warn(`No app found for publisher ${did} and name ${appName}`);
    return;
  }

  if (!appNode.releasesCount || !appNode.releases.edges.length) {
    log.warn(`No published versions found for app ${appName}`);
    return;
  }

  return appNode;
};

export const getReleaseById = async (releaseId: string) => {
  const sdk = getSDK();
  try {
    const release = await sdk.services.gql.client.GetAppReleaseByID({ id: releaseId });
    if (!release && !release?.node) {
      // @todo handle release not found or release id mismatch
      return null;
    }
    if (release.node && 'id' in release.node) {
      return release.node;
    }
    return null;
  } catch (err) {
    // @todo emit event with error
    return null;
  }
};

type AkashaNode = DeepTarget<
  GetAppsByPublisherDidQuery,
  ['node', 'akashaAppList', 'edges', 0, 'node']
>;

export const getRemoteLatestExtensionInfos = async (
  extensions: { name: string }[],
): Promise<AkashaNode[]> => {
  const pkgInfos: AkashaNode[] = [];
  for (const extension of extensions) {
    const app = await getRemoteExtensionLatestVersion(extension.name);
    if (app) {
      pkgInfos.push(app);
    }
  }
  return pkgInfos;
};

export const filterExtensionsByLocation = (extNames: string[], worldConfig: WorldConfig) => {
  const result = {
    remote: [] as { name: string }[],
    local: [] as (Partial<AkashaApp> & { source: string; isLocal: boolean })[],
  };
  extNames.forEach(ext => {
    const localExtension = worldConfig.registryOverrides.find(extension => extension.name === ext);
    if (localExtension) {
      result.local.push({ ...localExtension, isLocal: true });
    } else {
      result.remote.push({ name: ext });
    }
  });
  return result;
};

export const getWorldDefaultExtensions = async (worldConfig: WorldConfig) => {
  const defaultWorldExt = [
    worldConfig.layout,
    worldConfig.homepageApp,
    worldConfig.extensionsApp,
    ...worldConfig.defaultApps,
    ...worldConfig.defaultWidgets,
  ];
  const { local, remote } = filterExtensionsByLocation(defaultWorldExt, worldConfig);

  const remoteExtensionData = await getRemoteLatestExtensionInfos(remote);

  return [...local, ...remoteExtensionData];
};

export const getUserInstalledExtensions = async () => {
  const sdk = getSDK();
  const resp = await sdk.services.appSettings.getAll();
  return resp.data;
};
