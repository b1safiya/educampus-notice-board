import { create } from "zustand";
import {
  apiCreateNotice,
  apiDeleteNotice,
  apiFilterByCategory,
  apiListNotices,
  apiSearchNotices,
  apiUpdateNotice,
} from "../api";
import type {
  Category,
  CreateNoticeRequest,
  Notice,
  UpdateNoticeRequest,
} from "../types";

interface NoticesState {
  notices: Notice[];
  loading: boolean;
  error: string | null;
  searchQuery: string;
  selectedCategory: Category | "all";
  fetch: () => Promise<void>;
  create: (req: CreateNoticeRequest, createdBy: string) => Promise<void>;
  update: (req: UpdateNoticeRequest) => Promise<void>;
  remove: (id: number) => Promise<void>;
  search: (query: string) => Promise<void>;
  filterByCategory: (category: Category | "all") => Promise<void>;
  setSearchQuery: (q: string) => void;
  setSelectedCategory: (cat: Category | "all") => void;
}

export const useNoticesStore = create<NoticesState>((set) => ({
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

  create: async (req: CreateNoticeRequest, createdBy: string) => {
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

  update: async (req: UpdateNoticeRequest) => {
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

  remove: async (id: number) => {
    set({ loading: true, error: null });
    try {
      const result = await apiDeleteNotice(id);
      if ("ok" in result) {
        set((state) => ({
          notices: state.notices.filter((n) => n.id !== id),
          loading: false,
        }));
      } else {
        set({ error: result.err, loading: false });
      }
    } catch (e) {
      set({ error: String(e), loading: false });
    }
  },

  search: async (query: string) => {
    set({ loading: true, error: null, searchQuery: query });
    try {
      const notices = await apiSearchNotices(query);
      set({ notices, loading: false });
    } catch (e) {
      set({ error: String(e), loading: false });
    }
  },

  filterByCategory: async (category: Category | "all") => {
    set({ loading: true, error: null, selectedCategory: category });
    try {
      const notices = await apiFilterByCategory(category);
      set({ notices, loading: false });
    } catch (e) {
      set({ error: String(e), loading: false });
    }
  },

  setSearchQuery: (q: string) => set({ searchQuery: q }),
  setSelectedCategory: (cat: Category | "all") =>
    set({ selectedCategory: cat }),
}));
