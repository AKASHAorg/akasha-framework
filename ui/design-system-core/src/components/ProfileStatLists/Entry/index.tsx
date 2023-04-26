import React, { useEffect } from 'react';
import Avatar from '../../Avatar';
import Stack from '../../Stack';
import Text from '../../Text';
import DuplexButton from '../../DuplexButton';
import { useIntersection } from 'react-use';
import { getColorClasses } from '../../../utils/getColorClasses';
import Button from '../../Button';
import Anchor from '../../Anchor';
import { Profile } from '@akashaorg/typings/sdk/graphql-types-new';

export type ListEntryProps = {
  followLabel: string;
  unFollowLabel: string;
  followingLabel: string;
  profileAnchorLink: string;
  profileId: string;
  avatar: Profile['avatar'];
  name: string;
  isFollowing: boolean;
  loggedProfileId?: string;
  hasNextPage?: boolean;
  loadingMoreLabel?: string;
  borderBottom?: boolean;
  onLoadMore?: () => void;
  onProfileClick: (profileId: string) => void;
  onFollow: (profileId: string) => void;
  onUnfollow: (profileId: string) => void;
};

const ListEntry: React.FC<ListEntryProps> = props => {
  const {
    followLabel,
    unFollowLabel,
    followingLabel,
    profileAnchorLink,
    profileId,
    avatar,
    name,
    isFollowing,
    loggedProfileId,
    hasNextPage,
    loadingMoreLabel,
    borderBottom = true,
    onLoadMore,
    onProfileClick,
    onFollow,
    onUnfollow,
  } = props;

  const loadmoreRef = React.createRef<HTMLDivElement>();

  const intersection = useIntersection(loadmoreRef, { threshold: 0 });

  useEffect(() => {
    if (intersection && intersection.isIntersecting) {
      if (onLoadMore) onLoadMore();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [intersection]);

  const borderBottomStyle = borderBottom
    ? `border-b ${getColorClasses(
        {
          light: 'grey8',
          dark: 'grey5',
        },
        'border',
      )}`
    : '';

  if (loggedProfileId === profileId) return null;

  return (
    <Stack direction="column" spacing="gap-y-4" customStyle={`px-4 pb-4 ${borderBottomStyle}`}>
      <Stack align="center" justify="between">
        <Anchor href={`${profileAnchorLink}/${profileId}`}>
          <Stack align="center" spacing="gap-x-1">
            <Avatar
              profileId={profileId}
              onClick={() => onProfileClick(profileId)}
              size="md"
              avatar={avatar}
              customStyle="cursor-pointer"
            />
            <Stack direction="column" justify="center">
              <Text variant="button-md">{name}</Text>
            </Stack>
          </Stack>
        </Anchor>

        <DuplexButton
          inactiveLabel={followLabel}
          activeLabel={followingLabel}
          activeHoverLabel={unFollowLabel}
          onClickInactive={() => onFollow(profileId)}
          onClickActive={() => onUnfollow(profileId)}
          active={isFollowing}
          size="sm"
          allowMinimization
        />
      </Stack>
      {hasNextPage && (
        <Stack justify="center" ref={loadmoreRef}>
          <Button
            icon="ArrowPathIcon"
            iconDirection="left"
            label={loadingMoreLabel}
            variant="text"
          />
        </Stack>
      )}
    </Stack>
  );
};

export default ListEntry;
