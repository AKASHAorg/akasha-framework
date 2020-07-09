import * as React from 'react';
import { MainAreaCardBox } from '../common/basic-card-box';
import { SocialBox } from './social-box';
import { IEntryBoxProps, EntryBox } from './entry-box';
import { Box } from 'grommet';
import ViewportSizeProvider from '../../Providers/viewport-dimension';

export interface IEntryCardProps extends IEntryBoxProps {
  // labels
  repostedThisLabel?: string;
  andLabel?: string;
  othersLabel?: string;
  // external css
  className?: string;
  style?: React.CSSProperties;
  rootNodeRef?: React.Ref<HTMLDivElement>;
}

const EntryCard: React.FC<IEntryCardProps> = props => {
  const {
    entryData,
    repostedThisLabel,
    andLabel,
    othersLabel,
    onClickAvatar,
    repliesLabel,
    repostsLabel,
    repostLabel,
    repostWithCommentLabel,
    shareLabel,
    copyLinkLabel,
    locale,
    loggedProfileAvatar,
    loggedProfileEthAddress,
    style,
    className,
    rootNodeRef,
    onEntryBookmark,
    isBookmarked,
    bookmarkLabel,
    bookmarkedLabel,
    onRepost,
    onClickReplies,
    onEntryShare,
    onEntryFlag,
    onLinkCopy,
    handleFollow,
    handleUnfollow,
    flagAsLabel,
    copyIPFSLinkLabel,
  } = props;

  return (
    <ViewportSizeProvider>
      <MainAreaCardBox className={className} style={style} rootNodeRef={rootNodeRef}>
        {entryData.socialData && entryData.socialData.users.length > 0 && (
          <SocialBox
            socialData={entryData.socialData}
            repostedThisLabel={repostedThisLabel}
            andLabel={andLabel}
            othersLabel={othersLabel}
          />
        )}
        <Box pad={{ horizontal: 'medium' }}>
          <EntryBox
            entryData={entryData}
            onClickAvatar={onClickAvatar}
            repostsLabel={repostsLabel}
            repostLabel={repostLabel}
            repostWithCommentLabel={repostWithCommentLabel}
            repliesLabel={repliesLabel}
            shareLabel={shareLabel}
            flagAsLabel={flagAsLabel}
            copyLinkLabel={copyLinkLabel}
            locale={locale}
            loggedProfileAvatar={loggedProfileAvatar}
            loggedProfileEthAddress={loggedProfileEthAddress}
            onEntryBookmark={onEntryBookmark}
            isBookmarked={isBookmarked}
            bookmarkLabel={bookmarkLabel}
            bookmarkedLabel={bookmarkedLabel}
            onRepost={onRepost}
            onClickReplies={onClickReplies}
            onEntryShare={onEntryShare}
            onEntryFlag={onEntryFlag}
            onLinkCopy={onLinkCopy}
            copyIPFSLinkLabel={copyIPFSLinkLabel}
            handleFollow={handleFollow}
            handleUnfollow={handleUnfollow}
          />
        </Box>
      </MainAreaCardBox>
    </ViewportSizeProvider>
  );
};

EntryCard.defaultProps = {
  repostsLabel: 'Reposts',
  repostLabel: 'Repost',
  repostWithCommentLabel: 'Repost With Comment',
  copyLinkLabel: 'Copy Link',
  copyIPFSLinkLabel: 'Copy IPFS link',
  flagAsLabel: 'Report',
  shareLabel: 'Share',
};

export { EntryCard };
