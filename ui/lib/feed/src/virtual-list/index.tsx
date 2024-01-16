import * as React from 'react';
import {
  VirtualListRenderer,
  VirtualListInterface,
  VirtualListRendererProps,
} from './list-renderer';
import {
  createVirtualDataItem,
  HEADER_COMPONENT,
  FOOTER_COMPONENT,
  VirtualDataItem,
  VirtualItem,
} from './virtual-item-renderer';
import { useEdgeDetector, UseEdgeDetectorProps } from './use-edge-detector';
import { RestoreItem, useScrollState } from './use-scroll-state';
import { Rect } from './rect';

export type VirtualizerProps<T> = {
  restorationKey: string;
  header?: React.ReactElement;
  footer?: React.ReactElement;
  emptyListCard?: React.ReactElement;
  estimatedHeight: VirtualListRendererProps<unknown>['estimatedHeight'];
  items: T[];
  itemKeyExtractor: (item: T) => string;
  itemIndexExtractor: (item: T) => number;
  renderItem: (data: T) => React.ReactNode;
  overscan?: VirtualListRendererProps<unknown>['overscan'];
  itemSpacing?: number;
  onFetchInitialData?: (restoreItem?: RestoreItem) => void;
  loadingIndicator?: () => React.ReactElement;
  scrollTopIndicator?: VirtualListRendererProps<T>['scrollTopIndicator'];
  onListReset?: VirtualListRendererProps<T>['onListReset'];
  onEdgeDetectorChange: UseEdgeDetectorProps['onEdgeDetectorChange'];
  hasNextPage?: boolean;
  hasPreviousPage?: boolean;
  isLoading?: boolean;
};

const Virtualizer = <T,>(props: VirtualizerProps<T>) => {
  const {
    estimatedHeight,
    itemKeyExtractor,
    itemIndexExtractor,
    header,
    items,
    renderItem,
    overscan = 20,
    itemSpacing = 8,
    loadingIndicator,
    onFetchInitialData,
    restorationKey,
    scrollTopIndicator,
    onEdgeDetectorChange,
    footer,
    hasNextPage,
    hasPreviousPage,
    isLoading,
    emptyListCard,
  } = props;

  const vlistRef = React.useRef<VirtualListInterface>();
  const [isMounted, setIsMounted] = React.useState(false);
  const deferredIsMounted = React.useDeferredValue(isMounted);

  const keyExtractorRef = React.useRef(itemKeyExtractor);
  const itemRendererRef = React.useRef(renderItem);
  const scrollRestore = useScrollState(restorationKey);

  const itemList: VirtualDataItem<T>[] = React.useMemo(() => {
    const itemList: VirtualDataItem<T>[] = [];
    if (header) {
      itemList.push(
        createVirtualDataItem(HEADER_COMPONENT, HEADER_COMPONENT as T, false, () => header),
      );
    }

    itemList.push(
      ...items.map(item =>
        createVirtualDataItem(
          keyExtractorRef.current(item),
          item,
          true,
          itemRendererRef.current,
          itemIndexExtractor(item),
        ),
      ),
    );

    if (footer) {
      itemList.push(
        createVirtualDataItem(FOOTER_COMPONENT, FOOTER_COMPONENT as T, false, () => footer),
      );
    }
    return itemList;
  }, [footer, header, itemIndexExtractor, items]);

  const edgeDetector = useEdgeDetector({
    overscan,
    onEdgeDetectorChange,
  });

  const handleDetectorUpdate = React.useCallback(
    (
      itemList: VirtualItem[],
      mountedItems: VirtualItem[],
      viewportRect: Rect,
      averageItemHeight: number,
      measurementsCache: Map<string, number>,
      isNewUpdate: boolean,
    ) => {
      edgeDetector.update(itemList, mountedItems, viewportRect, averageItemHeight, isNewUpdate);
      if (!isMounted) return;
      if (vlistRef.current.isAtTop()) {
        return scrollRestore.save([], new Map());
      }
      const restoreItems = mountedItems.filter(it =>
        viewportRect.overlaps(new Rect(it.start, it.height)),
      );
      scrollRestore.save(
        restoreItems.map(it => ({ offsetTop: it.start, key: it.key })),
        measurementsCache,
      );
    },
    [edgeDetector, isMounted, scrollRestore],
  );

  const restoreStartItem = React.useRef<RestoreItem>();
  const isFetchingInitialData = React.useRef(false);

  React.useEffect(() => {
    if (!isMounted) {
      // load scroll restoration
      if (scrollRestore.scrollState.loaded && !isFetchingInitialData.current) {
        const restoreItem = scrollRestore.getLastItem();
        isFetchingInitialData.current = true;
        const listItem = itemList.filter(it => it.maybeRef);
        if (restoreItem && listItem.length === 0) {
          onFetchInitialData(restoreItem);
        } else if (listItem.length === 0) {
          onFetchInitialData();
        }
      }
      if (
        itemList.length > 0 &&
        scrollRestore.scrollState.loaded &&
        scrollRestore.scrollState.items?.length
      ) {
        restoreStartItem.current = scrollRestore.getRestoreItem(itemList);
        if (typeof window !== 'undefined' && window.history.scrollRestoration) {
          window.history.scrollRestoration = 'manual';
        }
      }
      if (itemList.length > 0 && scrollRestore.scrollState.loaded) {
        isFetchingInitialData.current = false;
        setIsMounted(true);
      }
    }
  }, [isMounted, itemList, onFetchInitialData, scrollRestore]);

  const scrollRestorationType = React.useMemo(() => {
    if (typeof window !== 'undefined') {
      if (window.history) return window.history.scrollRestoration;
      return 'auto';
    }
    return 'auto';
  }, []);

  if (!items.length && emptyListCard) return emptyListCard;

  return (
    <>
      {!deferredIsMounted && loadingIndicator && loadingIndicator()}
      {deferredIsMounted && (
        <VirtualListRenderer
          restorationKey={restorationKey}
          ref={vlistRef}
          itemList={itemList}
          estimatedHeight={estimatedHeight}
          overscan={overscan}
          restorationItem={restoreStartItem.current}
          scrollRestorationType={scrollRestorationType}
          measurementsCache={scrollRestore.scrollState.measurementsCache}
          itemSpacing={itemSpacing}
          onEdgeDetectorUpdate={handleDetectorUpdate}
          scrollTopIndicator={scrollTopIndicator}
          hasNextPage={hasNextPage}
          hasPreviousPage={hasPreviousPage}
          isLoading={isLoading}
          loadingIndicator={loadingIndicator}
        />
      )}
    </>
  );
};

export { Virtualizer };
export { EdgeArea } from './use-edge-detector';
