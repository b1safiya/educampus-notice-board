import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  BookOpen,
  Calendar,
  ExternalLink,
  FileText,
  Info,
  Search,
  Trophy,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useMemo, useState } from "react";
import { CategoryTag } from "../components/CategoryTag";
import { useNoticesStore } from "../store/noticesStore";
import type { Category, Notice } from "../types";
import { CATEGORY_LABELS } from "../types";

const CATEGORIES: Array<Category | "all"> = [
  "all",
  "academic",
  "event",
  "sports",
  "general",
];

const categoryIcons: Record<Category | "all", React.ReactNode> = {
  all: <BookOpen className="h-3.5 w-3.5" />,
  academic: <BookOpen className="h-3.5 w-3.5" />,
  event: <Calendar className="h-3.5 w-3.5" />,
  sports: <Trophy className="h-3.5 w-3.5" />,
  general: <Info className="h-3.5 w-3.5" />,
};

const accentClass: Record<Category, string> = {
  academic: "bg-[oklch(var(--tag-academic))]",
  event: "bg-[oklch(var(--tag-event))]",
  sports: "bg-[oklch(var(--tag-sports))]",
  general: "bg-[oklch(var(--tag-general))]",
};

function NoticeCardSkeleton() {
  return (
    <div className="bg-card rounded-xl overflow-hidden shadow-card border border-border space-y-3 p-5">
      <Skeleton className="h-5 w-3/4" />
      <Skeleton className="h-4 w-1/3" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
      <Skeleton className="h-4 w-2/3" />
    </div>
  );
}

interface NoticeCardProps {
  notice: Notice;
  index: number;
}

function NoticeCard({ notice, index }: NoticeCardProps) {
  const [expanded, setExpanded] = useState(false);

  const formattedDate = useMemo(() => {
    const d = new Date(notice.date);
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }, [notice.date]);

  const isLong = notice.description.length > 120;
  const displayDesc =
    expanded || !isLong
      ? notice.description
      : `${notice.description.slice(0, 120)}…`;

  return (
    <motion.div
      data-ocid={`notice.card.item.${index + 1}`}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.35,
        delay: index * 0.06,
        ease: [0.4, 0, 0.2, 1],
      }}
      className="group bg-card border border-border rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-smooth flex flex-col"
    >
      {/* Category accent strip */}
      <div className={`h-1 w-full ${accentClass[notice.category]}`} />

      <div className="p-5 flex flex-col flex-1 space-y-3">
        {/* Title */}
        <h3 className="font-display font-semibold text-foreground text-base leading-snug group-hover:text-primary transition-colors line-clamp-2">
          {notice.title}
        </h3>

        {/* Category + Date */}
        <div className="flex items-center gap-2 flex-wrap">
          <CategoryTag category={notice.category} />
          <span className="text-xs text-muted-foreground ml-auto">
            {formattedDate}
          </span>
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground leading-relaxed flex-1">
          {displayDesc}
          {isLong && (
            <button
              type="button"
              data-ocid={`notice.expand_button.${index + 1}`}
              onClick={() => setExpanded(!expanded)}
              className="ml-1 text-primary text-xs font-medium hover:underline transition-smooth"
            >
              {expanded ? "Show less" : "Read more"}
            </button>
          )}
        </p>

        {/* Attachment link */}
        {notice.fileUrl && (
          <a
            data-ocid={`notice.file_link.${index + 1}`}
            href={notice.fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:text-primary/80 mt-auto pt-2 border-t border-border transition-smooth group/link"
          >
            <FileText className="h-3.5 w-3.5" />
            View Attachment
            <ExternalLink className="h-3 w-3 opacity-60 group-hover/link:opacity-100 transition-smooth" />
          </a>
        )}
      </div>
    </motion.div>
  );
}

export default function StudentNotices() {
  const { notices, loading, fetch } = useNoticesStore();
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<Category | "all">("all");

  useEffect(() => {
    fetch();
  }, [fetch]);

  const filtered = useMemo(() => {
    let result = [...notices];
    if (activeCategory !== "all") {
      result = result.filter((n) => n.category === activeCategory);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (n) =>
          n.title.toLowerCase().includes(q) ||
          n.description.toLowerCase().includes(q) ||
          n.category.toLowerCase().includes(q),
      );
    }
    return result;
  }, [notices, activeCategory, search]);

  return (
    <div
      className="flex-1 overflow-y-auto p-6 space-y-6 bg-background"
      data-ocid="student.notices.page"
    >
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="space-y-1"
      >
        <h1 className="font-display font-bold text-2xl text-foreground">
          Notice Board
        </h1>
        <p className="text-muted-foreground text-sm">
          Browse and search campus announcements
        </p>
      </motion.div>

      {/* Search + Filter Bar */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.08 }}
        className="space-y-3"
      >
        {/* Search input */}
        <div className="relative max-w-lg">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
          <Input
            data-ocid="notices.search_input"
            placeholder="Search notices by title, category, or description…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 bg-card border-border transition-smooth"
          />
        </div>

        {/* Category filter pills */}
        <div
          className="flex items-center gap-2 flex-wrap"
          data-ocid="notices.category_filter"
        >
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat;
            const label = cat === "all" ? "All Notices" : CATEGORY_LABELS[cat];
            return (
              <button
                type="button"
                key={cat}
                data-ocid={`notices.filter.${cat}`}
                onClick={() => setActiveCategory(cat)}
                className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium transition-smooth border ${
                  isActive
                    ? "bg-primary text-primary-foreground border-primary shadow-sm"
                    : "bg-card text-muted-foreground border-border hover:border-primary/40 hover:text-foreground"
                }`}
              >
                {categoryIcons[cat]}
                {label}
              </button>
            );
          })}
        </div>
      </motion.div>

      {/* Results summary */}
      {!loading && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="text-xs text-muted-foreground"
        >
          {filtered.length} notice{filtered.length !== 1 ? "s" : ""} found
          {activeCategory !== "all" && ` in ${CATEGORY_LABELS[activeCategory]}`}
          {search.trim() && ` for "${search}"`}
        </motion.p>
      )}

      {/* Notice Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {(["s1", "s2", "s3", "s4", "s5", "s6"] as const).map((k) => (
            <NoticeCardSkeleton key={k} />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <motion.div
          data-ocid="notices.empty_state"
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col items-center justify-center py-20 text-center space-y-4"
        >
          <div className="w-20 h-20 rounded-2xl bg-muted flex items-center justify-center">
            <BookOpen className="w-9 h-9 text-muted-foreground/50" />
          </div>
          <div className="space-y-1">
            <h3 className="font-display font-semibold text-foreground">
              No notices found
            </h3>
            <p className="text-sm text-muted-foreground max-w-xs">
              {search.trim() || activeCategory !== "all"
                ? "Try adjusting your search or category filter to see more results."
                : "No notices have been posted yet. Check back soon!"}
            </p>
          </div>
          {(search.trim() || activeCategory !== "all") && (
            <button
              type="button"
              data-ocid="notices.clear_filter_button"
              onClick={() => {
                setSearch("");
                setActiveCategory("all");
              }}
              className="text-xs text-primary font-medium hover:underline transition-smooth"
            >
              Clear all filters
            </button>
          )}
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((notice, i) => (
            <NoticeCard key={notice.id} notice={notice} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}
