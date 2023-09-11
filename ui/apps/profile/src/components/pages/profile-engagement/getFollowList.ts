import { AkashaFollowDocument, FollowList } from '@akashaorg/typings/ui';

export function getFollowList(followDocuments: AkashaFollowDocument[]) {
  const followList: FollowList = new Map();
  followDocuments?.forEach(value => {
    followList.set(value.profileID, value);
  });
  return followList;
}
