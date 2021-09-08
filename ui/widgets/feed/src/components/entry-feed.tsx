import * as React from 'react';
import DS from '@akashaproject/design-system';
import { IFeedWidgetProps } from './App';
import EntryRenderer from './entry-renderer';
import { ILocale } from '@akashaproject/design-system/lib/utils/time';
import {
  useSaveBookmark,
  useGetBookmarks,
  useDeleteBookmark,
} from '@akashaproject/ui-awf-hooks/lib/use-bookmarks.new';

const { EntryList } = DS;

const EntryFeed = (props: IFeedWidgetProps) => {
  const saveBookmarkQuery = useSaveBookmark();
  const delBookmarkQuery = useDeleteBookmark();
  const getBookmarksQuery = useGetBookmarks(props.ethAddress);

  const handleBookmark = (isBookmarked: boolean, entryId: string) => {
    if (props.loggedProfile.pubKey) {
      if (!isBookmarked) {
        return saveBookmarkQuery.mutate({
          entryId,
          itemType: props.itemType,
        });
      }
      return delBookmarkQuery.mutate(entryId);
    } else {
      props.onLoginModalOpen();
    }
  };
  const handleRepost = (_withComment: boolean, entryId: string) => {
    if (!props.loggedProfile.pubKey) {
      props.onLoginModalOpen();
    } else {
      props.navigateToModal({ name: 'editor', embedEntry: entryId });
    }
  };

  return (
    <EntryList
      pages={props.pages}
      onLoadMore={props.onLoadMore}
      status={props.requestStatus}
      itemSpacing={props.itemSpacing}
      hasNextPage={props.hasNextPage}
      itemCard={
        <EntryRenderer
          pubKey={props.profilePubKey}
          ethAddress={props.ethAddress}
          itemType={props.itemType}
          sharePostUrl={`${window.location.origin}/social-app/post/`}
          locale={props.i18n.languages[0] as ILocale}
          bookmarksQuery={getBookmarksQuery}
          onBookmark={handleBookmark}
          onNavigate={props.onNavigate}
          singleSpaNavigate={props.singleSpaNavigate}
          onFlag={props.onEntryFlag}
          onRepost={handleRepost}
          contentClickable={props.contentClickable}
          onEntryRemove={props.onEntryRemove}
          removeEntryLabel={props.removeEntryLabel}
          removedByMeLabel={props.removedByMeLabel}
          removedByAuthorLabel={props.removedByAuthorLabel}
          uiEvents={props.uiEvents}
        />
      }
    />
  );
};

export default EntryFeed;
