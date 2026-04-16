import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  BarChart2,
  Bell,
  BookOpen,
  CalendarDays,
  GraduationCap,
  LayoutDashboard,
  LogOut,
  Menu,
  PlusCircle,
  Search,
  Settings,
  Users,
  X,
} from "lucide-react";
import { useState } from "react";
import { useAuthStore } from "../store/authStore";
import { ThemeToggle } from "./ThemeToggle";

interface NavItem {
  label: string;
  to: string;
  icon: React.ComponentType<{ className?: string }>;
}

const ADMIN_NAV: NavItem[] = [
  { label: "Dashboard", to: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Create Notice", to: "/admin/create", icon: PlusCircle },
  { label: "Campus Events", to: "/admin/events", icon: CalendarDays },
  { label: "Faculty Updates", to: "/admin/faculty", icon: Users },
  { label: "Analytics", to: "/admin/analytics", icon: BarChart2 },
  { label: "Settings", to: "/admin/settings", icon: Settings },
  { label: "Notifications", to: "/admin/notifications", icon: Bell },
];

const STUDENT_NAV: NavItem[] = [
  { label: "Notice Board", to: "/student/notices", icon: BookOpen },
  { label: "Search", to: "/student/search", icon: Search },
  { label: "Analytics", to: "/student/analytics", icon: BarChart2 },
  { label: "Notifications", to: "/student/notifications", icon: Bell },
];

interface SidebarProps {
  role: "admin" | "student";
}

function NavItems({ items }: { items: NavItem[] }) {
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  return (
    <nav className="flex-1 px-3 py-2 space-y-0.5">
      {items.map((item) => {
        const isActive =
          currentPath === item.to || currentPath.startsWith(`${item.to}/`);
        return (
          <Link
            key={item.to}
            to={item.to}
            data-ocid={`sidebar.nav.${item.label.toLowerCase().replace(/\s+/g, "_")}`}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-smooth group ${
              isActive
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            }`}
          >
            <item.icon
              className={`h-4 w-4 shrink-0 transition-smooth ${
                isActive ? "opacity-100" : "opacity-70 group-hover:opacity-100"
              }`}
            />
            <span className="truncate">{item.label}</span>
            {isActive && (
              <span className="ml-auto w-1.5 h-1.5 rounded-full bg-primary-foreground opacity-80" />
            )}
          </Link>
        );
      })}
    </nav>
  );
}

export function Sidebar({ role }: SidebarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { username, logout } = useAuthStore();
  const navItems = role === "admin" ? ADMIN_NAV : STUDENT_NAV;

  const sidebarContent = (
    <div className="flex flex-col h-full bg-sidebar border-r border-sidebar-border">
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-4 py-4 border-b border-sidebar-border">
        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shrink-0">
          <GraduationCap className="h-5 w-5 text-primary-foreground" />
        </div>
        <div className="min-w-0">
          <p className="font-display font-bold text-sm text-sidebar-foreground truncate leading-tight">
            EduCampus
          </p>
          <p className="text-xs text-muted-foreground truncate leading-tight">
            Smart Notice Board
          </p>
        </div>
        <button
          type="button"
          className="ml-auto lg:hidden p-1 rounded text-sidebar-foreground hover:bg-sidebar-accent"
          onClick={() => setMobileOpen(false)}
          onKeyDown={(e) => e.key === "Enter" && setMobileOpen(false)}
          aria-label="Close sidebar"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* User info */}
      <div
        className="flex items-center gap-3 px-4 py-3 mx-3 mt-3 rounded-xl bg-sidebar-accent cursor-default"
        data-ocid="sidebar.user_info"
      >
        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
          <span className="text-xs font-bold text-primary uppercase">
            {username.slice(0, 2)}
          </span>
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-sidebar-foreground truncate capitalize">
            {username}
          </p>
          <Badge
            variant="secondary"
            className="text-[10px] px-1.5 py-0 capitalize h-4"
          >
            {role}
          </Badge>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto mt-2">
        <NavItems items={navItems} />
      </div>

      <Separator className="mx-3 bg-sidebar-border" />

      {/* Footer actions */}
      <div className="px-3 py-3 flex items-center justify-between">
        <ThemeToggle />
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center gap-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-smooth"
          onClick={logout}
          data-ocid="sidebar.logout_button"
        >
          <LogOut className="h-4 w-4" />
          <span className="text-xs font-medium">Logout</span>
        </Button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile menu button */}
      <button
        type="button"
        className="fixed top-4 left-4 z-50 lg:hidden p-2 rounded-lg bg-card border border-border shadow-sm text-foreground"
        onClick={() => setMobileOpen(true)}
        onKeyDown={(e) => e.key === "Enter" && setMobileOpen(true)}
        aria-label="Open sidebar"
        data-ocid="sidebar.mobile_open_button"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          role="button"
          tabIndex={0}
          aria-label="Close sidebar overlay"
          className="fixed inset-0 z-40 bg-foreground/50 lg:hidden animate-fade-in"
          onClick={() => setMobileOpen(false)}
          onKeyDown={(e) => e.key === "Escape" && setMobileOpen(false)}
        />
      )}

      {/* Mobile sidebar drawer */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 lg:hidden transition-transform duration-300 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {sidebarContent}
      </aside>

      {/* Desktop sidebar */}
      <aside className="hidden lg:flex w-64 shrink-0 flex-col h-screen sticky top-0">
        {sidebarContent}
      </aside>
    </>
  );
}
