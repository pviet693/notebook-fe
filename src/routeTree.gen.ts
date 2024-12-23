/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as LayoutImport } from './routes/_layout'
import { Route as AuthImport } from './routes/_auth'
import { Route as LayoutIndexImport } from './routes/_layout/index'
import { Route as LayoutSearchImport } from './routes/_layout/search'
import { Route as LayoutAuthenticatedImport } from './routes/_layout/_authenticated'
import { Route as AuthSignupImport } from './routes/_auth/signup'
import { Route as AuthSigninImport } from './routes/_auth/signin'
import { Route as AuthForgotPasswordImport } from './routes/_auth/forgot-password'
import { Route as LayoutBlogsBlogSlugImport } from './routes/_layout/blogs/$blogSlug'
import { Route as LayoutAuthorsUsernameImport } from './routes/_layout/authors/$username'
import { Route as LayoutAuthenticatedMeImport } from './routes/_layout/_authenticated/me'
import { Route as LayoutAuthenticatedBlogsCreateImport } from './routes/_layout/_authenticated/blogs/create'
import { Route as LayoutAuthenticatedMeSettingsProfileImport } from './routes/_layout/_authenticated/me/settings/profile'
import { Route as LayoutAuthenticatedMeSettingsPasswordImport } from './routes/_layout/_authenticated/me/settings/password'
import { Route as LayoutAuthenticatedMeDashboardBlogsImport } from './routes/_layout/_authenticated/me/dashboard/blogs'
import { Route as LayoutAuthenticatedBlogsBlogIdEditImport } from './routes/_layout/_authenticated/blogs/$blogId.edit'

// Create/Update Routes

const LayoutRoute = LayoutImport.update({
  id: '/_layout',
  getParentRoute: () => rootRoute,
} as any)

const AuthRoute = AuthImport.update({
  id: '/_auth',
  getParentRoute: () => rootRoute,
} as any)

const LayoutIndexRoute = LayoutIndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => LayoutRoute,
} as any)

const LayoutSearchRoute = LayoutSearchImport.update({
  id: '/search',
  path: '/search',
  getParentRoute: () => LayoutRoute,
} as any)

const LayoutAuthenticatedRoute = LayoutAuthenticatedImport.update({
  id: '/_authenticated',
  getParentRoute: () => LayoutRoute,
} as any)

const AuthSignupRoute = AuthSignupImport.update({
  id: '/signup',
  path: '/signup',
  getParentRoute: () => AuthRoute,
} as any)

const AuthSigninRoute = AuthSigninImport.update({
  id: '/signin',
  path: '/signin',
  getParentRoute: () => AuthRoute,
} as any)

const AuthForgotPasswordRoute = AuthForgotPasswordImport.update({
  id: '/forgot-password',
  path: '/forgot-password',
  getParentRoute: () => AuthRoute,
} as any)

const LayoutBlogsBlogSlugRoute = LayoutBlogsBlogSlugImport.update({
  id: '/blogs/$blogSlug',
  path: '/blogs/$blogSlug',
  getParentRoute: () => LayoutRoute,
} as any)

const LayoutAuthorsUsernameRoute = LayoutAuthorsUsernameImport.update({
  id: '/authors/$username',
  path: '/authors/$username',
  getParentRoute: () => LayoutRoute,
} as any)

const LayoutAuthenticatedMeRoute = LayoutAuthenticatedMeImport.update({
  id: '/me',
  path: '/me',
  getParentRoute: () => LayoutAuthenticatedRoute,
} as any)

const LayoutAuthenticatedBlogsCreateRoute =
  LayoutAuthenticatedBlogsCreateImport.update({
    id: '/blogs/create',
    path: '/blogs/create',
    getParentRoute: () => LayoutAuthenticatedRoute,
  } as any)

const LayoutAuthenticatedMeSettingsProfileRoute =
  LayoutAuthenticatedMeSettingsProfileImport.update({
    id: '/settings/profile',
    path: '/settings/profile',
    getParentRoute: () => LayoutAuthenticatedMeRoute,
  } as any)

const LayoutAuthenticatedMeSettingsPasswordRoute =
  LayoutAuthenticatedMeSettingsPasswordImport.update({
    id: '/settings/password',
    path: '/settings/password',
    getParentRoute: () => LayoutAuthenticatedMeRoute,
  } as any)

const LayoutAuthenticatedMeDashboardBlogsRoute =
  LayoutAuthenticatedMeDashboardBlogsImport.update({
    id: '/dashboard/blogs',
    path: '/dashboard/blogs',
    getParentRoute: () => LayoutAuthenticatedMeRoute,
  } as any)

const LayoutAuthenticatedBlogsBlogIdEditRoute =
  LayoutAuthenticatedBlogsBlogIdEditImport.update({
    id: '/blogs/$blogId/edit',
    path: '/blogs/$blogId/edit',
    getParentRoute: () => LayoutAuthenticatedRoute,
  } as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/_auth': {
      id: '/_auth'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof AuthImport
      parentRoute: typeof rootRoute
    }
    '/_layout': {
      id: '/_layout'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof LayoutImport
      parentRoute: typeof rootRoute
    }
    '/_auth/forgot-password': {
      id: '/_auth/forgot-password'
      path: '/forgot-password'
      fullPath: '/forgot-password'
      preLoaderRoute: typeof AuthForgotPasswordImport
      parentRoute: typeof AuthImport
    }
    '/_auth/signin': {
      id: '/_auth/signin'
      path: '/signin'
      fullPath: '/signin'
      preLoaderRoute: typeof AuthSigninImport
      parentRoute: typeof AuthImport
    }
    '/_auth/signup': {
      id: '/_auth/signup'
      path: '/signup'
      fullPath: '/signup'
      preLoaderRoute: typeof AuthSignupImport
      parentRoute: typeof AuthImport
    }
    '/_layout/_authenticated': {
      id: '/_layout/_authenticated'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof LayoutAuthenticatedImport
      parentRoute: typeof LayoutImport
    }
    '/_layout/search': {
      id: '/_layout/search'
      path: '/search'
      fullPath: '/search'
      preLoaderRoute: typeof LayoutSearchImport
      parentRoute: typeof LayoutImport
    }
    '/_layout/': {
      id: '/_layout/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof LayoutIndexImport
      parentRoute: typeof LayoutImport
    }
    '/_layout/_authenticated/me': {
      id: '/_layout/_authenticated/me'
      path: '/me'
      fullPath: '/me'
      preLoaderRoute: typeof LayoutAuthenticatedMeImport
      parentRoute: typeof LayoutAuthenticatedImport
    }
    '/_layout/authors/$username': {
      id: '/_layout/authors/$username'
      path: '/authors/$username'
      fullPath: '/authors/$username'
      preLoaderRoute: typeof LayoutAuthorsUsernameImport
      parentRoute: typeof LayoutImport
    }
    '/_layout/blogs/$blogSlug': {
      id: '/_layout/blogs/$blogSlug'
      path: '/blogs/$blogSlug'
      fullPath: '/blogs/$blogSlug'
      preLoaderRoute: typeof LayoutBlogsBlogSlugImport
      parentRoute: typeof LayoutImport
    }
    '/_layout/_authenticated/blogs/create': {
      id: '/_layout/_authenticated/blogs/create'
      path: '/blogs/create'
      fullPath: '/blogs/create'
      preLoaderRoute: typeof LayoutAuthenticatedBlogsCreateImport
      parentRoute: typeof LayoutAuthenticatedImport
    }
    '/_layout/_authenticated/blogs/$blogId/edit': {
      id: '/_layout/_authenticated/blogs/$blogId/edit'
      path: '/blogs/$blogId/edit'
      fullPath: '/blogs/$blogId/edit'
      preLoaderRoute: typeof LayoutAuthenticatedBlogsBlogIdEditImport
      parentRoute: typeof LayoutAuthenticatedImport
    }
    '/_layout/_authenticated/me/dashboard/blogs': {
      id: '/_layout/_authenticated/me/dashboard/blogs'
      path: '/dashboard/blogs'
      fullPath: '/me/dashboard/blogs'
      preLoaderRoute: typeof LayoutAuthenticatedMeDashboardBlogsImport
      parentRoute: typeof LayoutAuthenticatedMeImport
    }
    '/_layout/_authenticated/me/settings/password': {
      id: '/_layout/_authenticated/me/settings/password'
      path: '/settings/password'
      fullPath: '/me/settings/password'
      preLoaderRoute: typeof LayoutAuthenticatedMeSettingsPasswordImport
      parentRoute: typeof LayoutAuthenticatedMeImport
    }
    '/_layout/_authenticated/me/settings/profile': {
      id: '/_layout/_authenticated/me/settings/profile'
      path: '/settings/profile'
      fullPath: '/me/settings/profile'
      preLoaderRoute: typeof LayoutAuthenticatedMeSettingsProfileImport
      parentRoute: typeof LayoutAuthenticatedMeImport
    }
  }
}

// Create and export the route tree

interface AuthRouteChildren {
  AuthForgotPasswordRoute: typeof AuthForgotPasswordRoute
  AuthSigninRoute: typeof AuthSigninRoute
  AuthSignupRoute: typeof AuthSignupRoute
}

const AuthRouteChildren: AuthRouteChildren = {
  AuthForgotPasswordRoute: AuthForgotPasswordRoute,
  AuthSigninRoute: AuthSigninRoute,
  AuthSignupRoute: AuthSignupRoute,
}

const AuthRouteWithChildren = AuthRoute._addFileChildren(AuthRouteChildren)

interface LayoutAuthenticatedMeRouteChildren {
  LayoutAuthenticatedMeDashboardBlogsRoute: typeof LayoutAuthenticatedMeDashboardBlogsRoute
  LayoutAuthenticatedMeSettingsPasswordRoute: typeof LayoutAuthenticatedMeSettingsPasswordRoute
  LayoutAuthenticatedMeSettingsProfileRoute: typeof LayoutAuthenticatedMeSettingsProfileRoute
}

const LayoutAuthenticatedMeRouteChildren: LayoutAuthenticatedMeRouteChildren = {
  LayoutAuthenticatedMeDashboardBlogsRoute:
    LayoutAuthenticatedMeDashboardBlogsRoute,
  LayoutAuthenticatedMeSettingsPasswordRoute:
    LayoutAuthenticatedMeSettingsPasswordRoute,
  LayoutAuthenticatedMeSettingsProfileRoute:
    LayoutAuthenticatedMeSettingsProfileRoute,
}

const LayoutAuthenticatedMeRouteWithChildren =
  LayoutAuthenticatedMeRoute._addFileChildren(
    LayoutAuthenticatedMeRouteChildren,
  )

interface LayoutAuthenticatedRouteChildren {
  LayoutAuthenticatedMeRoute: typeof LayoutAuthenticatedMeRouteWithChildren
  LayoutAuthenticatedBlogsCreateRoute: typeof LayoutAuthenticatedBlogsCreateRoute
  LayoutAuthenticatedBlogsBlogIdEditRoute: typeof LayoutAuthenticatedBlogsBlogIdEditRoute
}

const LayoutAuthenticatedRouteChildren: LayoutAuthenticatedRouteChildren = {
  LayoutAuthenticatedMeRoute: LayoutAuthenticatedMeRouteWithChildren,
  LayoutAuthenticatedBlogsCreateRoute: LayoutAuthenticatedBlogsCreateRoute,
  LayoutAuthenticatedBlogsBlogIdEditRoute:
    LayoutAuthenticatedBlogsBlogIdEditRoute,
}

const LayoutAuthenticatedRouteWithChildren =
  LayoutAuthenticatedRoute._addFileChildren(LayoutAuthenticatedRouteChildren)

interface LayoutRouteChildren {
  LayoutAuthenticatedRoute: typeof LayoutAuthenticatedRouteWithChildren
  LayoutSearchRoute: typeof LayoutSearchRoute
  LayoutIndexRoute: typeof LayoutIndexRoute
  LayoutAuthorsUsernameRoute: typeof LayoutAuthorsUsernameRoute
  LayoutBlogsBlogSlugRoute: typeof LayoutBlogsBlogSlugRoute
}

const LayoutRouteChildren: LayoutRouteChildren = {
  LayoutAuthenticatedRoute: LayoutAuthenticatedRouteWithChildren,
  LayoutSearchRoute: LayoutSearchRoute,
  LayoutIndexRoute: LayoutIndexRoute,
  LayoutAuthorsUsernameRoute: LayoutAuthorsUsernameRoute,
  LayoutBlogsBlogSlugRoute: LayoutBlogsBlogSlugRoute,
}

const LayoutRouteWithChildren =
  LayoutRoute._addFileChildren(LayoutRouteChildren)

export interface FileRoutesByFullPath {
  '': typeof LayoutAuthenticatedRouteWithChildren
  '/forgot-password': typeof AuthForgotPasswordRoute
  '/signin': typeof AuthSigninRoute
  '/signup': typeof AuthSignupRoute
  '/search': typeof LayoutSearchRoute
  '/': typeof LayoutIndexRoute
  '/me': typeof LayoutAuthenticatedMeRouteWithChildren
  '/authors/$username': typeof LayoutAuthorsUsernameRoute
  '/blogs/$blogSlug': typeof LayoutBlogsBlogSlugRoute
  '/blogs/create': typeof LayoutAuthenticatedBlogsCreateRoute
  '/blogs/$blogId/edit': typeof LayoutAuthenticatedBlogsBlogIdEditRoute
  '/me/dashboard/blogs': typeof LayoutAuthenticatedMeDashboardBlogsRoute
  '/me/settings/password': typeof LayoutAuthenticatedMeSettingsPasswordRoute
  '/me/settings/profile': typeof LayoutAuthenticatedMeSettingsProfileRoute
}

export interface FileRoutesByTo {
  '': typeof LayoutAuthenticatedRouteWithChildren
  '/forgot-password': typeof AuthForgotPasswordRoute
  '/signin': typeof AuthSigninRoute
  '/signup': typeof AuthSignupRoute
  '/search': typeof LayoutSearchRoute
  '/': typeof LayoutIndexRoute
  '/me': typeof LayoutAuthenticatedMeRouteWithChildren
  '/authors/$username': typeof LayoutAuthorsUsernameRoute
  '/blogs/$blogSlug': typeof LayoutBlogsBlogSlugRoute
  '/blogs/create': typeof LayoutAuthenticatedBlogsCreateRoute
  '/blogs/$blogId/edit': typeof LayoutAuthenticatedBlogsBlogIdEditRoute
  '/me/dashboard/blogs': typeof LayoutAuthenticatedMeDashboardBlogsRoute
  '/me/settings/password': typeof LayoutAuthenticatedMeSettingsPasswordRoute
  '/me/settings/profile': typeof LayoutAuthenticatedMeSettingsProfileRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/_auth': typeof AuthRouteWithChildren
  '/_layout': typeof LayoutRouteWithChildren
  '/_auth/forgot-password': typeof AuthForgotPasswordRoute
  '/_auth/signin': typeof AuthSigninRoute
  '/_auth/signup': typeof AuthSignupRoute
  '/_layout/_authenticated': typeof LayoutAuthenticatedRouteWithChildren
  '/_layout/search': typeof LayoutSearchRoute
  '/_layout/': typeof LayoutIndexRoute
  '/_layout/_authenticated/me': typeof LayoutAuthenticatedMeRouteWithChildren
  '/_layout/authors/$username': typeof LayoutAuthorsUsernameRoute
  '/_layout/blogs/$blogSlug': typeof LayoutBlogsBlogSlugRoute
  '/_layout/_authenticated/blogs/create': typeof LayoutAuthenticatedBlogsCreateRoute
  '/_layout/_authenticated/blogs/$blogId/edit': typeof LayoutAuthenticatedBlogsBlogIdEditRoute
  '/_layout/_authenticated/me/dashboard/blogs': typeof LayoutAuthenticatedMeDashboardBlogsRoute
  '/_layout/_authenticated/me/settings/password': typeof LayoutAuthenticatedMeSettingsPasswordRoute
  '/_layout/_authenticated/me/settings/profile': typeof LayoutAuthenticatedMeSettingsProfileRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | ''
    | '/forgot-password'
    | '/signin'
    | '/signup'
    | '/search'
    | '/'
    | '/me'
    | '/authors/$username'
    | '/blogs/$blogSlug'
    | '/blogs/create'
    | '/blogs/$blogId/edit'
    | '/me/dashboard/blogs'
    | '/me/settings/password'
    | '/me/settings/profile'
  fileRoutesByTo: FileRoutesByTo
  to:
    | ''
    | '/forgot-password'
    | '/signin'
    | '/signup'
    | '/search'
    | '/'
    | '/me'
    | '/authors/$username'
    | '/blogs/$blogSlug'
    | '/blogs/create'
    | '/blogs/$blogId/edit'
    | '/me/dashboard/blogs'
    | '/me/settings/password'
    | '/me/settings/profile'
  id:
    | '__root__'
    | '/_auth'
    | '/_layout'
    | '/_auth/forgot-password'
    | '/_auth/signin'
    | '/_auth/signup'
    | '/_layout/_authenticated'
    | '/_layout/search'
    | '/_layout/'
    | '/_layout/_authenticated/me'
    | '/_layout/authors/$username'
    | '/_layout/blogs/$blogSlug'
    | '/_layout/_authenticated/blogs/create'
    | '/_layout/_authenticated/blogs/$blogId/edit'
    | '/_layout/_authenticated/me/dashboard/blogs'
    | '/_layout/_authenticated/me/settings/password'
    | '/_layout/_authenticated/me/settings/profile'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  AuthRoute: typeof AuthRouteWithChildren
  LayoutRoute: typeof LayoutRouteWithChildren
}

const rootRouteChildren: RootRouteChildren = {
  AuthRoute: AuthRouteWithChildren,
  LayoutRoute: LayoutRouteWithChildren,
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
        "/_auth",
        "/_layout"
      ]
    },
    "/_auth": {
      "filePath": "_auth.tsx",
      "children": [
        "/_auth/forgot-password",
        "/_auth/signin",
        "/_auth/signup"
      ]
    },
    "/_layout": {
      "filePath": "_layout.tsx",
      "children": [
        "/_layout/_authenticated",
        "/_layout/search",
        "/_layout/",
        "/_layout/authors/$username",
        "/_layout/blogs/$blogSlug"
      ]
    },
    "/_auth/forgot-password": {
      "filePath": "_auth/forgot-password.tsx",
      "parent": "/_auth"
    },
    "/_auth/signin": {
      "filePath": "_auth/signin.tsx",
      "parent": "/_auth"
    },
    "/_auth/signup": {
      "filePath": "_auth/signup.tsx",
      "parent": "/_auth"
    },
    "/_layout/_authenticated": {
      "filePath": "_layout/_authenticated.tsx",
      "parent": "/_layout",
      "children": [
        "/_layout/_authenticated/me",
        "/_layout/_authenticated/blogs/create",
        "/_layout/_authenticated/blogs/$blogId/edit"
      ]
    },
    "/_layout/search": {
      "filePath": "_layout/search.tsx",
      "parent": "/_layout"
    },
    "/_layout/": {
      "filePath": "_layout/index.tsx",
      "parent": "/_layout"
    },
    "/_layout/_authenticated/me": {
      "filePath": "_layout/_authenticated/me.tsx",
      "parent": "/_layout/_authenticated",
      "children": [
        "/_layout/_authenticated/me/dashboard/blogs",
        "/_layout/_authenticated/me/settings/password",
        "/_layout/_authenticated/me/settings/profile"
      ]
    },
    "/_layout/authors/$username": {
      "filePath": "_layout/authors/$username.tsx",
      "parent": "/_layout"
    },
    "/_layout/blogs/$blogSlug": {
      "filePath": "_layout/blogs/$blogSlug.tsx",
      "parent": "/_layout"
    },
    "/_layout/_authenticated/blogs/create": {
      "filePath": "_layout/_authenticated/blogs/create.tsx",
      "parent": "/_layout/_authenticated"
    },
    "/_layout/_authenticated/blogs/$blogId/edit": {
      "filePath": "_layout/_authenticated/blogs/$blogId.edit.tsx",
      "parent": "/_layout/_authenticated"
    },
    "/_layout/_authenticated/me/dashboard/blogs": {
      "filePath": "_layout/_authenticated/me/dashboard/blogs.tsx",
      "parent": "/_layout/_authenticated/me"
    },
    "/_layout/_authenticated/me/settings/password": {
      "filePath": "_layout/_authenticated/me/settings/password.tsx",
      "parent": "/_layout/_authenticated/me"
    },
    "/_layout/_authenticated/me/settings/profile": {
      "filePath": "_layout/_authenticated/me/settings/profile.tsx",
      "parent": "/_layout/_authenticated/me"
    }
  }
}
ROUTE_MANIFEST_END */
