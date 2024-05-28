import React from 'react';
import {
  Outlet,
  createRootRouteWithContext,
  createRoute,
  createRouter,
  redirect,
} from '@tanstack/react-router';
import { CreateRouter, RouterContext } from '@akashaorg/typings/lib/ui';
import { ExplorePage, ExtensionsHub, InfoPage, InstalledExtensions } from '../pages';
import {
  DevInfoPage,
  CollaboratorsPage,
  VersionInfoPage,
  VersionHistoryPage,
  AuditLogPage,
  PermissionsPage,
  LicensePage,
} from '../pages/sub-pages';
import ErrorComponent from './error-component';
import routes, { EXTENSIONS, INSTALLED, HOME } from '../../routes';

const rootRoute = createRootRouteWithContext<RouterContext>()({
  component: Outlet,
});

const defaultRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  beforeLoad: () => {
    throw redirect({ to: routes[HOME], replace: true });
  },
});

const exploreRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: routes[HOME],
  component: ExplorePage,
});

const extensionsHubRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: routes[EXTENSIONS],
  component: ExtensionsHub,
});

const installedExtensionsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: routes[INSTALLED],
  component: InstalledExtensions,
});

const infoRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/info/$appId',
  component: () => {
    const { appId } = infoRoute.useParams();
    return <InfoPage appId={appId} />;
  },
});

const devInfoRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/info/$appId/developer/$devDid',
  component: () => {
    const { devDid } = devInfoRoute.useParams();
    return <DevInfoPage devDid={devDid} />;
  },
});

const collaboratorsInfoRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/info/$appId/collaborators',
  component: () => {
    const { appId } = infoRoute.useParams();
    return <CollaboratorsPage appId={appId} />;
  },
});

const versionInfoRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/info/$appId/versions',
  component: () => {
    const { appId } = infoRoute.useParams();
    return <VersionInfoPage appId={appId} />;
  },
});

const versionHistoryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/info/$appId/version-history',
  component: () => {
    const { appId } = versionHistoryRoute.useParams();
    return <VersionHistoryPage appId={appId} />;
  },
});

const auditLogRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/info/$appId/audit-log',
  component: () => {
    const { appId } = auditLogRoute.useParams();
    return <AuditLogPage appId={appId} />;
  },
});

const permissionInfoRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/info/$appId/permissions',
  component: () => {
    const { appId } = permissionInfoRoute.useParams();
    return <PermissionsPage appId={appId} />;
  },
});

const appLicenseInfoRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/info/$appId/license',
  component: () => {
    const { appId } = appLicenseInfoRoute.useParams();
    return <LicensePage appId={appId} />;
  },
});

const routeTree = rootRoute.addChildren([
  defaultRoute,
  exploreRoute,
  extensionsHubRoute,
  installedExtensionsRoute,
  infoRoute,
  //sub-routes from app info page
  devInfoRoute,
  collaboratorsInfoRoute,
  versionInfoRoute,
  versionHistoryRoute,
  auditLogRoute,
  permissionInfoRoute,
  appLicenseInfoRoute,
]);

export const router = ({ baseRouteName, apolloClient }: CreateRouter) =>
  createRouter({
    routeTree,
    basepath: baseRouteName,
    context: {
      apolloClient,
    },
    defaultErrorComponent: ({ error }) => (
      <ErrorComponent error={(error as unknown as Error).message} />
    ),
  });
