import React, { Suspense } from 'react';
import InterestsPage from '../pages/interests';
import EditProfilePage from '../pages/edit-profile';
import FollowingPage from '../pages/profile-engagement/following-page';
import FollowersPage from '../pages/profile-engagement/followers-page';
import ProfileInfoPage from '../pages/profile-info';
import ProfileBeamsPage from '../pages/profile-beams';
import ProfileHeader from '../profile-header';
import RootComponent from './root-component';
import ProfileWithAuthorization from '../profile-with-authorization';
import EngagementFallback from './engagement-fallback';
import menuRoute, { BEAMS, EDIT, INTERESTS, FOLLOWERS, FOLLOWING } from '../../routes';
import { ProfileLoading } from '@akashaorg/design-system-components/lib/components/Profile';
import { rootRouteWithContext, Route, Router } from '@tanstack/react-router';
import { useApolloClient } from '@apollo/client';
import {
  GetProfileByDidDocument,
  GetFollowersListByDidDocument,
  GetFollowingListByDidDocument,
} from '@akashaorg/ui-awf-hooks/lib/generated/apollo';
import { ENGAGEMENTS_PER_PAGE } from '../pages/profile-engagement/types';

type ApolloClient = ReturnType<typeof useApolloClient>;

interface RouterContext {
  apolloClient: ApolloClient;
}

const rootRoute = rootRouteWithContext<RouterContext>()({
  component: RootComponent,
});

const profileInfoRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '$profileId',
  loader: ({ context, params }) => {
    context.apolloClient.query({
      query: GetProfileByDidDocument,
      variables: {
        id: params.profileId,
      },
    });
  },
  component: () => {
    const { profileId } = profileInfoRoute.useParams();
    return (
      <Suspense fallback={<ProfileLoading />}>
        <ProfileInfoPage profileId={profileId} />
      </Suspense>
    );
  },
});

const profileEditRoute = new Route({
  getParentRoute: () => rootRoute,
  path: `$profileId${menuRoute[EDIT]}`,
  component: () => {
    const { profileId } = profileEditRoute.useParams();
    return (
      <Suspense fallback={<ProfileLoading />}>
        <ProfileWithAuthorization editingProfile={true} profileId={profileId}>
          <EditProfilePage profileId={profileId} />
        </ProfileWithAuthorization>
      </Suspense>
    );
  },
});

const followersRoute = new Route({
  getParentRoute: () => rootRoute,
  path: `$profileId${menuRoute[FOLLOWERS]}`,
  loader: ({ context, params }) => {
    context.apolloClient.query({
      query: GetFollowersListByDidDocument,
      variables: {
        id: params.profileId,
        first: ENGAGEMENTS_PER_PAGE,
      },
    });
  },
  component: () => {
    const { profileId } = followersRoute.useParams();
    return (
      <Suspense fallback={<EngagementFallback profileId={profileId} />}>
        <ProfileWithAuthorization profileId={profileId}>
          <ProfileHeader profileId={profileId} />
          <FollowersPage profileId={profileId} />
        </ProfileWithAuthorization>
      </Suspense>
    );
  },
});

const followingRoute = new Route({
  getParentRoute: () => rootRoute,
  path: `$profileId${menuRoute[FOLLOWING]}`,
  loader: ({ context, params }) => {
    context.apolloClient.query({
      query: GetFollowingListByDidDocument,
      variables: {
        id: params.profileId,
        first: ENGAGEMENTS_PER_PAGE,
      },
    });
  },
  component: () => {
    const { profileId } = followingRoute.useParams();
    return (
      <Suspense fallback={<EngagementFallback profileId={profileId} />}>
        <ProfileWithAuthorization profileId={profileId}>
          <ProfileHeader profileId={profileId} />
          <FollowingPage profileId={profileId} />
        </ProfileWithAuthorization>
      </Suspense>
    );
  },
});

const interestsRoute = new Route({
  getParentRoute: () => rootRoute,
  path: `$profileId${menuRoute[INTERESTS]}`,
  component: () => {
    const { profileId } = interestsRoute.useParams();
    return (
      <ProfileWithAuthorization profileId={profileId}>
        <ProfileHeader profileId={profileId} />
        <InterestsPage profileId={profileId} />
      </ProfileWithAuthorization>
    );
  },
});

const beamsRoute = new Route({
  getParentRoute: () => rootRoute,
  path: `$profileId${menuRoute[BEAMS]}`,
  component: () => {
    const { profileId } = beamsRoute.useParams();
    return (
      <ProfileWithAuthorization profileId={profileId}>
        <ProfileHeader profileId={profileId} />
        <ProfileBeamsPage profileId={profileId} />
      </ProfileWithAuthorization>
    );
  },
});

const routeTree = rootRoute.addChildren([
  profileInfoRoute,
  profileEditRoute,
  followersRoute,
  followingRoute,
  interestsRoute,
  beamsRoute,
]);

interface CreateRouter {
  baseRouteName: string;
  apolloClient: ApolloClient;
}

export const createRouter = ({ baseRouteName, apolloClient }: CreateRouter) =>
  new Router({
    routeTree,
    basepath: baseRouteName,
    context: {
      apolloClient,
    },
  });
