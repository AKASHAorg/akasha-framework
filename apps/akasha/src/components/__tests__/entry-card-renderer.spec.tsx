import * as React from 'react';
import EntryCardRenderer from '../feed-page/entry-card-renderer';
import { from } from 'rxjs';

import {
  RenderResult,
  genEthAddress,
  genPostData,
  renderWithAllProviders,
  act,
} from '@akashaproject/ui-awf-testing-utils';

describe('<EntryCardRenderer /> component', () => {
  let renderResult: RenderResult;
  const mockEth = genEthAddress();
  const itemData = genPostData();
  const mockObs = from(['test']);
  const globalChannel = {
    pipe: () => ({
      subscribe: () => {
        return;
      },
      unsubscribe: () => {
        return;
      },
    }),
  };

  const Base = (
    <EntryCardRenderer
      sdkModules={{
        profiles: { profileService: { isFollowing: () => mockObs } },
      }}
      itemData={itemData}
      logger={{ log: console.log }}
      globalChannel={globalChannel}
      ethAddress={mockEth}
      onBookmark={jest.fn}
      onAvatarClick={jest.fn}
      onMentionClick={jest.fn}
      onNavigate={jest.fn}
      onRepost={jest.fn}
      onTagClick={jest.fn}
      onFlag={jest.fn}
      onLinkCopy={jest.fn}
      sharePostUrl=""
      singleSpaNavigate={jest.fn}
    />
  );
  act(() => {
    renderResult = renderWithAllProviders(Base, {});
  });

  it('should render avatar', async () => {
    const avatarNode = await renderResult.findByTestId('avatar-image');
    expect(avatarNode).toBeDefined();
    expect(avatarNode?.getAttribute('src')).toEqual(itemData.author.avatar);
  });
});
