import * as React from 'react';
import Stack from '@akashaorg/design-system-core/lib/components/Stack';
import FeedPage from './pages/feed-page/feed-page';
import MyFeedPage from './pages/my-feed-page/my-feed-page';
import ProfileFeedPage from './pages/profile-feed-page/profile-feed-page';
import BeamPage from './pages/entry-page/beam-page';
import ReflectionPage from './pages/entry-page/reflection-page';
import TagFeedPage from './pages/tag-feed-page/tag-feed-page';
import EditorPage from './pages/editor-page/editor-page';
import routes, { FEED, MY_FEED, PROFILE_FEED, BEAM, REFLECT, TAGS, EDITOR } from '../routes';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useRootComponentProps } from '@akashaorg/ui-awf-hooks';
import { useGetMyProfileQuery } from '@akashaorg/ui-awf-hooks/lib/generated';
import { ModalNavigationOptions } from '@akashaorg/typings/lib/ui';
import EntrySectionLoading from './pages/entry-page/entry-section-loading';

const AppRoutes: React.FC<unknown> = () => {
  const { baseRouteName, navigateToModal } = useRootComponentProps();
  const _navigateToModal = React.useRef(navigateToModal);
  const profileDataReq = useGetMyProfileQuery(null, {
    select: resp => {
      return resp.viewer?.akashaProfile;
    },
  });

  const loggedProfileData = profileDataReq.data;

  const showLoginModal = React.useCallback((redirectTo?: { modal: ModalNavigationOptions }) => {
    _navigateToModal.current?.({ name: 'login', redirectTo });
  }, []);

  return (
    <Router basename={baseRouteName}>
      <Stack>
        <Routes>
          <Route
            path={routes[FEED]}
            element={
              <FeedPage loggedProfileData={loggedProfileData} showLoginModal={showLoginModal} />
            }
          />
          <Route
            path={routes[MY_FEED]}
            element={
              <MyFeedPage loggedProfileData={loggedProfileData} showLoginModal={showLoginModal} />
            }
          />
          <Route
            path={`${routes[BEAM]}/:beamId`}
            element={
              <React.Suspense fallback={<EntrySectionLoading />}>
                <BeamPage />
              </React.Suspense>
            }
          />
          <Route
            path={`${routes[BEAM]}/:beamId${routes[REFLECT]}`}
            element={
              <React.Suspense fallback={<EntrySectionLoading />}>
                <BeamPage />
              </React.Suspense>
            }
          />
          <Route
            path={`${routes[TAGS]}/:tagName`}
            element={
              <TagFeedPage loggedProfileData={loggedProfileData} showLoginModal={showLoginModal} />
            }
          />
          <Route
            path={`${routes[PROFILE_FEED]}/:did`}
            element={
              <ProfileFeedPage
                loggedProfileData={loggedProfileData}
                showLoginModal={showLoginModal}
              />
            }
          />
          <Route
            path={`${routes[REFLECT]}/:reflectionId`}
            element={
              <React.Suspense fallback={<EntrySectionLoading />}>
                <ReflectionPage />
              </React.Suspense>
            }
          />
          <Route
            path={`${routes[REFLECT]}/:reflectionId${routes[REFLECT]}`}
            element={
              <React.Suspense fallback={<EntrySectionLoading />}>
                <ReflectionPage />
              </React.Suspense>
            }
          />
          <Route path="/" element={<Navigate to={routes[FEED]} replace />} />
          <Route
            path={routes[EDITOR]}
            element={<EditorPage loggedProfileData={loggedProfileData} />}
          />
        </Routes>
        <Stack id="reflect-error-snackbar-container" customStyle="sticky bottom-2" fullWidth />
      </Stack>
    </Router>
  );
};

export default AppRoutes;
