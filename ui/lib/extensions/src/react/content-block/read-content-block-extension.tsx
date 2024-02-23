import React, {
  PropsWithChildren,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import Text from '@akashaorg/design-system-core/lib/components/Text';
import TextLine from '@akashaorg/design-system-core/lib/components/TextLine';
import Stack from '@akashaorg/design-system-core/lib/components/Stack';
import Button from '@akashaorg/design-system-core/lib/components/Button';
import Icon from '@akashaorg/design-system-core/lib/components/Icon';
import { hasOwn, useRootComponentProps } from '@akashaorg/ui-awf-hooks';
import { ContentBlockModes, BlockInstanceMethods } from '@akashaorg/typings/lib/ui';
import { GetContentBlockByIdQuery } from '@akashaorg/typings/lib/sdk/graphql-operation-types-new';
import { useGetContentBlockByIdLazyQuery } from '@akashaorg/ui-awf-hooks/lib/generated/apollo';
import { ExclamationTriangleIcon } from '@akashaorg/design-system-core/lib/components/Icon/hero-icons-outline';
import { ParcelConfigObject } from 'single-spa';
import { BlockParcel } from './block-parcel';
import { MatchingBlock } from './index';

export type ReadContentBlockExtensionProps = {
  blockRef?: React.RefObject<BlockInstanceMethods>;
  errorTitle: string;
  errorDescription: string;
  refreshLabel: string;
  notInstalledTitle: string;
  notInstalledDescription1: string;
  notInstalledDescription2: string;
  onError?: (error: Error) => void;
} & (
  | {
      blockID: string;
    }
  | {
      blockData: GetContentBlockByIdQuery['node'];
      matchingBlocks?: MatchingBlock[];
      error?: string;
      onRefresh?: () => void;
    }
);

export const ReadContentBlockExtension: React.FC<
  PropsWithChildren<ReadContentBlockExtensionProps>
> = props => {
  const {
    blockRef,
    errorTitle,
    errorDescription,
    refreshLabel,
    notInstalledTitle,
    notInstalledDescription1,
    notInstalledDescription2,
    children,
    onError,
    ...remainingProps
  } = props;
  const { getExtensionsPlugin } = useRootComponentProps();
  const contentBlockStoreRef = useRef(getExtensionsPlugin()?.contentBlockStore);
  const [state, setState] = useState<{
    parcels: (MatchingBlock & { config: ParcelConfigObject })[];
    isMatched: boolean;
  }>({
    parcels: [],
    isMatched: false,
  });
  const [fetchBlockInfo, blockInfoQuery] = useGetContentBlockByIdLazyQuery();
  const blockDataError = useMemo(() => {
    return hasOwn(remainingProps, 'blockData')
      ? remainingProps?.error
      : blockInfoQuery.error?.message;
  }, [remainingProps, blockInfoQuery]);
  const blockData = useMemo(() => {
    if (hasOwn(remainingProps, 'blockData')) {
      if (remainingProps.blockData && hasOwn(remainingProps.blockData, 'id')) {
        return remainingProps.blockData;
      }
    }
    if (blockInfoQuery.data?.node && hasOwn(blockInfoQuery.data?.node, 'id')) {
      return blockInfoQuery.data?.node;
    }
    return null;
  }, [remainingProps, blockInfoQuery]);
  const matchingBlocks: MatchingBlock[] = useMemo(() => {
    const matchingBlocks = hasOwn(remainingProps, 'blockData')
      ? remainingProps?.matchingBlocks
      : null;
    if (matchingBlocks) return matchingBlocks;
    return !blockData ? [] : contentBlockStoreRef.current.getMatchingBlocks(blockData);
  }, [blockData, remainingProps]);
  const blockId = React.useMemo(() => {
    if (hasOwn(remainingProps, 'blockID')) {
      return remainingProps.blockID;
    }
    return '0';
  }, [remainingProps]);

  useLayoutEffect(() => {
    const resolveConfigs = async () => {
      const newBlocks = [];

      for (const block of matchingBlocks) {
        try {
          const config = await block.blockInfo.loadingFn({
            blockInfo: { ...block.blockInfo, mode: ContentBlockModes.READONLY },
            blockData: block.blockData,
          })();
          newBlocks.push({ ...block, config });
        } catch (err) {
          console.error(err);
        }
      }

      setState({
        parcels: newBlocks,
        isMatched: true,
      });
    };

    if (
      matchingBlocks &&
      matchingBlocks.length &&
      matchingBlocks.length !== state.parcels.length &&
      !state.isMatched
    ) {
      resolveConfigs().catch(err => console.error('failed to load content blocks', err));
    } else if (
      matchingBlocks &&
      !matchingBlocks.length &&
      !state.isMatched &&
      blockInfoQuery.called &&
      !blockInfoQuery.loading
    ) {
      setState({
        parcels: [],
        isMatched: true,
      });
    }
  }, [blockInfoQuery.called, blockInfoQuery.loading, matchingBlocks, remainingProps, state]);

  useEffect(() => {
    if (hasOwn(remainingProps, 'blockID')) {
      fetchBlockInfo({
        variables: {
          id: remainingProps.blockID,
        },
      }).catch(err => console.error('Failed to fetch content block. Error', err));
    }
  }, [fetchBlockInfo, remainingProps]);

  const appInfo = useMemo(() => {
    if (blockData) {
      return blockData.appVersion?.application;
    }
  }, [blockData]);

  return (
    <React.Suspense
      fallback={
        <Stack fullWidth={true} spacing="gap-y-1" customStyle="mb-2">
          <TextLine animated={true} width="w-full" />
          <TextLine animated={true} width="w-2/3" />
        </Stack>
      }
    >
      {blockDataError && (
        <Stack direction="row">
          <Stack
            background={{ light: 'warningLight', dark: 'warningDark' }}
            customStyle="w-2.5 rounded-l-lg border border(warningLight dark:warningDark)"
          />
          <Stack
            spacing="gap-y-1"
            padding="p-2"
            background={{ light: 'warningLight/30', dark: 'warningDark/30' }}
            customStyle="rounded-r-lg border border(warningLight dark:warningDark)"
            fullWidth
          >
            <Stack direction="row" align="center" spacing="gap-x-1">
              <Icon icon={<ExclamationTriangleIcon />} color="warning" />
              <Text variant="button-md">{errorTitle}</Text>
            </Stack>
            <Text variant="footnotes2" weight="normal" customStyle="pl-6">
              {errorDescription}
            </Text>
            <Button
              variant="text"
              size="md"
              label={refreshLabel}
              onClick={() => {
                if (hasOwn(remainingProps, 'blockID')) {
                  blockInfoQuery.refetch({
                    id: remainingProps?.blockID,
                  });
                }

                if (hasOwn(remainingProps, 'blockData')) {
                  remainingProps.onRefresh?.();
                }
              }}
              customStyle="ml-auto mt-auto"
            />
          </Stack>
        </Stack>
      )}
      {!state.parcels.length && !state.isMatched && (
        <Stack fullWidth={true} spacing="gap-y-1" customStyle="mb-2">
          <TextLine animated={true} width="w-full" />
          <TextLine animated={true} width="w-2/3" />
        </Stack>
      )}
      {!state.parcels.length && state.isMatched && appInfo && (
        <Stack
          spacing="gap-y-2"
          padding="p-4"
          background={{ light: 'grey9', dark: 'grey1' }}
          customStyle="rounded-[20px]"
        >
          <Stack direction="row" spacing="gap-x-1">
            <Text variant="button-sm">
              {appInfo.displayName} {notInstalledTitle}
            </Text>
            <Button variant="text" label={'Install'} customStyle="ml-auto" />
          </Stack>
          <Text variant="footnotes2" weight="normal">
            {notInstalledDescription1} {appInfo.displayName} {notInstalledDescription2}
          </Text>
        </Stack>
      )}
      {children}
      {state.parcels.map((matchingBlock, index) => {
        return (
          <BlockParcel
            key={index}
            mode={ContentBlockModes.READONLY}
            matchingBlock={matchingBlock}
            blockId={blockId}
            index={index}
            blockRef={blockRef}
            onError={onError}
          />
        );
      })}
    </React.Suspense>
  );
};
