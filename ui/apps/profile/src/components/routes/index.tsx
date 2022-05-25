import DS from '@akashaorg/design-system';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import menuRoute, { MY_PROFILE, rootRoute } from '../../routes';
import ProfilePage from './profile-page';
import { RootComponentProps } from '@akashaorg/ui-awf-typings';
import { useGetLogin, useGetProfile } from '@akashaorg/ui-awf-hooks';
import { ModalNavigationOptions } from '@akashaorg/ui-awf-typings/lib/app-loader';

const { Box } = DS;

const AppRoutes: React.FC<RootComponentProps> = props => {
  const loginQuery = useGetLogin();
  const loggedProfileQuery = useGetProfile(loginQuery.data?.pubKey);

  const { t } = useTranslation('app-profile');

  const showLoginModal = (redirectTo?: { modal: ModalNavigationOptions }) => {
    props.navigateToModal({ name: 'login', redirectTo });
  };

  return (
    <Router>
      <Box>
        <Routes>
          <Route path={`${rootRoute}/list`} element={<>A list of profiles</>} />
          {[`${rootRoute}/:pubKey`, menuRoute[MY_PROFILE]].map(path => (
            <Route
              key={path}
              path={path}
              element={
                <ProfilePage
                  {...props}
                  loggedProfileData={loggedProfileQuery.data}
                  showLoginModal={showLoginModal}
                  loginState={loginQuery.data}
                />
              }
            />
          ))}
          <Route element={<div>{t('Oops, Profile not found!')}</div>} />
        </Routes>
      </Box>
    </Router>
  );
};

export default AppRoutes;
