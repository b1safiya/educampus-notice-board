/**
 * API client wrapping backend actor calls.
 * Since the backend interface is not yet fully generated (bindgen pending),
 * we provide a typed facade that delegates to the actor when available,
 * and uses in-memory mock data for development/demo purposes.
 */

import type {
  Category,
  CreateNoticeRequest,
  DeleteResult,
  LoginResult,
  Notice,
  NoticeResult,
  RegisterResult,
  Role,
  UpdateNoticeRequest,
} from "./types";

// ---------------------------------------------------------------------------
// In-memory demo store (replaces real actor calls until bindgen is complete)
// ---------------------------------------------------------------------------

let noticeIdCounter = 100;

const DEMO_NOTICES: Notice[] = [
  {
    id: 1,
    title: "Upcoming Midterm Schedule",
    category: "academic",
    description:
      "The midterm examinations will be held from December 15–20. Please check the timetable on the student portal and prepare accordingly. All departments must submit their seating plans by December 10.",
    fileUrl: "https://example.com/midterm-schedule.pdf",
    date: "2024-12-07",
    createdBy: "admin",
    createdAt: Date.now() - 86400000 * 5,
  },
  {
    id: 2,
    title: "Annual Tech Fest 2024",
    category: "event",
    description:
      "Annual Tech Fest 2024 is set and commitment reaching new heights. Register your teams before December 12 to participate in hackathons, robotics showcases, and coding competitions.",
    fileUrl: "https://example.com/techfest-brochure.pdf",
    date: "2024-12-07",
    createdBy: "admin",
    createdAt: Date.now() - 86400000 * 4,
  },
  {
    id: 3,
    title: "Volleyball Tournament Registration",
    category: "sports",
    description:
      "Inter-college volleyball tournament registrations are now open. Teams of 6 players each. Last date for registration is December 14. Contact the Sports Department for more details.",
    fileUrl: "https://example.com/volleyball-reg.pdf",
    date: "2024-12-07",
    createdBy: "admin",
    createdAt: Date.now() - 86400000 * 3,
  },
  {
    id: 4,
    title: "Library Holiday Hours",
    category: "general",
    description:
      "The campus library will operate on reduced hours during the holiday season. From December 24 to January 2, the library will be open 9 AM to 5 PM on weekdays only.",
    fileUrl: "",
    date: "2024-12-07",
    createdBy: "admin",
    createdAt: Date.now() - 86400000 * 2,
  },
  {
    id: 5,
    title: "Annual Holiday Hours",
    category: "general",
    description:
      "All administrative offices will be closed from December 25 to January 1 for the winter holidays. Emergency contacts are available through the campus security desk.",
    fileUrl: "",
    date: "2024-12-07",
    createdBy: "admin",
    createdAt: Date.now() - 86400000 * 1,
  },
  {
    id: 6,
    title: "Library Tech Fest 2024 States",
    category: "academic",
    description:
      "The library has curated a special collection of research papers, project reports, and technical resources for Tech Fest 2024 participants. Access them via the digital library portal.",
    fileUrl: "https://example.com/library-techfest.pdf",
    date: "2024-12-07",
    createdBy: "admin",
    createdAt: Date.now(),
  },
  {
    id: 7,
    title: "Campus Wi-Fi Maintenance",
    category: "general",
    description:
      "Scheduled maintenance for campus Wi-Fi infrastructure will occur on December 13 from 2 AM to 6 AM. Internet connectivity will be disrupted during this window.",
    fileUrl: "",
    date: "2024-12-13",
    createdBy: "admin",
    createdAt: Date.now() - 86400000 * 6,
  },
  {
    id: 8,
    title: "Football Championship Finals",
    category: "sports",
    description:
      "The inter-department football championship finals will be held on December 18 at the main sports ground. Cheer for your department and show your team spirit!",
    fileUrl: "",
    date: "2024-12-18",
    createdBy: "admin",
    createdAt: Date.now() - 86400000 * 7,
  },
];

const notices: Notice[] = [...DEMO_NOTICES];

const DEMO_USERS: Record<string, { password: string; role: Role }> = {
  admin: { password: "admin123", role: "admin" },
  student: { password: "student123", role: "student" },
};

// ---------------------------------------------------------------------------
// Auth API
// ---------------------------------------------------------------------------

export async function apiRegister(
  username: string,
  password: string,
  role: Role,
): Promise<RegisterResult> {
  if (DEMO_USERS[username]) {
    return { err: "Username already exists" };
  }
  DEMO_USERS[username] = { password, role };
  return { ok: null };
}

export async function apiLogin(
  username: string,
  password: string,
): Promise<LoginResult> {
  const user = DEMO_USERS[username];
  if (!user) return { err: "User not found" };
  if (user.password !== password) return { err: "Invalid password" };
  return { ok: { username, role: user.role } };
}

// ---------------------------------------------------------------------------
// Notices API
// ---------------------------------------------------------------------------

export async function apiListNotices(): Promise<Notice[]> {
  return [...notices].sort((a, b) => b.createdAt - a.createdAt);
}

export async function apiGetNotice(id: number): Promise<NoticeResult> {
  const notice = notices.find((n) => n.id === id);
  if (!notice) return { err: "Notice not found" };
  return { ok: { ...notice } };
}

export async function apiCreateNotice(
  req: CreateNoticeRequest,
  createdBy: string,
): Promise<NoticeResult> {
  const notice: Notice = {
    id: ++noticeIdCounter,
    ...req,
    createdBy,
    createdAt: Date.now(),
  };
  notices.unshift(notice);
  return { ok: { ...notice } };
}

export async function apiUpdateNotice(
  req: UpdateNoticeRequest,
): Promise<NoticeResult> {
  const idx = notices.findIndex((n) => n.id === req.id);
  if (idx === -1) return { err: "Notice not found" };
  notices[idx] = { ...notices[idx], ...req };
  return { ok: { ...notices[idx] } };
}

export async function apiDeleteNotice(id: number): Promise<DeleteResult> {
  const idx = notices.findIndex((n) => n.id === id);
  if (idx === -1) return { err: "Notice not found" };
  notices.splice(idx, 1);
  return { ok: null };
}

export async function apiSearchNotices(query: string): Promise<Notice[]> {
  const q = query.toLowerCase();
  return notices.filter(
    (n) =>
      n.title.toLowerCase().includes(q) ||
      n.category.toLowerCase().includes(q) ||
      n.description.toLowerCase().includes(q),
  );
}

export async function apiFilterByCategory(
  category: Category | "all",
): Promise<Notice[]> {
  if (category === "all") return apiListNotices();
  return notices.filter((n) => n.category === category);
}
