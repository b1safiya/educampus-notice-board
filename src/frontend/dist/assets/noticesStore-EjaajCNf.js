import { c as apiFilterByCategory, d as apiSearchNotices, e as apiDeleteNotice, f as apiUpdateNotice, g as apiListNotices, h as apiCreateNotice } from "./api-AGmkjX6s.js";
import { q as create } from "./index-93qgKiy3.js";
const CATEGORY_LABELS = {
  academic: "Academic",
  event: "Event",
  sports: "Sports",
  general: "General"
};
const useNoticesStore = create((set) => ({
  notices: [],
  loading: false,
  error: null,
  searchQuery: "",
  selectedCategory: "all",
  fetch: async () => {
    set({ loading: true, error: null });
    try {
      const notices = await apiListNotices();
      set({ notices, loading: false });
    } catch (e) {
      set({ error: String(e), loading: false });
    }
  },
  create: async (req, createdBy) => {
    set({ loading: true, error: null });
    try {
      const result = await apiCreateNotice(req, createdBy);
      if ("ok" in result) {
        const notices = await apiListNotices();
        set({ notices, loading: false });
      } else {
        set({ error: result.err, loading: false });
      }
    } catch (e) {
      set({ error: String(e), loading: false });
    }
  },
  update: async (req) => {
    set({ loading: true, error: null });
    try {
      const result = await apiUpdateNotice(req);
      if ("ok" in result) {
        const notices = await apiListNotices();
        set({ notices, loading: false });
      } else {
        set({ error: result.err, loading: false });
      }
    } catch (e) {
      set({ error: String(e), loading: false });
    }
  },
  remove: async (id) => {
    set({ loading: true, error: null });
    try {
      const result = await apiDeleteNotice(id);
      if ("ok" in result) {
        set((state) => ({
          notices: state.notices.filter((n) => n.id !== id),
          loading: false
        }));
      } else {
        set({ error: result.err, loading: false });
      }
    } catch (e) {
      set({ error: String(e), loading: false });
    }
  },
  search: async (query) => {
    set({ loading: true, error: null, searchQuery: query });
    try {
      const notices = await apiSearchNotices(query);
      set({ notices, loading: false });
    } catch (e) {
      set({ error: String(e), loading: false });
    }
  },
  filterByCategory: async (category) => {
    set({ loading: true, error: null, selectedCategory: category });
    try {
      const notices = await apiFilterByCategory(category);
      set({ notices, loading: false });
    } catch (e) {
      set({ error: String(e), loading: false });
    }
  },
  setSearchQuery: (q) => set({ searchQuery: q }),
  setSelectedCategory: (cat) => set({ selectedCategory: cat })
}));
export {
  CATEGORY_LABELS as C,
  useNoticesStore as u
};
