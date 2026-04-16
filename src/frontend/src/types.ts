export type Role = "admin" | "student";

export type Category = "academic" | "event" | "sports" | "general";

export interface User {
  username: string;
  role: Role;
}

export interface Notice {
  id: number;
  title: string;
  category: Category;
  description: string;
  fileUrl: string;
  date: string;
  createdBy: string;
  createdAt: number;
}

export interface CreateNoticeRequest {
  title: string;
  category: Category;
  description: string;
  fileUrl: string;
  date: string;
}

export interface UpdateNoticeRequest {
  id: number;
  title: string;
  category: Category;
  description: string;
  fileUrl: string;
  date: string;
}

export type LoginResult =
  | { ok: { username: string; role: Role } }
  | { err: string };

export type RegisterResult = { ok: null } | { err: string };

export type NoticeResult = { ok: Notice } | { err: string };

export type DeleteResult = { ok: null } | { err: string };

export interface AuthSession {
  username: string;
  role: Role;
  isAuthenticated: boolean;
}

export const CATEGORY_LABELS: Record<Category, string> = {
  academic: "Academic",
  event: "Event",
  sports: "Sports",
  general: "General",
};

export const CATEGORY_COLORS: Record<Category, string> = {
  academic: "tag-academic",
  event: "tag-event",
  sports: "tag-sports",
  general: "tag-general",
};
