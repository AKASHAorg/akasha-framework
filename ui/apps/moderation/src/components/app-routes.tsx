import * as React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import { RootComponentProps } from '@akashaorg/typings/ui';
import { useGetMyProfileQuery } from '@akashaorg/ui-awf-hooks/lib/generated/hooks-new';
import { useCheckModerator } from '@akashaorg/ui-awf-hooks';

import Box from '@akashaorg/design-system-core/lib/components/Box';

import {
  Dashboard,
  Overview,
  Moderators,
  ModeratorDetailPage,
  DismissModeratorPage,
  TransparencyLog,
  TransparencyLogItem,
  ModerationValue,
  EditCategoriesPage,
  EditContactInfoPage,
  EditMaxApplicantsPage,
  ResignRolePage,
  ResignConfirmationPage,
  AssignAdminPage,
  BecomeModeratorPage,
  ApplicationStatusPage,
  ModifyApplicationPage,
  ReportItemPage,
} from '../pages';

import routes, {
  DASHBOARD,
  DISMISS_MODERATOR,
  EDIT_CATEGORIES,
  EDIT_CONTACT_INFO,
  EDIT_MAX_APPLICANTS,
  RESIGN_CONFIRMATION,
  RESIGN_ROLE,
  HISTORY,
  HISTORY_ITEM,
  HOME,
  MODERATION_VALUE,
  MODERATORS,
  VIEW_MODERATOR,
  ASSIGN_NEW_ADMIN,
  BECOME_MODERATOR,
  CHECK_APPLICATION_STATUS,
  MODIFY_APPLICATION,
  REPORT_ITEM,
} from '../routes';

const AppRoutes: React.FC<RootComponentProps> = props => {
  const profileDataReq = useGetMyProfileQuery(null, {
    select: resp => {
      return resp.viewer?.profile;
    },
  });

  const loggedProfileData = profileDataReq.data;

  const checkModeratorQuery = useCheckModerator(loggedProfileData?.id);

  const checkModeratorResp = checkModeratorQuery.data;

  const isAuthorised = React.useMemo(() => checkModeratorResp === 200, [checkModeratorResp]);

  const applicationStatus = null;

  const isAdmin = false;

  const navigateTo = props.plugins['@akashaorg/app-routing']?.routing?.navigateTo;

  return (
    <Box>
      <Router basename={props.baseRouteName}>
        <Routes>
          <Route
            path={routes[HOME]}
            element={
              <Overview
                {...props}
                isAuthorised={isAuthorised}
                applicationStatus={applicationStatus}
                navigateTo={navigateTo}
              />
            }
          />

          <Route path={routes[MODERATION_VALUE]} element={<ModerationValue {...props} />} />

          <Route
            path={routes[DASHBOARD]}
            element={
              <Dashboard
                user={loggedProfileData?.id}
                isAuthorised={isAuthorised}
                isAdmin={isAdmin}
                navigateTo={navigateTo}
              />
            }
          />

          <Route
            path={routes[EDIT_CATEGORIES]}
            element={<EditCategoriesPage user={loggedProfileData?.id} navigateTo={navigateTo} />}
          />

          <Route
            path={routes[EDIT_CONTACT_INFO]}
            element={<EditContactInfoPage user={loggedProfileData?.id} navigateTo={navigateTo} />}
          />

          <Route
            path={routes[EDIT_MAX_APPLICANTS]}
            element={<EditMaxApplicantsPage user={loggedProfileData?.id} navigateTo={navigateTo} />}
          />

          <Route
            path={routes[RESIGN_ROLE]}
            element={
              <ResignRolePage
                user={loggedProfileData?.id}
                isAdmin={isAdmin}
                navigateTo={navigateTo}
              />
            }
          />

          <Route
            path={routes[RESIGN_CONFIRMATION]}
            element={
              <ResignConfirmationPage user={loggedProfileData?.id} navigateTo={navigateTo} />
            }
          />

          <Route
            path={routes[ASSIGN_NEW_ADMIN]}
            element={<AssignAdminPage user={loggedProfileData?.id} navigateTo={navigateTo} />}
          />

          <Route path={routes[MODERATORS]} element={<Moderators navigateTo={navigateTo} />} />

          <Route
            path={routes[VIEW_MODERATOR]}
            element={<ModeratorDetailPage navigateTo={navigateTo} />}
          />

          <Route
            path={routes[DISMISS_MODERATOR]}
            element={<DismissModeratorPage navigateTo={navigateTo} />}
          />

          <Route
            path={routes[HISTORY]}
            element={<TransparencyLog user={loggedProfileData?.id} navigateTo={navigateTo} />}
          />

          <Route path={routes[HISTORY_ITEM]} element={<TransparencyLogItem />} />

          <Route
            path={routes[BECOME_MODERATOR]}
            element={<BecomeModeratorPage user={loggedProfileData?.id} navigateTo={navigateTo} />}
          />

          <Route
            path={routes[CHECK_APPLICATION_STATUS]}
            element={
              <ApplicationStatusPage
                applicationStatus={applicationStatus}
                navigateTo={navigateTo}
              />
            }
          />

          <Route
            path={routes[MODIFY_APPLICATION]}
            element={<ModifyApplicationPage navigateTo={navigateTo} />}
          />

          <Route path={routes[REPORT_ITEM]} element={<ReportItemPage navigateTo={navigateTo} />} />

          <Route path="/" element={<Navigate to={routes[HOME]} replace />} />
        </Routes>
      </Router>
    </Box>
  );
};

export default AppRoutes;
