let noticeIdCounter = 100;
const DEMO_NOTICES = [
  {
    id: 1,
    title: "Upcoming Midterm Schedule",
    category: "academic",
    description: "The midterm examinations will be held from December 15–20. Please check the timetable on the student portal and prepare accordingly. All departments must submit their seating plans by December 10.",
    fileUrl: "https://example.com/midterm-schedule.pdf",
    date: "2024-12-07",
    createdBy: "admin",
    createdAt: Date.now() - 864e5 * 5
  },
  {
    id: 2,
    title: "Annual Tech Fest 2024",
    category: "event",
    description: "Annual Tech Fest 2024 is set and commitment reaching new heights. Register your teams before December 12 to participate in hackathons, robotics showcases, and coding competitions.",
    fileUrl: "https://example.com/techfest-brochure.pdf",
    date: "2024-12-07",
    createdBy: "admin",
    createdAt: Date.now() - 864e5 * 4
  },
  {
    id: 3,
    title: "Volleyball Tournament Registration",
    category: "sports",
    description: "Inter-college volleyball tournament registrations are now open. Teams of 6 players each. Last date for registration is December 14. Contact the Sports Department for more details.",
    fileUrl: "https://example.com/volleyball-reg.pdf",
    date: "2024-12-07",
    createdBy: "admin",
    createdAt: Date.now() - 864e5 * 3
  },
  {
    id: 4,
    title: "Library Holiday Hours",
    category: "general",
    description: "The campus library will operate on reduced hours during the holiday season. From December 24 to January 2, the library will be open 9 AM to 5 PM on weekdays only.",
    fileUrl: "",
    date: "2024-12-07",
    createdBy: "admin",
    createdAt: Date.now() - 864e5 * 2
  },
  {
    id: 5,
    title: "Annual Holiday Hours",
    category: "general",
    description: "All administrative offices will be closed from December 25 to January 1 for the winter holidays. Emergency contacts are available through the campus security desk.",
    fileUrl: "",
    date: "2024-12-07",
    createdBy: "admin",
    createdAt: Date.now() - 864e5 * 1
  },
  {
    id: 6,
    title: "Library Tech Fest 2024 States",
    category: "academic",
    description: "The library has curated a special collection of research papers, project reports, and technical resources for Tech Fest 2024 participants. Access them via the digital library portal.",
    fileUrl: "https://example.com/library-techfest.pdf",
    date: "2024-12-07",
    createdBy: "admin",
    createdAt: Date.now()
  },
  {
    id: 7,
    title: "Campus Wi-Fi Maintenance",
    category: "general",
    description: "Scheduled maintenance for campus Wi-Fi infrastructure will occur on December 13 from 2 AM to 6 AM. Internet connectivity will be disrupted during this window.",
    fileUrl: "",
    date: "2024-12-13",
    createdBy: "admin",
    createdAt: Date.now() - 864e5 * 6
  },
  {
    id: 8,
    title: "Football Championship Finals",
    category: "sports",
    description: "The inter-department football championship finals will be held on December 18 at the main sports ground. Cheer for your department and show your team spirit!",
    fileUrl: "",
    date: "2024-12-18",
    createdBy: "admin",
    createdAt: Date.now() - 864e5 * 7
  }
];
const notices = [...DEMO_NOTICES];
const DEMO_USERS = {
  admin: { password: "admin123", role: "admin" },
  student: { password: "student123", role: "student" }
};
async function apiRegister(username, password, role) {
  if (DEMO_USERS[username]) {
    return { err: "Username already exists" };
  }
  DEMO_USERS[username] = { password, role };
  return { ok: null };
}
async function apiLogin(username, password) {
  const user = DEMO_USERS[username];
  if (!user) return { err: "User not found" };
  if (user.password !== password) return { err: "Invalid password" };
  return { ok: { username, role: user.role } };
}
async function apiListNotices() {
  return [...notices].sort((a, b) => b.createdAt - a.createdAt);
}
async function apiCreateNotice(req, createdBy) {
  const notice = {
    id: ++noticeIdCounter,
    ...req,
    createdBy,
    createdAt: Date.now()
  };
  notices.unshift(notice);
  return { ok: { ...notice } };
}
async function apiUpdateNotice(req) {
  const idx = notices.findIndex((n) => n.id === req.id);
  if (idx === -1) return { err: "Notice not found" };
  notices[idx] = { ...notices[idx], ...req };
  return { ok: { ...notices[idx] } };
}
async function apiDeleteNotice(id) {
  const idx = notices.findIndex((n) => n.id === id);
  if (idx === -1) return { err: "Notice not found" };
  notices.splice(idx, 1);
  return { ok: null };
}
async function apiSearchNotices(query) {
  const q = query.toLowerCase();
  return notices.filter(
    (n) => n.title.toLowerCase().includes(q) || n.category.toLowerCase().includes(q) || n.description.toLowerCase().includes(q)
  );
}
async function apiFilterByCategory(category) {
  if (category === "all") return apiListNotices();
  return notices.filter((n) => n.category === category);
}
export {
  apiLogin as a,
  apiRegister as b,
  apiFilterByCategory as c,
  apiSearchNotices as d,
  apiDeleteNotice as e,
  apiUpdateNotice as f,
  apiListNotices as g,
  apiCreateNotice as h
};
