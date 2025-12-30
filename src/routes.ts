import {
  createBrowserRouter, redirect,
} from "react-router";
import authMiddleware from "@/common/auth-middleware.ts";
import Layout from "@/Layouts/Layout.tsx";
import { LoginPage } from "@/pages/login/page.tsx";
import { AuthLayout } from "@/Layouts/AuthLayout.tsx";
import { TablePage } from "@/pages/table/page.tsx";
import { FormPage } from "@/pages/form/page.tsx";
import App from "@/App.tsx";

export const PAGE_PATHS = {
  LOGIN: "/login",
  DASHBOARD: "/dashboard",
  FORM: "/form",
};

const router = createBrowserRouter([
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
    ],
  },
]);


export { router };