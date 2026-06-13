export const employees = [
  { id: 1, name: "Sarah Johnson", email: "sarah.j@teyzix.com", role: "Senior Engineer", department: "Engineering", status: "Active", salary: 95000, avatar: "SJ", joinDate: "2021-03-15", phone: "+1 555-0101", location: "New York", manager: "James Lee", performance: 92 },
  { id: 2, name: "Marcus Williams", email: "m.williams@teyzix.com", role: "Product Manager", department: "Product", status: "Active", salary: 105000, avatar: "MW", joinDate: "2020-07-22", phone: "+1 555-0102", location: "San Francisco", manager: "Emily Chen", performance: 88 },
  { id: 3, name: "Priya Patel", email: "p.patel@teyzix.com", role: "UX Designer", department: "Design", status: "Active", salary: 82000, avatar: "PP", joinDate: "2022-01-10", phone: "+1 555-0103", location: "Austin", manager: "James Lee", performance: 95 },
  { id: 4, name: "David Kim", email: "d.kim@teyzix.com", role: "Data Analyst", department: "Analytics", status: "On Leave", salary: 78000, avatar: "DK", joinDate: "2021-11-05", phone: "+1 555-0104", location: "Chicago", manager: "Marcus Williams", performance: 79 },
  { id: 5, name: "Emily Chen", email: "e.chen@teyzix.com", role: "VP Engineering", department: "Engineering", status: "Active", salary: 145000, avatar: "EC", joinDate: "2019-06-01", phone: "+1 555-0105", location: "New York", manager: "CEO", performance: 97 },
  { id: 6, name: "James Lee", email: "j.lee@teyzix.com", role: "CTO", department: "Engineering", status: "Active", salary: 180000, avatar: "JL", joinDate: "2018-02-14", phone: "+1 555-0106", location: "New York", manager: "CEO", performance: 98 },
  { id: 7, name: "Aisha Okafor", email: "a.okafor@teyzix.com", role: "HR Manager", department: "HR", status: "Active", salary: 88000, avatar: "AO", joinDate: "2020-09-30", phone: "+1 555-0107", location: "Atlanta", manager: "Emily Chen", performance: 91 },
  { id: 8, name: "Tom Rivera", email: "t.rivera@teyzix.com", role: "Sales Lead", department: "Sales", status: "Active", salary: 92000, avatar: "TR", joinDate: "2021-05-18", phone: "+1 555-0108", location: "Miami", manager: "Emily Chen", performance: 84 },
  { id: 9, name: "Zoe Turner", email: "z.turner@teyzix.com", role: "Marketing Manager", department: "Marketing", status: "Inactive", salary: 84000, avatar: "ZT", joinDate: "2022-03-07", phone: "+1 555-0109", location: "Boston", manager: "Marcus Williams", performance: 76 },
  { id: 10, name: "Liam Nguyen", email: "l.nguyen@teyzix.com", role: "Backend Engineer", department: "Engineering", status: "Active", salary: 91000, avatar: "LN", joinDate: "2022-08-22", phone: "+1 555-0110", location: "Seattle", manager: "Emily Chen", performance: 87 },
  { id: 11, name: "Grace Kim", email: "g.kim@teyzix.com", role: "Frontend Engineer", department: "Engineering", status: "Active", salary: 89000, avatar: "GK", joinDate: "2023-01-16", phone: "+1 555-0111", location: "San Francisco", manager: "Emily Chen", performance: 90 },
  { id: 12, name: "Omar Hassan", email: "o.hassan@teyzix.com", role: "DevOps Engineer", department: "Engineering", status: "Active", salary: 98000, avatar: "OH", joinDate: "2021-07-03", phone: "+1 555-0112", location: "New York", manager: "James Lee", performance: 93 },
];

export const departments = ["Engineering", "Product", "Design", "Analytics", "HR", "Sales", "Marketing"];

export const jobListings = [
  { id: 1, title: "Senior React Developer", department: "Engineering", location: "Remote", type: "Full-time", applicants: 48, posted: "2026-05-20", status: "Active", salary: "$90k–$120k" },
  { id: 2, title: "Product Designer", department: "Design", location: "New York", type: "Full-time", applicants: 31, posted: "2026-05-25", status: "Active", salary: "$80k–$100k" },
  { id: 3, title: "Data Engineer", department: "Analytics", location: "Remote", type: "Full-time", applicants: 22, posted: "2026-06-01", status: "Active", salary: "$95k–$130k" },
  { id: 4, title: "HR Coordinator", department: "HR", location: "Chicago", type: "Part-time", applicants: 14, posted: "2026-06-05", status: "Active", salary: "$45k–$55k" },
  { id: 5, title: "Sales Executive", department: "Sales", location: "Miami", type: "Full-time", applicants: 37, posted: "2026-05-15", status: "Closed", salary: "$70k–$90k + commission" },
];

export const candidates = [
  { id: 1, name: "Alex Morgan", role: "Senior React Developer", stage: "Interview", email: "alex@email.com", avatar: "AM", score: 88, appliedDate: "2026-05-22" },
  { id: 2, name: "Nina Ross", role: "Product Designer", stage: "Assessment", email: "nina@email.com", avatar: "NR", score: 91, appliedDate: "2026-05-27" },
  { id: 3, name: "Ben Carter", role: "Data Engineer", stage: "Screening", email: "ben@email.com", avatar: "BC", score: 74, appliedDate: "2026-06-02" },
  { id: 4, name: "Isla Green", role: "Senior React Developer", stage: "Selected", email: "isla@email.com", avatar: "IG", score: 95, appliedDate: "2026-05-21" },
  { id: 5, name: "Ryan Park", role: "HR Coordinator", stage: "Applied", email: "ryan@email.com", avatar: "RP", score: 68, appliedDate: "2026-06-06" },
  { id: 6, name: "Mia Stone", role: "Senior React Developer", stage: "Screening", email: "mia@email.com", avatar: "MS", score: 82, appliedDate: "2026-05-23" },
];

export const attendanceData = [
  { date: "2026-06-01", present: 98, absent: 4, late: 3, leave: 7 },
  { date: "2026-06-02", present: 102, absent: 2, late: 5, leave: 3 },
  { date: "2026-06-03", present: 95, absent: 7, late: 2, leave: 8 },
  { date: "2026-06-04", present: 100, absent: 3, late: 4, leave: 5 },
  { date: "2026-06-05", present: 105, absent: 1, late: 1, leave: 5 },
  { date: "2026-06-08", present: 97, absent: 5, late: 6, leave: 4 },
  { date: "2026-06-09", present: 103, absent: 2, late: 3, leave: 7 },
  { date: "2026-06-10", present: 99, absent: 4, late: 2, leave: 7 },
  { date: "2026-06-11", present: 101, absent: 3, late: 4, leave: 4 },
  { date: "2026-06-12", present: 104, absent: 2, late: 2, leave: 6 },
];

export const leaveRequests = [
  { id: 1, employee: "David Kim", avatar: "DK", type: "Annual Leave", from: "2026-06-10", to: "2026-06-17", days: 6, status: "Approved", reason: "Family vacation" },
  { id: 2, employee: "Zoe Turner", avatar: "ZT", type: "Sick Leave", from: "2026-06-12", to: "2026-06-13", days: 2, status: "Pending", reason: "Medical appointment" },
  { id: 3, employee: "Tom Rivera", avatar: "TR", type: "Personal Leave", from: "2026-06-20", to: "2026-06-20", days: 1, status: "Pending", reason: "Personal matters" },
  { id: 4, employee: "Grace Kim", avatar: "GK", type: "Annual Leave", from: "2026-07-01", to: "2026-07-05", days: 5, status: "Approved", reason: "Summer vacation" },
  { id: 5, employee: "Liam Nguyen", avatar: "LN", type: "Sick Leave", from: "2026-06-08", to: "2026-06-09", days: 2, status: "Rejected", reason: "Illness" },
];

export const payrollData = [
  { month: "Jan", total: 920000, engineering: 420000, product: 180000, design: 140000, other: 180000 },
  { month: "Feb", total: 935000, engineering: 430000, product: 185000, design: 142000, other: 178000 },
  { month: "Mar", total: 948000, engineering: 435000, product: 188000, design: 145000, other: 180000 },
  { month: "Apr", total: 962000, engineering: 445000, product: 190000, design: 147000, other: 180000 },
  { month: "May", total: 975000, engineering: 455000, product: 192000, design: 148000, other: 180000 },
  { month: "Jun", total: 988000, engineering: 462000, product: 195000, design: 150000, other: 181000 },
];

export const performanceData = [
  { department: "Engineering", avg: 91, reviews: 8, topPerformer: "Emily Chen" },
  { department: "Product", avg: 88, reviews: 3, topPerformer: "Marcus Williams" },
  { department: "Design", avg: 95, reviews: 2, topPerformer: "Priya Patel" },
  { department: "Analytics", avg: 79, reviews: 2, topPerformer: "David Kim" },
  { department: "HR", avg: 91, reviews: 1, topPerformer: "Aisha Okafor" },
  { department: "Sales", avg: 84, reviews: 2, topPerformer: "Tom Rivera" },
  { department: "Marketing", avg: 76, reviews: 1, topPerformer: "Zoe Turner" },
];

export const hiringTrends = [
  { month: "Jan", hired: 4, applied: 89 },
  { month: "Feb", hired: 7, applied: 112 },
  { month: "Mar", hired: 3, applied: 78 },
  { month: "Apr", hired: 9, applied: 145 },
  { month: "May", hired: 6, applied: 130 },
  { month: "Jun", hired: 5, applied: 152 },
];

export const notifications = [
  { id: 1, type: "leave", message: "Zoe Turner requested sick leave", time: "2 min ago", read: false },
  { id: 2, type: "hire", message: "Isla Green accepted the offer", time: "1 hr ago", read: false },
  { id: 3, type: "review", message: "Q2 performance reviews due in 3 days", time: "3 hr ago", read: true },
  { id: 4, type: "payroll", message: "June payroll processed successfully", time: "1 day ago", read: true },
  { id: 5, type: "attendance", message: "5 employees marked absent today", time: "1 day ago", read: true },
];
