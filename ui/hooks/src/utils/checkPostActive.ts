import { PostResultFragment } from '@akashaorg/typings/sdk/graphql-operation-types';

/**
 * Utility to check whether a post is active or not
 * @Todo: weird typings, must rethink
 */
export function checkPostActive(
  entry: Pick<PostResultFragment & { delisted: boolean }, 'content' | 'delisted'>,
) {
  const isRemoved = entry.content.length === 1 && entry.content[0].property === 'removed';
  return !entry.delisted && !isRemoved;
}
