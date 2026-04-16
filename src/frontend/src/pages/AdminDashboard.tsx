import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  BookOpen,
  Calendar,
  LayoutDashboard,
  Loader2,
  Megaphone,
  Plus,
  Search,
  Trophy,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { NoticeCard } from "../components/NoticeCard";
import { NoticeModal } from "../components/NoticeModal";
import type { NoticeFormData } from "../components/NoticeModal";
import { useAuthStore } from "../store/authStore";
import { useNoticesStore } from "../store/noticesStore";
import type { Category, Notice } from "../types";
import { CATEGORY_LABELS } from "../types";

// ── Stat card ────────────────────────────────────────────────────────────────

interface StatCardProps {
  label: string;
  value: number;
  icon: React.ReactNode;
  gradient: string;
  index: number;
}

function StatCard({ label, value, icon, gradient, index }: StatCardProps) {
  return (
    <Card
      className="relative overflow-hidden border border-border shadow-card animate-slide-up"
      style={{ animationDelay: `${index * 0.08}s`, animationFillMode: "both" }}
      data-ocid={`stat.card.${index + 1}`}
    >
      <div className={`absolute inset-0 opacity-10 ${gradient}`} />
      <CardContent className="p-5 flex items-center justify-between relative">
        <div>
          <p className="text-sm font-medium text-muted-foreground mb-1">
            {label}
          </p>
          <p className="text-3xl font-display font-bold text-foreground">
            {value}
          </p>
        </div>
        <div
          className={`w-12 h-12 rounded-xl flex items-center justify-center ${gradient} shadow-md`}
        >
          {icon}
        </div>
      </CardContent>
    </Card>
  );
}

// ── Category filter pills ────────────────────────────────────────────────────

const ALL_CATEGORIES: (Category | "all")[] = [
  "all",
  "academic",
  "event",
  "sports",
  "general",
];

// ── Main page ────────────────────────────────────────────────────────────────

export default function AdminDashboard() {
  const { username } = useAuthStore();
  const { notices, loading, fetch, create, update, remove } = useNoticesStore();

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [editingNotice, setEditingNotice] = useState<Notice | null>(null);
  const [modalLoading, setModalLoading] = useState(false);

  // Delete dialog state
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deletingNotice, setDeletingNotice] = useState<Notice | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  // Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<Category | "all">("all");

  useEffect(() => {
    fetch();
  }, [fetch]);

  // Client-side filtering
  const filtered = useMemo(() => {
    let list = notices;
    if (activeCategory !== "all") {
      list = list.filter((n) => n.category === activeCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (n) =>
          n.title.toLowerCase().includes(q) ||
          n.category.toLowerCase().includes(q) ||
          n.description.toLowerCase().includes(q),
      );
    }
    return list;
  }, [notices, activeCategory, searchQuery]);

  // Stats
  const stats = useMemo(() => {
    return {
      total: notices.length,
      academic: notices.filter((n) => n.category === "academic").length,
      event: notices.filter((n) => n.category === "event").length,
      sports: notices.filter((n) => n.category === "sports").length,
      general: notices.filter((n) => n.category === "general").length,
    };
  }, [notices]);

  // Modal handlers
  function openCreate() {
    setEditingNotice(null);
    setModalOpen(true);
  }

  function openEdit(notice: Notice) {
    setEditingNotice(notice);
    setModalOpen(true);
  }

  async function handleModalSubmit(data: NoticeFormData) {
    setModalLoading(true);
    try {
      if (editingNotice) {
        await update({ id: editingNotice.id, ...data });
      } else {
        await create(data, username ?? "admin");
      }
      setModalOpen(false);
    } finally {
      setModalLoading(false);
    }
  }

  // Delete handlers
  function openDeleteConfirm(notice: Notice) {
    setDeletingNotice(notice);
    setDeleteDialogOpen(true);
  }

  async function handleDeleteConfirm() {
    if (!deletingNotice) return;
    setDeleteLoading(true);
    try {
      await remove(deletingNotice.id);
    } finally {
      setDeleteLoading(false);
      setDeleteDialogOpen(false);
      setDeletingNotice(null);
    }
  }

  const statCards = [
    {
      label: "Total Notices",
      value: stats.total,
      icon: <LayoutDashboard className="w-5 h-5 text-primary-foreground" />,
      gradient: "gradient-primary",
    },
    {
      label: "Academic",
      value: stats.academic,
      icon: <BookOpen className="w-5 h-5 text-primary-foreground" />,
      gradient: "bg-[oklch(0.62_0.21_257)]",
    },
    {
      label: "Events",
      value: stats.event,
      icon: <Calendar className="w-5 h-5 text-primary-foreground" />,
      gradient: "bg-[oklch(0.68_0.19_151)]",
    },
    {
      label: "Sports",
      value: stats.sports,
      icon: <Trophy className="w-5 h-5 text-primary-foreground" />,
      gradient: "bg-[oklch(0.65_0.18_94)]",
    },
    {
      label: "General",
      value: stats.general,
      icon: <Megaphone className="w-5 h-5 text-primary-foreground" />,
      gradient: "bg-[oklch(0.58_0.17_35)]",
    },
  ];

  return (
    <div
      className="flex-1 overflow-y-auto p-6 space-y-6 bg-background"
      data-ocid="admin.dashboard.page"
    >
      {/* ── Page header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-fade-in">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">
            Smart Notice Board
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Manage and publish campus announcements
          </p>
        </div>
        <Button
          onClick={openCreate}
          className="gradient-primary text-primary-foreground font-semibold shadow-md hover:shadow-lg transition-all gap-2"
          data-ocid="notice.add_button"
        >
          <Plus className="w-4 h-4" />
          Add Notice
        </Button>
      </div>

      {/* ── Stat cards ── */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {statCards.map((s, i) => (
          <StatCard key={s.label} {...s} index={i} />
        ))}
      </div>

      {/* ── Filters row ── */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center animate-fade-in">
        {/* Search */}
        <div className="relative flex-1 min-w-0 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search notices…"
            className="pl-9 bg-card border-border"
            data-ocid="notices.search_input"
          />
        </div>

        {/* Category pills */}
        <div className="flex flex-wrap gap-2">
          {ALL_CATEGORIES.map((cat) => (
            <button
              type="button"
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 border
                ${
                  activeCategory === cat
                    ? "gradient-primary text-primary-foreground border-transparent shadow-md"
                    : "bg-card text-muted-foreground border-border hover:border-primary/40 hover:text-foreground"
                }`}
              data-ocid={`notices.filter.${cat}`}
            >
              {cat === "all" ? "All Notices" : CATEGORY_LABELS[cat]}
            </button>
          ))}
        </div>
      </div>

      {/* ── Notice grid ── */}
      {loading && notices.length === 0 ? (
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          data-ocid="notices.loading_state"
        >
          {(["sk1", "sk2", "sk3", "sk4", "sk5", "sk6"] as const).map((k) => (
            <Card key={k} className="border border-border">
              <CardContent className="p-5 space-y-3">
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-2/3" />
                <div className="flex justify-between pt-1">
                  <Skeleton className="h-5 w-20" />
                  <Skeleton className="h-3 w-16" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div
          className="flex flex-col items-center justify-center py-20 text-center animate-fade-in"
          data-ocid="notices.empty_state"
        >
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
            <LayoutDashboard className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="font-display font-semibold text-foreground mb-1">
            No notices found
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            {searchQuery
              ? `No results for "${searchQuery}"`
              : "No notices in this category yet"}
          </p>
          <Button
            onClick={openCreate}
            variant="outline"
            className="gap-2"
            data-ocid="notices.empty_add_button"
          >
            <Plus className="w-4 h-4" />
            Add First Notice
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((notice, i) => (
            <NoticeCard
              key={notice.id}
              notice={notice}
              index={i}
              isAdmin
              onEdit={openEdit}
              onDelete={openDeleteConfirm}
            />
          ))}
        </div>
      )}

      {/* Result count */}
      {!loading && filtered.length > 0 && (
        <p className="text-xs text-muted-foreground text-center pb-2">
          Showing {filtered.length} of {notices.length} notice
          {notices.length !== 1 ? "s" : ""}
        </p>
      )}

      {/* ── Create/Edit Modal ── */}
      <NoticeModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleModalSubmit}
        notice={editingNotice}
        loading={modalLoading}
      />

      {/* ── Delete confirmation ── */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent
          className="bg-card border-border shadow-xl max-w-md"
          data-ocid="notice.delete.dialog"
        >
          <AlertDialogHeader>
            <AlertDialogTitle className="font-display text-lg font-bold text-foreground">
              Delete Notice
            </AlertDialogTitle>
            <AlertDialogDescription className="text-muted-foreground">
              Are you sure you want to delete{" "}
              <span className="font-medium text-foreground">
                "{deletingNotice?.title}"
              </span>
              ? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-2">
            <AlertDialogCancel
              disabled={deleteLoading}
              data-ocid="notice.delete.cancel_button"
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              disabled={deleteLoading}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              data-ocid="notice.delete.confirm_button"
            >
              {deleteLoading ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Deleting…
                </span>
              ) : (
                "Delete Notice"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
