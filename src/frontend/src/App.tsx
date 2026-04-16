import { Skeleton } from "@/components/ui/skeleton";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
  redirect,
} from "@tanstack/react-router";
import { ThemeProvider } from "next-themes";
import { Suspense, lazy } from "react";
import { Layout } from "./components/Layout";
import { useAuthStore } from "./store/authStore";

// Lazy-loaded pages
const LoginPage = lazy(() => import("./pages/LoginPage"));
const RegisterPage = lazy(() => import("./pages/RegisterPage"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const AdminCreateNotice = lazy(() => import("./pages/AdminCreateNotice"));
const StudentNotices = lazy(() => import("./pages/StudentNotices"));
const AnalyticsPage = lazy(() => import("./pages/AnalyticsPage"));

function PageLoader() {
  return (
    <div className="p-8 space-y-4">
      <Skeleton className="h-8 w-48" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-3/4" />
    </div>
  );
}

function S({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={<PageLoader />}>{children}</Suspense>;
}

function requireAuth(expectedRole?: "admin" | "student") {
  const { isAuthenticated, role: userRole } = useAuthStore.getState();
  if (!isAuthenticated) {
    throw redirect({ to: "/login" });
  }
  if (expectedRole && userRole !== expectedRole) {
    throw redirect({
      to: userRole === "admin" ? "/admin/dashboard" : "/student/notices",
    });
  }
}

// Root route
const rootRoute = createRootRoute({
  component: () => <Outlet />,
});

// Auth routes
const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: () => (
    <S>
      <LoginPage />
    </S>
  ),
});

const registerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/register",
  component: () => (
    <S>
      <RegisterPage />
    </S>
  ),
});

// Index redirect
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  beforeLoad: () => {
    const { isAuthenticated, role } = useAuthStore.getState();
    if (!isAuthenticated) throw redirect({ to: "/login" });
    throw redirect({
      to: role === "admin" ? "/admin/dashboard" : "/student/notices",
    });
  },
  component: () => null,
});

// Admin layout route
const adminLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  beforeLoad: () => requireAuth("admin"),
  component: () => <Layout userRole="admin" />,
});

const adminDashboardRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: "/dashboard",
  component: () => (
    <S>
      <AdminDashboard />
    </S>
  ),
});

const adminCreateRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: "/create",
  component: () => (
    <S>
      <AdminCreateNotice />
    </S>
  ),
});

const adminEventsRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: "/events",
  component: () => (
    <S>
      <AdminDashboard />
    </S>
  ),
});

const adminFacultyRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: "/faculty",
  component: () => (
    <S>
      <AdminDashboard />
    </S>
  ),
});

const adminAnalyticsRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: "/analytics",
  component: () => (
    <S>
      <AnalyticsPage />
    </S>
  ),
});

const adminSettingsRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: "/settings",
  component: () => (
    <S>
      <AdminDashboard />
    </S>
  ),
});

const adminNotificationsRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: "/notifications",
  component: () => (
    <S>
      <AdminDashboard />
    </S>
  ),
});

// Student layout route
const studentLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/student",
  beforeLoad: () => requireAuth("student"),
  component: () => <Layout userRole="student" />,
});

const studentNoticesRoute = createRoute({
  getParentRoute: () => studentLayoutRoute,
  path: "/notices",
  component: () => (
    <S>
      <StudentNotices />
    </S>
  ),
});

const studentSearchRoute = createRoute({
  getParentRoute: () => studentLayoutRoute,
  path: "/search",
  component: () => (
    <S>
      <StudentNotices />
    </S>
  ),
});

const studentAnalyticsRoute = createRoute({
  getParentRoute: () => studentLayoutRoute,
  path: "/analytics",
  component: () => (
    <S>
      <AnalyticsPage />
    </S>
  ),
});

const studentNotificationsRoute = createRoute({
  getParentRoute: () => studentLayoutRoute,
  path: "/notifications",
  component: () => (
    <S>
      <StudentNotices />
    </S>
  ),
});

// Route tree
const routeTree = rootRoute.addChildren([
  indexRoute,
  loginRoute,
  registerRoute,
  adminLayoutRoute.addChildren([
    adminDashboardRoute,
    adminCreateRoute,
    adminEventsRoute,
    adminFacultyRoute,
    adminAnalyticsRoute,
    adminSettingsRoute,
    adminNotificationsRoute,
  ]),
  studentLayoutRoute.addChildren([
    studentNoticesRoute,
    studentSearchRoute,
    studentAnalyticsRoute,
    studentNotificationsRoute,
  ]),
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      storageKey="educampus-theme"
    >
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}
