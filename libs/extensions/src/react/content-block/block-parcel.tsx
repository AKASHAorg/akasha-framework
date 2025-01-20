import React, { useMemo } from 'react';
import Stack from '@akashaorg/design-system-core/lib/components/Stack';
import { RootParcel } from '../root-parcel';
import { MatchingBlock } from './common.types';
import { BlockInstanceMethods, ContentBlockModes } from '@akashaorg/typings/lib/ui';
import { ParcelConfigObject } from 'single-spa';
import { useRootComponentProps } from '@akashaorg/ui-core-hooks';

export type BlockParcelProps = {
  matchingBlock: MatchingBlock & { config: ParcelConfigObject };
  blockId: string;
  index: number;
  blockRef?: React.RefObject<BlockInstanceMethods>;
  onError?: (error: Error) => void;
} & (
  | { mode: ContentBlockModes.READONLY }
  | {
      mode: ContentBlockModes.EDIT;
      externalHandler?: (value: never) => void;
    }
);

export const BlockParcel: React.FC<BlockParcelProps> = props => {
  const { matchingBlock, blockId, index, blockRef, onError, ...rest } = props;
  const { getContext, logger } = useRootComponentProps();
  const handleParcelError = React.useCallback(
    (parcelName: string) => {
      return error => {
        if (logger) logger.error(`error in parcel ${parcelName}: ${error}`);
        onError?.(error);
      };
    },
    [logger, onError],
  );

  const parcelId = useMemo(() => {
    const id = `${matchingBlock.blockInfo.propertyType}_${blockId}_${index}`;
    if (rest.mode) {
      return `${rest.mode}_${id}`;
    }
    return id;
  }, [matchingBlock.blockInfo.propertyType, blockId, index, rest.mode]);

  const parcelConfig = useMemo(() => {
    return {
      ...matchingBlock.config,
      name: parcelId,
    };
  }, [matchingBlock.config, parcelId]);

  const blockInfo = useMemo(() => {
    return {
      ...matchingBlock.blockInfo,
      mode: rest.mode,
      externalHandler: rest.mode === ContentBlockModes.EDIT ? rest?.externalHandler : null,
    };
  }, [matchingBlock.blockInfo, rest]);

  return (
    <Stack fullWidth id={parcelId} key={parcelId}>
      <RootParcel
        config={parcelConfig}
        {...getContext()}
        blockInfo={blockInfo}
        blockData={matchingBlock.blockData}
        blockRef={blockRef}
        content={matchingBlock.content}
        handleError={handleParcelError(parcelId)}
      />
    </Stack>
  );
};
