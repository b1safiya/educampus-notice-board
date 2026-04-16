import { Outlet } from "@tanstack/react-router";
import { useAuthStore } from "../store/authStore";
import { Sidebar } from "./Sidebar";

interface LayoutProps {
  userRole: "admin" | "student";
}

export function Layout({ userRole }: LayoutProps) {
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar role={userRole} />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <main className="flex-1 overflow-y-auto bg-background">
          <div className="min-h-full">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
