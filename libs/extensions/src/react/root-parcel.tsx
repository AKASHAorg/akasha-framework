import * as React from 'react';
import { useRootComponentProps } from '@akashaorg/ui-core-hooks';
import { RefObject, useCallback, useEffect } from 'react';
import { ParcelConfig } from 'single-spa';
import { MatchingBlock } from './content-block';
import { ContentBlockModes } from '@akashaorg/typings/lib/ui';

// Using mount root parcel until this pr is merged:
// https://github.com/single-spa/single-spa/pull/1189

export type RootParcelProps = {
  handleError?: (error: Error) => void;
  config: ParcelConfig;
  blockInfo?: MatchingBlock['blockInfo'] & {
    mode?: ContentBlockModes;
    externalHandler?: (value: never) => void;
  };
  blockData?: MatchingBlock['blockData'];
  blockRef?: RefObject<unknown>;
  content?: MatchingBlock['content'];
  extensionData?: unknown;
};

export const RootParcel = (props: RootParcelProps) => {
  const { config, handleError, ...otherProps } = props;
  const { singleSpa } = useRootComponentProps();
  const parcel = React.useRef<ReturnType<typeof singleSpa.mountRootParcel>>(null);
  const parcelNodeRef = React.useRef();
  const isMounted = React.useRef(false);
  const isUnmounting = React.useRef(false);

  const mountParcel = useCallback(() => {
    if (parcelNodeRef.current && !parcel.current) {
      parcel.current = singleSpa.mountRootParcel(config, {
        ...otherProps,
        domElement: parcelNodeRef.current,
      });
      parcel.current.mountPromise
        .then(() => {
          isMounted.current = true;
        })
        .catch(err => {
          handleError?.(err);
        });
    }
  }, [singleSpa, config, otherProps, handleError]);

  // currently unmounting not working properly because there is no way to
  // tell if the parcel was already unmounted by the parent.
  // @TODO: fix unmounting
  const unmountParcel = useCallback(() => {
    if (
      parcel.current &&
      isMounted.current &&
      !isUnmounting.current &&
      parcel.current.getStatus() === singleSpa.MOUNTED
    ) {
      isUnmounting.current = true;
      parcel.current.unmount();
      parcel.current.unmountPromise
        .then(() => {
          isMounted.current = false;
          isUnmounting.current = false;
          parcel.current = null;
        })
        .catch(err => {
          handleError?.(err);
        });
    }
  }, [singleSpa.MOUNTED, handleError]);

  useEffect(() => {
    mountParcel();
    return () => {
      // unmountParcel();
    };
  }, [config, otherProps, mountParcel]);

  return <div ref={parcelNodeRef}></div>;
};
