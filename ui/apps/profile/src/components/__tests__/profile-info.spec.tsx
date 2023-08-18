import React from 'react';
import ProfileInfoPage from '../pages/profile-info-page';
import userEvent from '@testing-library/user-event';
import * as hooks from '@akashaorg/ui-awf-hooks/lib/generated/hooks-new';

import {
  renderWithAllProviders,
  act,
  screen,
  genAppProps,
  genUser,
  waitFor,
} from '@akashaorg/af-testing';
import { Profile } from '@akashaorg/typings/ui';
import { MemoryRouter as Router } from 'react-router-dom';

const navigateTo = jest.fn();

describe('< ProfileInfoPage />', () => {
  const BaseComponent = (
    <Router initialEntries={['/@akashaorg/app-profile/']}>
      <ProfileInfoPage
        {...genAppProps()}
        plugins={{
          '@akashaorg/app-routing': {
            routing: {
              navigateTo,
            },
          },
        }}
        showLoginModal={jest.fn()}
      />
    </Router>
  );
  const profile = genUser('pkh:eip155:5:0xc47a483494db8fe455ba29a53a7f75349dfc02ff');

  beforeEach(async () => {
    userEvent.setup();
    await act(async () => {
      renderWithAllProviders(BaseComponent, {});
    });
  });

  beforeAll(() => {
    (
      jest.spyOn(hooks, 'useGetProfileByDidQuery') as unknown as jest.SpyInstance<{
        data: {
          isViewer: boolean;
          profile: Profile;
        };
        status: 'success' | 'error';
      }>
    ).mockReturnValue({ data: { isViewer: true, profile }, status: 'success' });
  });
  it('should render profile info page', async () => {
    expect(screen.getByTestId('avatar-image')).toBeInTheDocument();
  });

  it('should render profile header', async () => {
    expect(screen.getByTestId('avatar-image')).toBeInTheDocument();
    expect(screen.getByText(profile.name)).toBeInTheDocument();
    expect(screen.getByText('0xc47a...fc02ff')).toBeInTheDocument();
  });

  it('should render profile description', async () => {
    expect(screen.getByText(profile.description || '')).toBeInTheDocument();
  });

  it('should render social links', async () => {
    expect(screen.getByText(profile.links?.[0]?.href || '')).toBeInTheDocument();
    expect(screen.getByText(profile.links?.[1]?.href || '')).toBeInTheDocument();
  });

  it('should render profile statistics', async () => {
    expect(screen.getByTestId('avatar-image')).toBeInTheDocument();
    expect(screen.getByText(profile.name)).toBeInTheDocument();
    expect(screen.getByText('0xc47a...fc02ff')).toBeInTheDocument();
  });

  it('should go to edit page when edit icon is clicked', async () => {
    userEvent.click(screen.getByRole('button', { name: 'edit' }));
    await waitFor(() => expect(navigateTo).toHaveBeenCalled());
  });
});
