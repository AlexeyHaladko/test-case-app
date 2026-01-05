import { lazy } from 'react';
import {
  createHashRouter, redirect,
} from "react-router";
import authMiddleware from "@/common/auth-middleware.ts";
import CommonLayout from "@/layouts/common-layout";
import { AuthLayout } from "@/layouts/auth-layout";
import App from "@/App";
import Page from "@/pages/not-found/page";

export const PAGE_PATHS = {
  LOGIN: "/login",
  DASHBOARD: "/dashboard",
  FORM: "/form",
};

const TablePage = lazy(() => import("@/pages/table/page").then(m => ({ default: m.TablePage })));
const FormPage = lazy(() => import("@/pages/form/page").then(m => ({ default: m.FormPage })));
const LoginPage = lazy(() => import("@/pages/login/page").then(m => ({ default: m.LoginPage })));

const router = createHashRouter([
  {
    path: "/",
    Component: App,
    children: [

      {
        Component: AuthLayout,
        children: [
          { path: PAGE_PATHS.LOGIN, Component: LoginPage },
        ],
      },

      {
        Component:  CommonLayout,
        middleware: [authMiddleware],
        children: [
          {
            index: true,
            loader: () => redirect(PAGE_PATHS.DASHBOARD)
          },
          { path: PAGE_PATHS.DASHBOARD, Component: TablePage },
          { path: PAGE_PATHS.FORM, Component: FormPage },
        ],
      },
      { path: "*", Component: Page },
    ],
  },
]);


export { router };