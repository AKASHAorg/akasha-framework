import React from 'react';
import DS from '@akashaproject/design-system';
import { useTranslation } from 'react-i18next';
import { EventTypes, ItemTypes } from '@akashaproject/ui-awf-typings/lib/app-loader';
import { IEntryData } from '@akashaproject/ui-awf-typings/lib/entry';
import { ILogger } from '@akashaproject/sdk-typings/lib/interfaces/log';
import { RootComponentProps } from '@akashaproject/ui-awf-typings';
import { ILocale } from '@akashaproject/design-system/lib/utils/time';
import { IContentClickDetails } from '@akashaproject/design-system/lib/components/EntryCard/entry-box';
import { useIsFollowingMultiple } from '@akashaproject/ui-awf-hooks';

const { EntryCard, EntryCardHidden, ExtensionPoint } = DS;

export interface IEntryCardRendererProps {
  logger: ILogger;
  singleSpa: RootComponentProps['singleSpa'];
  itemData?: IEntryData;
  itemType?: ItemTypes;
  locale?: ILocale;
  ethAddress?: string | null;
  onNavigate: (details: IContentClickDetails, itemType: ItemTypes) => void;
  onLinkCopy?: () => void;
  onRepost: (withComment: boolean, entryId: string) => void;
  sharePostUrl: string;
  onAvatarClick: (ev: React.MouseEvent<HTMLDivElement>, authorEth: string) => void;
  onMentionClick: (ethAddress: string) => void;
  onTagClick: (name: string) => void;
  style?: React.CSSProperties;
  contentClickable?: boolean;
  moderatedContentLabel?: string;
  ctaLabel?: string;
  handleFlipCard?: (entry: IEntryData, isQuote: boolean) => () => void;
  uiEvents: RootComponentProps['uiEvents'];
  navigateToModal: RootComponentProps['navigateToModal'];
  modalSlotId: string;
}

const EntryCardRenderer = (props: IEntryCardRendererProps) => {
  const { ethAddress, locale, itemData, itemType, style, contentClickable, onRepost, modalSlotId } =
    props;

  const { entryId } = itemData || {};
  const [showAnyway, setShowAnyway] = React.useState<boolean>(false);
  const { t } = useTranslation('app-search');

  const handleFlipCard = () => {
    setShowAnyway(true);
  };

  const handleClickAvatar = () => {
    props.onNavigate(
      {
        id: itemData?.author.pubKey,
        authorEthAddress: itemData?.author.ethAddress,
      },
      ItemTypes.PROFILE,
    );
  };

  const handleContentClick = () => {
    props.onNavigate(
      {
        id: itemData.entryId,
        authorEthAddress: itemData.author.ethAddress,
        replyTo: itemData.postId ? { entryId: itemData.postId } : null,
      },
      itemType,
    );
  };

  const [isReported, isAccountReported] = React.useMemo(() => {
    if (showAnyway) {
      return [false, false];
    }
    return [itemData?.reported, itemData?.author?.reported];
  }, [itemData, showAnyway]);

  const accountAwaitingModeration = !itemData?.author?.moderated && isAccountReported;
  const entryAwaitingModeration = !itemData?.moderated && isReported;

  const itemTypeName = React.useMemo(() => {
    switch (itemType) {
      case ItemTypes.ENTRY:
        return t('post');
      case ItemTypes.PROFILE:
        return t('account');
      case ItemTypes.COMMENT:
        return t('reply');
      case ItemTypes.TAG:
        return t('tag');
      default:
        return t('unknown');
    }
  }, [t, itemType]);

  const handleExtPointMount = (name: string) => {
    props.uiEvents.next({
      event: EventTypes.ExtensionPointMount,
      data: {
        name,
        entryId,
        entryType: itemType,
      },
    });
  };

  const handleExtPointUnmount = () => {
    /* todo */
  };

  const handleEntryRemove = (entryId: string) => {
    if (entryId)
      props.navigateToModal({
        name: 'entry-remove-confirmation',
        entryType: ItemTypes.ENTRY,
        entryId,
      });
  };

  const handleEntryFlag = (entryId: string, itemType: string) => () => {
    if (entryId) props.navigateToModal({ name: 'report-modal', entryId, itemType });
  };

  const isFollowing = useIsFollowingMultiple(ethAddress, [itemData?.author?.ethAddress]);

  const handleFollow = () => {
    /* todo */
  };

  const handleUnfollow = () => {
    /* todo */
  };

  const handleRepost = () => {
    if (onRepost) {
      onRepost(false, entryId);
    }
  };

  const hideActionButtons = React.useMemo(() => itemType === ItemTypes.COMMENT, [itemType]);

  return (
    <>
      {itemData && itemData.author?.ethAddress && (
        <div style={{ marginBottom: '8px' }}>
          {(accountAwaitingModeration || entryAwaitingModeration) && (
            <EntryCardHidden
              reason={entryAwaitingModeration ? itemData.reason : itemData.author?.reason}
              headerTextLabel={t(
                'You reported {{ isAuthorString }} {{ itemTypeName }} for the following reason',
                {
                  itemTypeName,
                  isAuthorString: accountAwaitingModeration ? 'the author of this' : 'this',
                },
              )}
              footerTextLabel={t('It is awaiting moderation.')}
              ctaLabel={t('See it anyway')}
              handleFlipCard={handleFlipCard}
            />
          )}

          {!entryAwaitingModeration &&
            !accountAwaitingModeration &&
            !itemData.delisted &&
            !itemData.isRemoved && (
              <EntryCard
                isRemoved={itemData.isRemoved}
                entryData={itemData}
                sharePostLabel={t('Share Post')}
                shareTextLabel={t('Share this post with your friends')}
                sharePostUrl={props.sharePostUrl}
                onClickAvatar={handleClickAvatar}
                repliesLabel={t('Replies')}
                repostsLabel={t('Reposts')}
                repostLabel={t('Repost')}
                repostWithCommentLabel={t('Repost with comment')}
                shareLabel={t('Share')}
                copyLinkLabel={t('Copy Link')}
                flagAsLabel={t('Report Post')}
                loggedProfileEthAddress={ethAddress}
                locale={locale || 'en'}
                style={{ height: 'auto', ...style }}
                moderatedContentLabel={t('This content has been moderated')}
                showMore={true}
                profileAnchorLink={'/profile'}
                repliesAnchorLink={'/social-app/post'}
                onRepost={handleRepost}
                handleFollowAuthor={handleFollow}
                handleUnfollowAuthor={handleUnfollow}
                isFollowingAuthor={isFollowing.data?.includes(ethAddress)}
                onContentClick={handleContentClick}
                onMentionClick={props.onMentionClick}
                onTagClick={props.onTagClick}
                singleSpaNavigate={props.singleSpa.navigateToUrl}
                contentClickable={contentClickable}
                disableReposting={itemData.isRemoved}
                removeEntryLabel={t('Delete Post')}
                onEntryRemove={handleEntryRemove}
                onEntryFlag={handleEntryFlag(itemData.entryId, 'post')}
                hideActionButtons={hideActionButtons}
                modalSlotId={modalSlotId}
                actionsRightExt={
                  <ExtensionPoint
                    name={`entry-card-actions-right_${entryId}`}
                    onMount={handleExtPointMount}
                    onUnmount={handleExtPointUnmount}
                  />
                }
                headerMenuExt={
                  ethAddress === itemData.author.ethAddress && (
                    <ExtensionPoint
                      style={{ width: '100%' }}
                      name={`entry-card-edit-button_${entryId}`}
                      onMount={handleExtPointMount}
                      onUnmount={handleExtPointUnmount}
                    />
                  )
                }
              />
            )}
        </div>
      )}
    </>
  );
};

export default EntryCardRenderer;
