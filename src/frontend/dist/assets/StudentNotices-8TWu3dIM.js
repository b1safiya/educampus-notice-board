import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, S as Search, f as BookOpen, g as Skeleton } from "./index-93qgKiy3.js";
import { I as Input } from "./input-CA1AUMJM.js";
import { T as Trophy, a as Calendar, C as CategoryTag, E as ExternalLink } from "./CategoryTag-C8M6o-JF.js";
import { u as useNoticesStore, C as CATEGORY_LABELS } from "./noticesStore-EjaajCNf.js";
import { m as motion } from "./proxy-DoP0sNNX.js";
import "./api-AGmkjX6s.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z", key: "1rqfz7" }],
  ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4", key: "tnqrlb" }],
  ["path", { d: "M10 9H8", key: "b1mrlr" }],
  ["path", { d: "M16 13H8", key: "t4e002" }],
  ["path", { d: "M16 17H8", key: "z1uh3a" }]
];
const FileText = createLucideIcon("file-text", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M12 16v-4", key: "1dtifu" }],
  ["path", { d: "M12 8h.01", key: "e9boi3" }]
];
const Info = createLucideIcon("info", __iconNode);
const CATEGORIES = [
  "all",
  "academic",
  "event",
  "sports",
  "general"
];
const categoryIcons = {
  all: /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-3.5 w-3.5" }),
  academic: /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-3.5 w-3.5" }),
  event: /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-3.5 w-3.5" }),
  sports: /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "h-3.5 w-3.5" }),
  general: /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { className: "h-3.5 w-3.5" })
};
const accentClass = {
  academic: "bg-[oklch(var(--tag-academic))]",
  event: "bg-[oklch(var(--tag-event))]",
  sports: "bg-[oklch(var(--tag-sports))]",
  general: "bg-[oklch(var(--tag-general))]"
};
function NoticeCardSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-xl overflow-hidden shadow-card border border-border space-y-3 p-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-3/4" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-1/3" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-full" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-5/6" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-2/3" })
  ] });
}
function NoticeCard({ notice, index }) {
  const [expanded, setExpanded] = reactExports.useState(false);
  const formattedDate = reactExports.useMemo(() => {
    const d = new Date(notice.date);
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    });
  }, [notice.date]);
  const isLong = notice.description.length > 120;
  const displayDesc = expanded || !isLong ? notice.description : `${notice.description.slice(0, 120)}…`;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      "data-ocid": `notice.card.item.${index + 1}`,
      initial: { opacity: 0, y: 24 },
      animate: { opacity: 1, y: 0 },
      transition: {
        duration: 0.35,
        delay: index * 0.06,
        ease: [0.4, 0, 0.2, 1]
      },
      className: "group bg-card border border-border rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-smooth flex flex-col",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `h-1 w-full ${accentClass[notice.category]}` }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 flex flex-col flex-1 space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground text-base leading-snug group-hover:text-primary transition-colors line-clamp-2", children: notice.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CategoryTag, { category: notice.category }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground ml-auto", children: formattedDate })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground leading-relaxed flex-1", children: [
            displayDesc,
            isLong && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                "data-ocid": `notice.expand_button.${index + 1}`,
                onClick: () => setExpanded(!expanded),
                className: "ml-1 text-primary text-xs font-medium hover:underline transition-smooth",
                children: expanded ? "Show less" : "Read more"
              }
            )
          ] }),
          notice.fileUrl && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "a",
            {
              "data-ocid": `notice.file_link.${index + 1}`,
              href: notice.fileUrl,
              target: "_blank",
              rel: "noopener noreferrer",
              className: "inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:text-primary/80 mt-auto pt-2 border-t border-border transition-smooth group/link",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-3.5 w-3.5" }),
                "View Attachment",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "h-3 w-3 opacity-60 group-hover/link:opacity-100 transition-smooth" })
              ]
            }
          )
        ] })
      ]
    }
  );
}
function StudentNotices() {
  const { notices, loading, fetch } = useNoticesStore();
  const [search, setSearch] = reactExports.useState("");
  const [activeCategory, setActiveCategory] = reactExports.useState("all");
  reactExports.useEffect(() => {
    fetch();
  }, [fetch]);
  const filtered = reactExports.useMemo(() => {
    let result = [...notices];
    if (activeCategory !== "all") {
      result = result.filter((n) => n.category === activeCategory);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (n) => n.title.toLowerCase().includes(q) || n.description.toLowerCase().includes(q) || n.category.toLowerCase().includes(q)
      );
    }
    return result;
  }, [notices, activeCategory, search]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex-1 overflow-y-auto p-6 space-y-6 bg-background",
      "data-ocid": "student.notices.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: -12 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.4 },
            className: "space-y-1",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-2xl text-foreground", children: "Notice Board" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "Browse and search campus announcements" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 8 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.4, delay: 0.08 },
            className: "space-y-3",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative max-w-lg", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    "data-ocid": "notices.search_input",
                    placeholder: "Search notices by title, category, or description…",
                    value: search,
                    onChange: (e) => setSearch(e.target.value),
                    className: "pl-10 bg-card border-border transition-smooth"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "flex items-center gap-2 flex-wrap",
                  "data-ocid": "notices.category_filter",
                  children: CATEGORIES.map((cat) => {
                    const isActive = activeCategory === cat;
                    const label = cat === "all" ? "All Notices" : CATEGORY_LABELS[cat];
                    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "button",
                      {
                        type: "button",
                        "data-ocid": `notices.filter.${cat}`,
                        onClick: () => setActiveCategory(cat),
                        className: `inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium transition-smooth border ${isActive ? "bg-primary text-primary-foreground border-primary shadow-sm" : "bg-card text-muted-foreground border-border hover:border-primary/40 hover:text-foreground"}`,
                        children: [
                          categoryIcons[cat],
                          label
                        ]
                      },
                      cat
                    );
                  })
                }
              )
            ]
          }
        ),
        !loading && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.p,
          {
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            transition: { delay: 0.15 },
            className: "text-xs text-muted-foreground",
            children: [
              filtered.length,
              " notice",
              filtered.length !== 1 ? "s" : "",
              " found",
              activeCategory !== "all" && ` in ${CATEGORY_LABELS[activeCategory]}`,
              search.trim() && ` for "${search}"`
            ]
          }
        ),
        loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5", children: ["s1", "s2", "s3", "s4", "s5", "s6"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(NoticeCardSkeleton, {}, k)) }) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            "data-ocid": "notices.empty_state",
            initial: { opacity: 0, scale: 0.97 },
            animate: { opacity: 1, scale: 1 },
            transition: { duration: 0.3 },
            className: "flex flex-col items-center justify-center py-20 text-center space-y-4",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 rounded-2xl bg-muted flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-9 h-9 text-muted-foreground/50" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground", children: "No notices found" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground max-w-xs", children: search.trim() || activeCategory !== "all" ? "Try adjusting your search or category filter to see more results." : "No notices have been posted yet. Check back soon!" })
              ] }),
              (search.trim() || activeCategory !== "all") && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  "data-ocid": "notices.clear_filter_button",
                  onClick: () => {
                    setSearch("");
                    setActiveCategory("all");
                  },
                  className: "text-xs text-primary font-medium hover:underline transition-smooth",
                  children: "Clear all filters"
                }
              )
            ]
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5", children: filtered.map((notice, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(NoticeCard, { notice, index: i }, notice.id)) })
      ]
    }
  );
}
export {
  StudentNotices as default
};
