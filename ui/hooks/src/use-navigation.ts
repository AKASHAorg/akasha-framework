import React from 'react';
import { NavigateToParams, EntityTypes, IContentClickDetails } from '@akashaorg/typings/ui';

/**
 * Hook to navigation to entry's page
 * @example useEntryNavigation hook
 * ```typescript
 * // navigateFn handles the actual navigation
 * const handleEntryNavigate = useEntryNavigation(navigateTo, 'current-post-id');
 * ```
 */
export const useEntryNavigation = (
  navigateFn?: (args: NavigateToParams) => void,
  currentPostId?: string,
) => {
  return React.useCallback(
    (navigationDetails: IContentClickDetails, itemType: EntityTypes) => {
      const { id } = navigationDetails;
      if (typeof navigateFn !== 'function' || (currentPostId && currentPostId === id)) {
        return;
      }
      console.log('navigating to :', itemType, id);
      navigateFn({
        appName: '@akashaorg/app-akasha-integration',
        getNavigationUrl: navRoutes =>
          `${itemType === EntityTypes.REFLECT ? navRoutes.Reflect : navRoutes.Beam}/${id}`,
      });
    },
    [navigateFn, currentPostId],
  );
};
