import React, { useState } from "react";
import Admissions from "./Admissions";
import CourseUpload from "./CourseUpload";
import RecordedCourseUpload from "./RecordedCourseUpload";

// ── Icons ──────────────────────────────────────────────────────
const Icon = {
  Dashboard: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
      <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
    </svg>
  ),
  Upload: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
      <polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
    </svg>
  ),
  Products: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
      <line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/>
    </svg>
  ),
  Users: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/>
    </svg>
  ),

  Menu: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/>
    </svg>
  ),
  Bell: () => (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/>
    </svg>
  ),
  TrendUp: () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>
    </svg>
  ),
  TrendDown: () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 18 13.5 8.5 8.5 13.5 1 6"/><polyline points="17 18 23 18 23 12"/>
    </svg>
  ),
  Chevron: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6"/>
    </svg>
  ),
  Close: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  ),
  Settings: () => (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3"/>
      <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/>
    </svg>
  ),
};

// ── Stat Card ──────────────────────────────────────────────────
function StatCard({ icon, label, value, change, bg }) {
  const positive = change >= 0;
  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-default">
      <div className="flex items-start justify-between mb-4">
        <span className={`w-11 h-11 flex items-center justify-center rounded-xl text-lg ${bg}`}>{icon}</span>
        <span className={`inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full
          ${positive ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-500"}`}>
          {positive ? <Icon.TrendUp /> : <Icon.TrendDown />}
          {Math.abs(change)}%
        </span>
      </div>
      <p className="text-2xl font-bold text-slate-800 tracking-tight mb-0.5">{value}</p>
      <p className="text-[11px] text-slate-400 font-semibold uppercase tracking-widest">{label}</p>
    </div>
  );
}

// ── Badge ──────────────────────────────────────────────────────
function Badge({ status }) {
  const map = {
    Delivered:  "bg-emerald-50 text-emerald-700 border border-emerald-200",
    Pending:    "bg-amber-50 text-amber-700 border border-amber-200",
    Cancelled:  "bg-red-50 text-red-500 border border-red-200",
    Processing: "bg-sky-50 text-sky-700 border border-sky-200",
  };
  return (
    <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${map[status] || map.Pending}`}>
      {status}
    </span>
  );
}

// ── Dashboard ──────────────────────────────────────────────────
const orders = [
  { id: "#ORD-1042", customer: "Priya Sharma",  product: "Wireless Earbuds",   amount: "₹2,499", date: "23 Mar 2026", status: "Delivered"  },
  { id: "#ORD-1041", customer: "Arjun Mehta",   product: "Mechanical Keyboard", amount: "₹4,199", date: "22 Mar 2026", status: "Processing" },
  { id: "#ORD-1040", customer: "Sneha Reddy",   product: "Laptop Stand",        amount: "₹1,199", date: "22 Mar 2026", status: "Pending"    },
  { id: "#ORD-1039", customer: "Vikram Nair",   product: "USB-C Hub",           amount: "₹999",   date: "21 Mar 2026", status: "Delivered"  },
  { id: "#ORD-1038", customer: "Ananya Iyer",   product: "Monitor Arm",         amount: "₹3,299", date: "21 Mar 2026", status: "Cancelled"  },
];

const avatarGrads = [
  "from-violet-400 to-indigo-500",
  "from-emerald-400 to-teal-500",
  "from-amber-400 to-orange-500",
  "from-sky-400 to-blue-500",
  "from-rose-400 to-pink-500",
];

function Dashboard() {
  const stats = [
    { icon: "₹",  label: "Revenue",  value: "₹4,28,500", change: 12, bg: "bg-violet-50 text-violet-600" },
    { icon: "📦", label: "Products", value: "1,284",      change: 5,  bg: "bg-sky-50 text-sky-600"      },
    { icon: "👥", label: "Users",    value: "9,732",      change: -2, bg: "bg-amber-50 text-amber-600"  },
    { icon: "🛒", label: "Orders",   value: "318",        change: 8,  bg: "bg-emerald-50 text-emerald-600" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Dashboard</h2>
        <p className="text-sm text-slate-400 mt-0.5">Welcome back — here's what's happening today.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((s) => <StatCard key={s.label} {...s} />)}
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-slate-800">Recent Orders</h3>
            <p className="text-xs text-slate-400 mt-0.5">Latest 5 transactions</p>
          </div>
          <button className="text-xs text-violet-600 hover:text-violet-700 font-semibold flex items-center gap-1 bg-violet-50 hover:bg-violet-100 px-3 py-1.5 rounded-lg transition-colors">
            View all <Icon.Chevron />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[680px] text-sm">
            <thead>
              <tr className="text-[11px] text-slate-400 font-bold uppercase tracking-widest bg-slate-50/70 border-b border-slate-100">
                <th className="px-6 py-3 text-left">Order</th>
                <th className="px-6 py-3 text-left">Customer</th>
                <th className="px-6 py-3 text-left hidden md:table-cell">Product</th>
                <th className="px-6 py-3 text-left">Amount</th>
                <th className="px-6 py-3 text-left hidden lg:table-cell">Date</th>
                <th className="px-6 py-3 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o, i) => (
                <tr key={o.id} className="border-b border-slate-50 hover:bg-slate-50/80 transition-colors">
                  <td className="px-6 py-4 font-mono text-xs text-slate-400 font-medium">{o.id}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2.5">
                      <div className={`w-7 h-7 rounded-full bg-gradient-to-br ${avatarGrads[i % avatarGrads.length]} flex items-center justify-center text-white text-xs font-bold shrink-0`}>
                        {o.customer[0]}
                      </div>
                      <span className="font-medium text-slate-700">{o.customer}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-500 hidden md:table-cell">{o.product}</td>
                  <td className="px-6 py-4 font-bold text-slate-800">{o.amount}</td>
                  <td className="px-6 py-4 text-slate-400 hidden lg:table-cell text-xs">{o.date}</td>
                  <td className="px-6 py-4"><Badge status={o.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ── Users ──────────────────────────────────────────────────────
const users = [
  { name: "Priya Sharma", email: "priya@email.com",  role: "Admin",    joined: "Jan 2025", orders: 14 },
  { name: "Arjun Mehta",  email: "arjun@email.com",  role: "Customer", joined: "Mar 2025", orders: 8  },
  { name: "Sneha Reddy",  email: "sneha@email.com",  role: "Customer", joined: "Feb 2025", orders: 21 },
  { name: "Vikram Nair",  email: "vikram@email.com", role: "Editor",   joined: "Nov 2024", orders: 5  },
  { name: "Ananya Iyer",  email: "ananya@email.com", role: "Customer", joined: "Apr 2025", orders: 3  },
];

const roleColors = {
  Admin:    "bg-violet-50 text-violet-700 border border-violet-200",
  Editor:   "bg-sky-50 text-sky-700 border border-sky-200",
  Customer: "bg-slate-100 text-slate-600 border border-slate-200",
};

function Users() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Users</h2>
          <p className="text-sm text-slate-400 mt-0.5">{users.length} registered users</p>
        </div>
        <button className="bg-violet-600 hover:bg-violet-700 active:scale-95 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-all">
          + Invite User
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[560px] text-sm">
            <thead>
              <tr className="text-[11px] text-slate-400 font-bold uppercase tracking-widest bg-slate-50/70 border-b border-slate-100">
                <th className="px-6 py-3 text-left">User</th>
                <th className="px-6 py-3 text-left">Role</th>
                <th className="px-6 py-3 text-left hidden md:table-cell">Joined</th>
                <th className="px-6 py-3 text-left hidden sm:table-cell">Orders</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u, i) => (
                <tr key={u.email} className="border-b border-slate-50 hover:bg-slate-50/80 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${avatarGrads[i % avatarGrads.length]} flex items-center justify-center text-white text-sm font-bold shrink-0`}>
                        {u.name[0]}
                      </div>
                      <div>
                        <p className="font-semibold text-slate-800">{u.name}</p>
                        <p className="text-xs text-slate-400">{u.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${roleColors[u.role]}`}>
                      {u.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-400 hidden md:table-cell text-xs">{u.joined}</td>
                  <td className="px-6 py-4 font-bold text-slate-700 hidden sm:table-cell">{u.orders}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ── Sidebar Nav Item ───────────────────────────────────────────
function SideItem({ label, icon, active, onClick }) {
  return (
    <li
      onClick={onClick}
      className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl cursor-pointer text-sm font-medium transition-all duration-150 select-none
        ${active
          ? "bg-violet-600 text-white shadow-md shadow-violet-500/30"
          : "text-slate-400 hover:bg-white/5 hover:text-slate-200"
        }`}
    >
      <span className={active ? "text-white" : "text-slate-500"}>{icon}</span>
      {label}
      {active && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-white/60" />}
    </li>
  );
}

// ── Main Layout ────────────────────────────────────────────────
export default function AdminLayout() {
  const [activePage, setActivePage]   = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const nav = [
    { key: "dashboard", label: "Dashboard", icon: <Icon.Dashboard /> },
    { key: "admissions", label: "Admissions", icon: <Icon.Users /> },
    { key: "courseUpload", label: "Course Upload", icon: <Icon.Upload /> },
    { key: "recordedCourseUpload", label: "Recorded Upload", icon: <Icon.Upload /> },
    { key: "users", label: "Users", icon: <Icon.Users /> },
  ];

  const renderPage = () => {
    switch (activePage) {
      case "admissions": return <Admissions />;
      case "courseUpload": return <CourseUpload />;
      case "recordedCourseUpload": return <RecordedCourseUpload />;
      case "users": return <Users />;
      case "dashboard":
      default: return <Dashboard />;
    }
  };

  const navigate = (key) => {
    setActivePage(key);
    setSidebarOpen(false);
  };

  const pageLabel = nav.find(n => n.key === activePage)?.label || "Dashboard";

  return (
    /*
      KEY TRICK for fixed-sidebar + scrollable-content:
      - Outer div: h-screen overflow-hidden (clips both sides)
      - Sidebar: fixed h-full (or lg:static h-full) — never scrolls
      - Right side: flex-1 flex flex-col h-full overflow-hidden
        - Header: shrink-0 (never squishes)
        - Main:   flex-1 overflow-y-auto (ONLY this scrolls)
    */
    <div className="flex h-screen overflow-hidden bg-slate-50">

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ══ SIDEBAR — full height, never scrolls with page ══ */}
      <aside className={`
        fixed top-0 left-0 z-50 h-full w-64 flex flex-col bg-slate-900
        transition-transform duration-300 ease-in-out
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0 lg:static lg:z-auto lg:shrink-0
      `}>

        {/* Logo — pinned top */}
        <div className="shrink-0 px-5 py-5 border-b border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-violet-600 rounded-lg flex items-center justify-center shadow-lg shadow-violet-600/40">
              <span className="text-white font-black text-sm">A</span>
            </div>
            <div>
              <p className="font-bold text-white text-sm tracking-tight leading-none">AdminKit</p>
              <p className="text-[10px] text-slate-500 mt-0.5">Management Panel</p>
            </div>
          </div>
          <button className="lg:hidden text-slate-500 hover:text-white transition-colors" onClick={() => setSidebarOpen(false)}>
            <Icon.Close />
          </button>
        </div>

        {/* Nav — scrollable if items overflow */}
        <nav className="flex-1 overflow-y-auto px-3 py-5 space-y-6">
          <div>
            <p className="text-[10px] text-slate-600 font-bold uppercase tracking-widest px-3.5 mb-2">Main Menu</p>
            <ul className="space-y-0.5">
              {nav.map((item) => (
                <SideItem
                  key={item.key}
                  label={item.label}
                  icon={item.icon}
                  active={activePage === item.key}
                  onClick={() => navigate(item.key)}
                />
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[10px] text-slate-600 font-bold uppercase tracking-widest px-3.5 mb-2">System</p>
            <ul className="space-y-0.5">
              <li className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl cursor-pointer text-sm font-medium text-slate-400 hover:bg-white/5 hover:text-slate-200 transition-all">
                <Icon.Settings /> Settings
              </li>
            </ul>
          </div>
        </nav>

        {/* User — pinned bottom */}
        <div className="shrink-0 px-3 py-4 border-t border-white/5">
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/5 cursor-pointer transition-colors">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-400 to-indigo-500 flex items-center justify-center text-white text-xs font-bold shrink-0 ring-2 ring-violet-500/30">
              P
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-white truncate leading-tight">Priya Sharma</p>
              <p className="text-[11px] text-slate-500 truncate">priya@admin.com</p>
            </div>
            <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
          </div>
        </div>
      </aside>

      {/* ══ RIGHT SIDE — header fixed, content scrolls ══ */}
      <div className="flex-1 flex flex-col h-full min-w-0 overflow-hidden">

        {/* Topbar — shrink-0 keeps it from scrolling */}
        <header className="shrink-0 z-30 bg-white border-b border-slate-100 px-4 sm:px-6 py-3.5 flex items-center gap-4">
          <button
            className="lg:hidden text-slate-500 hover:text-slate-800 transition-colors"
            onClick={() => setSidebarOpen(true)}
          >
            <Icon.Menu />
          </button>

          {/* Breadcrumb */}
          <div className="hidden sm:flex items-center gap-2">
            <span className="text-xs text-slate-400">Admin</span>
            <span className="text-xs text-slate-300">/</span>
            <span className="text-xs font-semibold text-slate-700 capitalize">{pageLabel}</span>
          </div>

          <span className="sm:hidden font-semibold text-slate-800 text-sm">{pageLabel}</span>

       
        </header>

        {/* ══ SCROLLABLE CONTENT AREA — only this div scrolls ══ */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-4 sm:p-6 lg:p-8">
            {renderPage()}
          </div>
        </main>
      </div>
    </div>
  );
}



