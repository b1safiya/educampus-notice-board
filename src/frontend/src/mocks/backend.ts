import type { backendInterface, Notice, NoticeResult, LoginResult, RegisterResult, DeleteResult, Category, Role } from "../backend";

const sampleNotices: Notice[] = [
  {
    id: BigInt(1),
    title: "Upcoming Midterm Schedule",
    date: "2024-12-07",
    createdAt: BigInt(1733529600000000000),
    createdBy: "admin",
    description: "Upcoming Midterm or sit amet, consectetur adipiscing elit, end to end testing required for all departments.",
    category: "academic" as unknown as Category,
    fileUrl: "https://example.com/midterm-schedule.pdf",
  },
  {
    id: BigInt(2),
    title: "Annual Tech Fest 2024",
    date: "2024-12-07",
    createdAt: BigInt(1733529600000000001),
    createdBy: "admin",
    description: "Annual Tech Fest 2024 is parted and commitment reachment in the upcoming academic calendar.",
    category: "event" as unknown as Category,
    fileUrl: "https://example.com/techfest.pdf",
  },
  {
    id: BigInt(3),
    title: "Volleyball Tournament Registration",
    date: "2024-12-07",
    createdAt: BigInt(1733529600000000002),
    createdBy: "admin",
    description: "Volleyball Tournament consectetur adipiscing elit, scr... registration now open for all students.",
    category: "sports" as unknown as Category,
    fileUrl: "https://example.com/volleyball.pdf",
  },
  {
    id: BigInt(4),
    title: "Library Holiday Hours",
    date: "2024-12-07",
    createdAt: BigInt(1733529600000000003),
    createdBy: "admin",
    description: "Library ipsum dolor sit amet, consectetur adipiscing elit. Fun hours updated for the holiday season.",
    category: "general" as unknown as Category,
    fileUrl: "",
  },
  {
    id: BigInt(5),
    title: "Annual Holiday Hours",
    date: "2024-12-07",
    createdAt: BigInt(1733529600000000004),
    createdBy: "admin",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
    category: "general" as unknown as Category,
    fileUrl: "",
  },
  {
    id: BigInt(6),
    title: "Library Tech Fest 2024 States",
    date: "2024-12-07",
    createdAt: BigInt(1733529600000000005),
    createdBy: "admin",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
    category: "general" as unknown as Category,
    fileUrl: "https://example.com/library-tech.pdf",
  },
];

export const mockBackend: backendInterface = {
  getAllNotices: async (): Promise<Notice[]> => {
    return sampleNotices;
  },

  getNoticeById: async (id: bigint): Promise<Notice | null> => {
    return sampleNotices.find((n) => n.id === id) ?? null;
  },

  createNotice: async (req, adminUsername): Promise<NoticeResult> => {
    const newNotice: Notice = {
      id: BigInt(sampleNotices.length + 1),
      title: req.title,
      date: req.date,
      createdAt: BigInt(Date.now() * 1_000_000),
      createdBy: adminUsername,
      description: req.description,
      category: req.category,
      fileUrl: req.fileUrl,
    };
    sampleNotices.push(newNotice);
    return { __kind__: "ok", ok: newNotice };
  },

  updateNotice: async (req, adminUsername): Promise<NoticeResult> => {
    const idx = sampleNotices.findIndex((n) => n.id === req.id);
    if (idx === -1) return { __kind__: "err", err: "Notice not found" };
    sampleNotices[idx] = {
      ...sampleNotices[idx],
      title: req.title,
      date: req.date,
      description: req.description,
      category: req.category,
      fileUrl: req.fileUrl,
    };
    return { __kind__: "ok", ok: sampleNotices[idx] };
  },

  deleteNotice: async (id: bigint, adminUsername): Promise<DeleteResult> => {
    const idx = sampleNotices.findIndex((n) => n.id === id);
    if (idx === -1) return { __kind__: "err", err: "Notice not found" };
    sampleNotices.splice(idx, 1);
    return { __kind__: "ok", ok: null };
  },

  login: async (req): Promise<LoginResult> => {
    if (req.username === "admin" && req.password === "admin123") {
      return { __kind__: "ok", ok: { username: "admin", role: "admin" as unknown as Role } };
    }
    if (req.username === "student" && req.password === "student123") {
      return { __kind__: "ok", ok: { username: "student", role: "student" as unknown as Role } };
    }
    return { __kind__: "err", err: "Invalid credentials" };
  },

  register: async (req): Promise<RegisterResult> => {
    return { __kind__: "ok", ok: null };
  },
};
