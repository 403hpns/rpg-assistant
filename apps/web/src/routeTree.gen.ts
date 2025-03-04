/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as ProtectedImport } from './routes/_protected'
import { Route as IndexImport } from './routes/index'
import { Route as AuthRegisterImport } from './routes/auth/register'
import { Route as AuthLoginImport } from './routes/auth/login'
import { Route as ProtectedAppDashboardRouteImport } from './routes/_protected/app/_dashboard/route'
import { Route as ProtectedAppWelcomeIndexImport } from './routes/_protected/app/welcome/index'
import { Route as ProtectedAppDashboardIndexImport } from './routes/_protected/app/_dashboard/index'
import { Route as ProtectedAppDashboardUserIndexImport } from './routes/_protected/app/_dashboard/user/$index'
import { Route as ProtectedAppDashboardSessionsIndexImport } from './routes/_protected/app/_dashboard/sessions/index'
import { Route as ProtectedAppDashboardHelpIndexImport } from './routes/_protected/app/_dashboard/help/index'
import { Route as ProtectedAppDashboardCharactersIndexImport } from './routes/_protected/app/_dashboard/characters/index'
import { Route as ProtectedAppDashboardCampaignsIndexImport } from './routes/_protected/app/_dashboard/campaigns/index'
import { Route as ProtectedAppDashboardCalendarIndexImport } from './routes/_protected/app/_dashboard/calendar/index'
import { Route as ProtectedAppDashboardSessionsNewImport } from './routes/_protected/app/_dashboard/sessions/new'
import { Route as ProtectedAppDashboardSessionsIdImport } from './routes/_protected/app/_dashboard/sessions/$id'
import { Route as ProtectedAppDashboardCharactersNewImport } from './routes/_protected/app/_dashboard/characters/new'
import { Route as ProtectedAppDashboardCharactersIdImport } from './routes/_protected/app/_dashboard/characters/$id'
import { Route as ProtectedAppDashboardCampaignsNewImport } from './routes/_protected/app/_dashboard/campaigns/new'
import { Route as ProtectedAppDashboardCampaignsIdImport } from './routes/_protected/app/_dashboard/campaigns/$id'

// Create Virtual Routes

const ProtectedAppImport = createFileRoute('/_protected/app')()

// Create/Update Routes

const ProtectedRoute = ProtectedImport.update({
  id: '/_protected',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const ProtectedAppRoute = ProtectedAppImport.update({
  id: '/app',
  path: '/app',
  getParentRoute: () => ProtectedRoute,
} as any)

const AuthRegisterRoute = AuthRegisterImport.update({
  id: '/auth/register',
  path: '/auth/register',
  getParentRoute: () => rootRoute,
} as any)

const AuthLoginRoute = AuthLoginImport.update({
  id: '/auth/login',
  path: '/auth/login',
  getParentRoute: () => rootRoute,
} as any)

const ProtectedAppDashboardRouteRoute = ProtectedAppDashboardRouteImport.update(
  {
    id: '/_dashboard',
    getParentRoute: () => ProtectedAppRoute,
  } as any,
)

const ProtectedAppWelcomeIndexRoute = ProtectedAppWelcomeIndexImport.update({
  id: '/welcome/',
  path: '/welcome/',
  getParentRoute: () => ProtectedAppRoute,
} as any)

const ProtectedAppDashboardIndexRoute = ProtectedAppDashboardIndexImport.update(
  {
    id: '/',
    path: '/',
    getParentRoute: () => ProtectedAppDashboardRouteRoute,
  } as any,
)

const ProtectedAppDashboardUserIndexRoute =
  ProtectedAppDashboardUserIndexImport.update({
    id: '/user/$index',
    path: '/user/$index',
    getParentRoute: () => ProtectedAppDashboardRouteRoute,
  } as any)

const ProtectedAppDashboardSessionsIndexRoute =
  ProtectedAppDashboardSessionsIndexImport.update({
    id: '/sessions/',
    path: '/sessions/',
    getParentRoute: () => ProtectedAppDashboardRouteRoute,
  } as any)

const ProtectedAppDashboardHelpIndexRoute =
  ProtectedAppDashboardHelpIndexImport.update({
    id: '/help/',
    path: '/help/',
    getParentRoute: () => ProtectedAppDashboardRouteRoute,
  } as any)

const ProtectedAppDashboardCharactersIndexRoute =
  ProtectedAppDashboardCharactersIndexImport.update({
    id: '/characters/',
    path: '/characters/',
    getParentRoute: () => ProtectedAppDashboardRouteRoute,
  } as any)

const ProtectedAppDashboardCampaignsIndexRoute =
  ProtectedAppDashboardCampaignsIndexImport.update({
    id: '/campaigns/',
    path: '/campaigns/',
    getParentRoute: () => ProtectedAppDashboardRouteRoute,
  } as any)

const ProtectedAppDashboardCalendarIndexRoute =
  ProtectedAppDashboardCalendarIndexImport.update({
    id: '/calendar/',
    path: '/calendar/',
    getParentRoute: () => ProtectedAppDashboardRouteRoute,
  } as any)

const ProtectedAppDashboardSessionsNewRoute =
  ProtectedAppDashboardSessionsNewImport.update({
    id: '/sessions/new',
    path: '/sessions/new',
    getParentRoute: () => ProtectedAppDashboardRouteRoute,
  } as any)

const ProtectedAppDashboardSessionsIdRoute =
  ProtectedAppDashboardSessionsIdImport.update({
    id: '/sessions/$id',
    path: '/sessions/$id',
    getParentRoute: () => ProtectedAppDashboardRouteRoute,
  } as any)

const ProtectedAppDashboardCharactersNewRoute =
  ProtectedAppDashboardCharactersNewImport.update({
    id: '/characters/new',
    path: '/characters/new',
    getParentRoute: () => ProtectedAppDashboardRouteRoute,
  } as any)

const ProtectedAppDashboardCharactersIdRoute =
  ProtectedAppDashboardCharactersIdImport.update({
    id: '/characters/$id',
    path: '/characters/$id',
    getParentRoute: () => ProtectedAppDashboardRouteRoute,
  } as any)

const ProtectedAppDashboardCampaignsNewRoute =
  ProtectedAppDashboardCampaignsNewImport.update({
    id: '/campaigns/new',
    path: '/campaigns/new',
    getParentRoute: () => ProtectedAppDashboardRouteRoute,
  } as any)

const ProtectedAppDashboardCampaignsIdRoute =
  ProtectedAppDashboardCampaignsIdImport.update({
    id: '/campaigns/$id',
    path: '/campaigns/$id',
    getParentRoute: () => ProtectedAppDashboardRouteRoute,
  } as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/_protected': {
      id: '/_protected'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof ProtectedImport
      parentRoute: typeof rootRoute
    }
    '/auth/login': {
      id: '/auth/login'
      path: '/auth/login'
      fullPath: '/auth/login'
      preLoaderRoute: typeof AuthLoginImport
      parentRoute: typeof rootRoute
    }
    '/auth/register': {
      id: '/auth/register'
      path: '/auth/register'
      fullPath: '/auth/register'
      preLoaderRoute: typeof AuthRegisterImport
      parentRoute: typeof rootRoute
    }
    '/_protected/app': {
      id: '/_protected/app'
      path: '/app'
      fullPath: '/app'
      preLoaderRoute: typeof ProtectedAppImport
      parentRoute: typeof ProtectedImport
    }
    '/_protected/app/_dashboard': {
      id: '/_protected/app/_dashboard'
      path: '/app'
      fullPath: '/app'
      preLoaderRoute: typeof ProtectedAppDashboardRouteImport
      parentRoute: typeof ProtectedAppRoute
    }
    '/_protected/app/_dashboard/': {
      id: '/_protected/app/_dashboard/'
      path: '/'
      fullPath: '/app/'
      preLoaderRoute: typeof ProtectedAppDashboardIndexImport
      parentRoute: typeof ProtectedAppDashboardRouteImport
    }
    '/_protected/app/welcome/': {
      id: '/_protected/app/welcome/'
      path: '/welcome'
      fullPath: '/app/welcome'
      preLoaderRoute: typeof ProtectedAppWelcomeIndexImport
      parentRoute: typeof ProtectedAppImport
    }
    '/_protected/app/_dashboard/campaigns/$id': {
      id: '/_protected/app/_dashboard/campaigns/$id'
      path: '/campaigns/$id'
      fullPath: '/app/campaigns/$id'
      preLoaderRoute: typeof ProtectedAppDashboardCampaignsIdImport
      parentRoute: typeof ProtectedAppDashboardRouteImport
    }
    '/_protected/app/_dashboard/campaigns/new': {
      id: '/_protected/app/_dashboard/campaigns/new'
      path: '/campaigns/new'
      fullPath: '/app/campaigns/new'
      preLoaderRoute: typeof ProtectedAppDashboardCampaignsNewImport
      parentRoute: typeof ProtectedAppDashboardRouteImport
    }
    '/_protected/app/_dashboard/characters/$id': {
      id: '/_protected/app/_dashboard/characters/$id'
      path: '/characters/$id'
      fullPath: '/app/characters/$id'
      preLoaderRoute: typeof ProtectedAppDashboardCharactersIdImport
      parentRoute: typeof ProtectedAppDashboardRouteImport
    }
    '/_protected/app/_dashboard/characters/new': {
      id: '/_protected/app/_dashboard/characters/new'
      path: '/characters/new'
      fullPath: '/app/characters/new'
      preLoaderRoute: typeof ProtectedAppDashboardCharactersNewImport
      parentRoute: typeof ProtectedAppDashboardRouteImport
    }
    '/_protected/app/_dashboard/sessions/$id': {
      id: '/_protected/app/_dashboard/sessions/$id'
      path: '/sessions/$id'
      fullPath: '/app/sessions/$id'
      preLoaderRoute: typeof ProtectedAppDashboardSessionsIdImport
      parentRoute: typeof ProtectedAppDashboardRouteImport
    }
    '/_protected/app/_dashboard/sessions/new': {
      id: '/_protected/app/_dashboard/sessions/new'
      path: '/sessions/new'
      fullPath: '/app/sessions/new'
      preLoaderRoute: typeof ProtectedAppDashboardSessionsNewImport
      parentRoute: typeof ProtectedAppDashboardRouteImport
    }
    '/_protected/app/_dashboard/user/$index': {
      id: '/_protected/app/_dashboard/user/$index'
      path: '/user/$index'
      fullPath: '/app/user/$index'
      preLoaderRoute: typeof ProtectedAppDashboardUserIndexImport
      parentRoute: typeof ProtectedAppDashboardRouteImport
    }
    '/_protected/app/_dashboard/calendar/': {
      id: '/_protected/app/_dashboard/calendar/'
      path: '/calendar'
      fullPath: '/app/calendar'
      preLoaderRoute: typeof ProtectedAppDashboardCalendarIndexImport
      parentRoute: typeof ProtectedAppDashboardRouteImport
    }
    '/_protected/app/_dashboard/campaigns/': {
      id: '/_protected/app/_dashboard/campaigns/'
      path: '/campaigns'
      fullPath: '/app/campaigns'
      preLoaderRoute: typeof ProtectedAppDashboardCampaignsIndexImport
      parentRoute: typeof ProtectedAppDashboardRouteImport
    }
    '/_protected/app/_dashboard/characters/': {
      id: '/_protected/app/_dashboard/characters/'
      path: '/characters'
      fullPath: '/app/characters'
      preLoaderRoute: typeof ProtectedAppDashboardCharactersIndexImport
      parentRoute: typeof ProtectedAppDashboardRouteImport
    }
    '/_protected/app/_dashboard/help/': {
      id: '/_protected/app/_dashboard/help/'
      path: '/help'
      fullPath: '/app/help'
      preLoaderRoute: typeof ProtectedAppDashboardHelpIndexImport
      parentRoute: typeof ProtectedAppDashboardRouteImport
    }
    '/_protected/app/_dashboard/sessions/': {
      id: '/_protected/app/_dashboard/sessions/'
      path: '/sessions'
      fullPath: '/app/sessions'
      preLoaderRoute: typeof ProtectedAppDashboardSessionsIndexImport
      parentRoute: typeof ProtectedAppDashboardRouteImport
    }
  }
}

// Create and export the route tree

interface ProtectedAppDashboardRouteRouteChildren {
  ProtectedAppDashboardIndexRoute: typeof ProtectedAppDashboardIndexRoute
  ProtectedAppDashboardCampaignsIdRoute: typeof ProtectedAppDashboardCampaignsIdRoute
  ProtectedAppDashboardCampaignsNewRoute: typeof ProtectedAppDashboardCampaignsNewRoute
  ProtectedAppDashboardCharactersIdRoute: typeof ProtectedAppDashboardCharactersIdRoute
  ProtectedAppDashboardCharactersNewRoute: typeof ProtectedAppDashboardCharactersNewRoute
  ProtectedAppDashboardSessionsIdRoute: typeof ProtectedAppDashboardSessionsIdRoute
  ProtectedAppDashboardSessionsNewRoute: typeof ProtectedAppDashboardSessionsNewRoute
  ProtectedAppDashboardUserIndexRoute: typeof ProtectedAppDashboardUserIndexRoute
  ProtectedAppDashboardCalendarIndexRoute: typeof ProtectedAppDashboardCalendarIndexRoute
  ProtectedAppDashboardCampaignsIndexRoute: typeof ProtectedAppDashboardCampaignsIndexRoute
  ProtectedAppDashboardCharactersIndexRoute: typeof ProtectedAppDashboardCharactersIndexRoute
  ProtectedAppDashboardHelpIndexRoute: typeof ProtectedAppDashboardHelpIndexRoute
  ProtectedAppDashboardSessionsIndexRoute: typeof ProtectedAppDashboardSessionsIndexRoute
}

const ProtectedAppDashboardRouteRouteChildren: ProtectedAppDashboardRouteRouteChildren =
  {
    ProtectedAppDashboardIndexRoute: ProtectedAppDashboardIndexRoute,
    ProtectedAppDashboardCampaignsIdRoute:
      ProtectedAppDashboardCampaignsIdRoute,
    ProtectedAppDashboardCampaignsNewRoute:
      ProtectedAppDashboardCampaignsNewRoute,
    ProtectedAppDashboardCharactersIdRoute:
      ProtectedAppDashboardCharactersIdRoute,
    ProtectedAppDashboardCharactersNewRoute:
      ProtectedAppDashboardCharactersNewRoute,
    ProtectedAppDashboardSessionsIdRoute: ProtectedAppDashboardSessionsIdRoute,
    ProtectedAppDashboardSessionsNewRoute:
      ProtectedAppDashboardSessionsNewRoute,
    ProtectedAppDashboardUserIndexRoute: ProtectedAppDashboardUserIndexRoute,
    ProtectedAppDashboardCalendarIndexRoute:
      ProtectedAppDashboardCalendarIndexRoute,
    ProtectedAppDashboardCampaignsIndexRoute:
      ProtectedAppDashboardCampaignsIndexRoute,
    ProtectedAppDashboardCharactersIndexRoute:
      ProtectedAppDashboardCharactersIndexRoute,
    ProtectedAppDashboardHelpIndexRoute: ProtectedAppDashboardHelpIndexRoute,
    ProtectedAppDashboardSessionsIndexRoute:
      ProtectedAppDashboardSessionsIndexRoute,
  }

const ProtectedAppDashboardRouteRouteWithChildren =
  ProtectedAppDashboardRouteRoute._addFileChildren(
    ProtectedAppDashboardRouteRouteChildren,
  )

interface ProtectedAppRouteChildren {
  ProtectedAppDashboardRouteRoute: typeof ProtectedAppDashboardRouteRouteWithChildren
  ProtectedAppWelcomeIndexRoute: typeof ProtectedAppWelcomeIndexRoute
}

const ProtectedAppRouteChildren: ProtectedAppRouteChildren = {
  ProtectedAppDashboardRouteRoute: ProtectedAppDashboardRouteRouteWithChildren,
  ProtectedAppWelcomeIndexRoute: ProtectedAppWelcomeIndexRoute,
}

const ProtectedAppRouteWithChildren = ProtectedAppRoute._addFileChildren(
  ProtectedAppRouteChildren,
)

interface ProtectedRouteChildren {
  ProtectedAppRoute: typeof ProtectedAppRouteWithChildren
}

const ProtectedRouteChildren: ProtectedRouteChildren = {
  ProtectedAppRoute: ProtectedAppRouteWithChildren,
}

const ProtectedRouteWithChildren = ProtectedRoute._addFileChildren(
  ProtectedRouteChildren,
)

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '': typeof ProtectedRouteWithChildren
  '/auth/login': typeof AuthLoginRoute
  '/auth/register': typeof AuthRegisterRoute
  '/app': typeof ProtectedAppDashboardRouteRouteWithChildren
  '/app/': typeof ProtectedAppDashboardIndexRoute
  '/app/welcome': typeof ProtectedAppWelcomeIndexRoute
  '/app/campaigns/$id': typeof ProtectedAppDashboardCampaignsIdRoute
  '/app/campaigns/new': typeof ProtectedAppDashboardCampaignsNewRoute
  '/app/characters/$id': typeof ProtectedAppDashboardCharactersIdRoute
  '/app/characters/new': typeof ProtectedAppDashboardCharactersNewRoute
  '/app/sessions/$id': typeof ProtectedAppDashboardSessionsIdRoute
  '/app/sessions/new': typeof ProtectedAppDashboardSessionsNewRoute
  '/app/user/$index': typeof ProtectedAppDashboardUserIndexRoute
  '/app/calendar': typeof ProtectedAppDashboardCalendarIndexRoute
  '/app/campaigns': typeof ProtectedAppDashboardCampaignsIndexRoute
  '/app/characters': typeof ProtectedAppDashboardCharactersIndexRoute
  '/app/help': typeof ProtectedAppDashboardHelpIndexRoute
  '/app/sessions': typeof ProtectedAppDashboardSessionsIndexRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '': typeof ProtectedRouteWithChildren
  '/auth/login': typeof AuthLoginRoute
  '/auth/register': typeof AuthRegisterRoute
  '/app': typeof ProtectedAppDashboardIndexRoute
  '/app/welcome': typeof ProtectedAppWelcomeIndexRoute
  '/app/campaigns/$id': typeof ProtectedAppDashboardCampaignsIdRoute
  '/app/campaigns/new': typeof ProtectedAppDashboardCampaignsNewRoute
  '/app/characters/$id': typeof ProtectedAppDashboardCharactersIdRoute
  '/app/characters/new': typeof ProtectedAppDashboardCharactersNewRoute
  '/app/sessions/$id': typeof ProtectedAppDashboardSessionsIdRoute
  '/app/sessions/new': typeof ProtectedAppDashboardSessionsNewRoute
  '/app/user/$index': typeof ProtectedAppDashboardUserIndexRoute
  '/app/calendar': typeof ProtectedAppDashboardCalendarIndexRoute
  '/app/campaigns': typeof ProtectedAppDashboardCampaignsIndexRoute
  '/app/characters': typeof ProtectedAppDashboardCharactersIndexRoute
  '/app/help': typeof ProtectedAppDashboardHelpIndexRoute
  '/app/sessions': typeof ProtectedAppDashboardSessionsIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/_protected': typeof ProtectedRouteWithChildren
  '/auth/login': typeof AuthLoginRoute
  '/auth/register': typeof AuthRegisterRoute
  '/_protected/app': typeof ProtectedAppRouteWithChildren
  '/_protected/app/_dashboard': typeof ProtectedAppDashboardRouteRouteWithChildren
  '/_protected/app/_dashboard/': typeof ProtectedAppDashboardIndexRoute
  '/_protected/app/welcome/': typeof ProtectedAppWelcomeIndexRoute
  '/_protected/app/_dashboard/campaigns/$id': typeof ProtectedAppDashboardCampaignsIdRoute
  '/_protected/app/_dashboard/campaigns/new': typeof ProtectedAppDashboardCampaignsNewRoute
  '/_protected/app/_dashboard/characters/$id': typeof ProtectedAppDashboardCharactersIdRoute
  '/_protected/app/_dashboard/characters/new': typeof ProtectedAppDashboardCharactersNewRoute
  '/_protected/app/_dashboard/sessions/$id': typeof ProtectedAppDashboardSessionsIdRoute
  '/_protected/app/_dashboard/sessions/new': typeof ProtectedAppDashboardSessionsNewRoute
  '/_protected/app/_dashboard/user/$index': typeof ProtectedAppDashboardUserIndexRoute
  '/_protected/app/_dashboard/calendar/': typeof ProtectedAppDashboardCalendarIndexRoute
  '/_protected/app/_dashboard/campaigns/': typeof ProtectedAppDashboardCampaignsIndexRoute
  '/_protected/app/_dashboard/characters/': typeof ProtectedAppDashboardCharactersIndexRoute
  '/_protected/app/_dashboard/help/': typeof ProtectedAppDashboardHelpIndexRoute
  '/_protected/app/_dashboard/sessions/': typeof ProtectedAppDashboardSessionsIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | ''
    | '/auth/login'
    | '/auth/register'
    | '/app'
    | '/app/'
    | '/app/welcome'
    | '/app/campaigns/$id'
    | '/app/campaigns/new'
    | '/app/characters/$id'
    | '/app/characters/new'
    | '/app/sessions/$id'
    | '/app/sessions/new'
    | '/app/user/$index'
    | '/app/calendar'
    | '/app/campaigns'
    | '/app/characters'
    | '/app/help'
    | '/app/sessions'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | ''
    | '/auth/login'
    | '/auth/register'
    | '/app'
    | '/app/welcome'
    | '/app/campaigns/$id'
    | '/app/campaigns/new'
    | '/app/characters/$id'
    | '/app/characters/new'
    | '/app/sessions/$id'
    | '/app/sessions/new'
    | '/app/user/$index'
    | '/app/calendar'
    | '/app/campaigns'
    | '/app/characters'
    | '/app/help'
    | '/app/sessions'
  id:
    | '__root__'
    | '/'
    | '/_protected'
    | '/auth/login'
    | '/auth/register'
    | '/_protected/app'
    | '/_protected/app/_dashboard'
    | '/_protected/app/_dashboard/'
    | '/_protected/app/welcome/'
    | '/_protected/app/_dashboard/campaigns/$id'
    | '/_protected/app/_dashboard/campaigns/new'
    | '/_protected/app/_dashboard/characters/$id'
    | '/_protected/app/_dashboard/characters/new'
    | '/_protected/app/_dashboard/sessions/$id'
    | '/_protected/app/_dashboard/sessions/new'
    | '/_protected/app/_dashboard/user/$index'
    | '/_protected/app/_dashboard/calendar/'
    | '/_protected/app/_dashboard/campaigns/'
    | '/_protected/app/_dashboard/characters/'
    | '/_protected/app/_dashboard/help/'
    | '/_protected/app/_dashboard/sessions/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  ProtectedRoute: typeof ProtectedRouteWithChildren
  AuthLoginRoute: typeof AuthLoginRoute
  AuthRegisterRoute: typeof AuthRegisterRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  ProtectedRoute: ProtectedRouteWithChildren,
  AuthLoginRoute: AuthLoginRoute,
  AuthRegisterRoute: AuthRegisterRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/_protected",
        "/auth/login",
        "/auth/register"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/_protected": {
      "filePath": "_protected.tsx",
      "children": [
        "/_protected/app"
      ]
    },
    "/auth/login": {
      "filePath": "auth/login.tsx"
    },
    "/auth/register": {
      "filePath": "auth/register.tsx"
    },
    "/_protected/app": {
      "filePath": "_protected/app/_dashboard",
      "parent": "/_protected",
      "children": [
        "/_protected/app/_dashboard",
        "/_protected/app/welcome/"
      ]
    },
    "/_protected/app/_dashboard": {
      "filePath": "_protected/app/_dashboard/route.tsx",
      "parent": "/_protected/app",
      "children": [
        "/_protected/app/_dashboard/",
        "/_protected/app/_dashboard/campaigns/$id",
        "/_protected/app/_dashboard/campaigns/new",
        "/_protected/app/_dashboard/characters/$id",
        "/_protected/app/_dashboard/characters/new",
        "/_protected/app/_dashboard/sessions/$id",
        "/_protected/app/_dashboard/sessions/new",
        "/_protected/app/_dashboard/user/$index",
        "/_protected/app/_dashboard/calendar/",
        "/_protected/app/_dashboard/campaigns/",
        "/_protected/app/_dashboard/characters/",
        "/_protected/app/_dashboard/help/",
        "/_protected/app/_dashboard/sessions/"
      ]
    },
    "/_protected/app/_dashboard/": {
      "filePath": "_protected/app/_dashboard/index.tsx",
      "parent": "/_protected/app/_dashboard"
    },
    "/_protected/app/welcome/": {
      "filePath": "_protected/app/welcome/index.tsx",
      "parent": "/_protected/app"
    },
    "/_protected/app/_dashboard/campaigns/$id": {
      "filePath": "_protected/app/_dashboard/campaigns/$id.tsx",
      "parent": "/_protected/app/_dashboard"
    },
    "/_protected/app/_dashboard/campaigns/new": {
      "filePath": "_protected/app/_dashboard/campaigns/new.tsx",
      "parent": "/_protected/app/_dashboard"
    },
    "/_protected/app/_dashboard/characters/$id": {
      "filePath": "_protected/app/_dashboard/characters/$id.tsx",
      "parent": "/_protected/app/_dashboard"
    },
    "/_protected/app/_dashboard/characters/new": {
      "filePath": "_protected/app/_dashboard/characters/new.tsx",
      "parent": "/_protected/app/_dashboard"
    },
    "/_protected/app/_dashboard/sessions/$id": {
      "filePath": "_protected/app/_dashboard/sessions/$id.tsx",
      "parent": "/_protected/app/_dashboard"
    },
    "/_protected/app/_dashboard/sessions/new": {
      "filePath": "_protected/app/_dashboard/sessions/new.tsx",
      "parent": "/_protected/app/_dashboard"
    },
    "/_protected/app/_dashboard/user/$index": {
      "filePath": "_protected/app/_dashboard/user/$index.tsx",
      "parent": "/_protected/app/_dashboard"
    },
    "/_protected/app/_dashboard/calendar/": {
      "filePath": "_protected/app/_dashboard/calendar/index.tsx",
      "parent": "/_protected/app/_dashboard"
    },
    "/_protected/app/_dashboard/campaigns/": {
      "filePath": "_protected/app/_dashboard/campaigns/index.tsx",
      "parent": "/_protected/app/_dashboard"
    },
    "/_protected/app/_dashboard/characters/": {
      "filePath": "_protected/app/_dashboard/characters/index.tsx",
      "parent": "/_protected/app/_dashboard"
    },
    "/_protected/app/_dashboard/help/": {
      "filePath": "_protected/app/_dashboard/help/index.tsx",
      "parent": "/_protected/app/_dashboard"
    },
    "/_protected/app/_dashboard/sessions/": {
      "filePath": "_protected/app/_dashboard/sessions/index.tsx",
      "parent": "/_protected/app/_dashboard"
    }
  }
}
ROUTE_MANIFEST_END */
