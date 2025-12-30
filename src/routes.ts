import { lazy } from 'react';
import {
  createBrowserRouter, redirect,
} from "react-router";
import authMiddleware from "@/common/auth-middleware.ts";
import Layout from "@/Layouts/Layout.tsx";
import { AuthLayout } from "@/Layouts/AuthLayout.tsx";
import App from "@/App.tsx";
import NotFound from "@/pages/not-found/not-found.tsx";

export const PAGE_PATHS = {
  LOGIN: "login",
  DASHBOARD: "dashboard",
  FORM: "form",
};

const TablePage = lazy(() => import("@/pages/table/page").then(m => ({ default: m.TablePage })));
const FormPage = lazy(() => import("@/pages/form/page").then(m => ({ default: m.FormPage })));
const LoginPage = lazy(() => import("@/pages/login/page").then(m => ({ default: m.LoginPage })));

const router = createBrowserRouter([
  {
    path: "/test-case-app",
    Component: App,
    children: [

      {
        Component: AuthLayout,
        children: [
          { path: PAGE_PATHS.LOGIN, Component: LoginPage },
        ],
      },

      {
        Component:  Layout,
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
      { path: "*", Component: NotFound },
    ],
  },
]);


export { router };