import * as React from 'react';
import PostRenderer from './post-renderer';

export interface IGetCustomEntitiesProps {
  isMobile: boolean;
  feedItems: string[];
  loggedEthAddress: string | null;
  handleEditorPlaceholderClick?: () => void;
  pendingComments?: any[];
  locale: string;
}

export const getPendingComments = (props: IGetCustomEntitiesProps) => {
  const { feedItems, pendingComments = [], locale } = props;

  let customEntities: any = [];

  console.log(feedItems, 'the feed items');

  if (pendingComments.length) {
    customEntities = customEntities.concat(
      pendingComments.map((entry, idx) => ({
        position: 'before',
        itemId: feedItems.length ? feedItems[0] : null,
        getComponent: ({ key, style }: { key: string; style: React.CSSProperties }) => (
          <PostRenderer
            key={`${entry.author.ethAddress}-${idx}-${key}`}
            style={{ ...style, backgroundColor: '#4e71ff0f' }}
            itemData={entry}
            locale={locale}
            onFollow={() => {
              /* not allowed */
            }}
            onUnfollow={() => {
              /* not allowed */
            }}
            onBookmark={() => {
              /* not allowed */
            }}
            onNavigate={() => {
              /* not allowed */
            }}
            onRepliesClick={() => {
              /* not allowed */
            }}
            onFlag={() => () => {
              /* not allowed */
            }}
            onShare={() => {
              /* not allowed */
            }}
            onRepost={() => {
              /* not allowed */
            }}
            onAvatarClick={() => {
              /* not allowed */
            }}
          />
        ),
      })),
    );
  }
  if (customEntities.length) {
    return customEntities;
  }
  return;
};
