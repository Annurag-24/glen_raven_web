import { lazy } from "react";
import { createBrowserRouter, Navigate } from "react-router";

// lazy route
import LazyRoute from "@/components/LazyRoute";

// layouts
import AuthLayout from "@/layouts/Auth";
import DashboardLayout from "@/layouts/Dashboard";

// error boundary
import ErrorBoundary from "@/components/ErrorBoundary";

// lazy loaded pages
const Home = lazy(() => import("@/pages/dashboard/home"));
const Login = lazy(() => import("@/pages/auth/login"));
const PageNotFound = lazy(() => import("@/pages/page-not-found"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <DashboardLayout />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        index: true,
        element: <LazyRoute component={Home} />,
      },
      // add more dashboard routes here
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        index: true,
        element: <Navigate to="/auth/login" replace />,
      },
      {
        path: "login",
        element: <LazyRoute component={Login} />,
      },
      // add more auth routes (register, forgot-password, etc.)
    ],
  },
  {
    path: "*",
    element: <LazyRoute component={PageNotFound} />,
  },
]);

export default router;
