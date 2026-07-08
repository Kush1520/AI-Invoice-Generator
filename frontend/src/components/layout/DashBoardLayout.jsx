import { useState, useEffect } from "react";
import CreateInvoice from "../../pages/invoices/CreateInvoices";
import AllInvoices from "../../pages/invoices/AllInvoices";
import InvoiceDetail from "../../pages/invoices/InvoiceDetail";
import RecurringPage from "../../pages/Recurring/RecurringPage";
import ProfilePage from "../../pages/Profile/ProfilePage";
import Dashboard from "../../pages/Dashboard/Dashboard";
import {
  LayoutDashboard, FileText, Plus, Users,
  LogOut, Menu, X, ChevronLeft, RefreshCw,
} from "lucide-react";
import { useAuth } from "../../context/authContext";
import ProfileDropdown from "../../components/layout/ProfileDropDown";
import ThemeToggle from "../../components/ui/ThemeToggle";

const NAVIGATION_MENU = [
  { id: "dashboard",  name: "Dashboard",     icon: LayoutDashboard },
  { id: "invoices",   name: "Invoices",       icon: FileText        },
  { id: "recurring",  name: "Recurring",      icon: RefreshCw       },
  { id: "invoices/new", name: "Create Invoice", icon: Plus          },
  { id: "profile",    name: "Profile",        icon: Users           },
];

const PAGE_TITLES = {
  dashboard:        "Dashboard",
  invoices:         "Invoices",
  recurring:        "Recurring Invoices",
  "invoices/new":   "Create Invoice",
  "invoice-detail": "Invoice Detail",
  profile:          "Profile",
};

const DashboardLayout = () => {
  const { user, logout } = useAuth();

  const [activeNavItem,       setActiveNavItem]       = useState("dashboard");
  const [sidebarOpen,         setSidebarOpen]         = useState(true);
  const [sidebarCollapsed,    setSidebarCollapsed]    = useState(false);
  const [isMobile,            setIsMobile]            = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [editInvoiceData,     setEditInvoiceData]     = useState(null);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) setSidebarOpen(false);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navigate = (id, invoiceData = null) => {
    setEditInvoiceData(invoiceData);
    setActiveNavItem(id);
    if (isMobile) setSidebarOpen(false);
  };

  const initials = user?.name
    ? user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : "U";

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-zinc-950 text-slate-800 dark:text-zinc-200 transition-colors duration-300 overflow-hidden">

      {isMobile && sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 bg-white dark:bg-zinc-900 border-r border-slate-200/80 dark:border-zinc-800/80 flex flex-col
          transition-all duration-300 ease-in-out
          ${sidebarCollapsed && !isMobile ? "w-[72px]" : "w-64"}
          ${isMobile
            ? sidebarOpen ? "translate-x-0 shadow-xl" : "-translate-x-full"
            : "translate-x-0"
          }
        `}
      >
        <div className="h-16 flex items-center justify-between px-4 border-b border-slate-100 dark:border-zinc-850 shrink-0">
          {(!sidebarCollapsed || isMobile) && (
            <button
              onClick={() => (window.location.href = "/")}
              className="flex items-center gap-2.5 cursor-pointer"
            >
              <div className="w-8 h-8 rounded-xl bg-blue-500 flex items-center justify-center shadow-md shadow-blue-500/10">
                <FileText className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-slate-900 dark:text-zinc-50 text-sm hover:text-blue-500 dark:hover:text-blue-400 transition tracking-tight">
                InvoiceAI
              </span>
            </button>
          )}
          {!isMobile && (
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="w-7 h-7 rounded-lg hover:bg-slate-50 dark:hover:bg-zinc-800/50 flex items-center justify-center text-slate-400 dark:text-zinc-500 hover:text-slate-600 dark:hover:text-zinc-350 transition-colors ml-auto"
            >
              <ChevronLeft className={`w-4 h-4 transition-transform ${sidebarCollapsed ? "rotate-180" : ""}`} />
            </button>
          )}
          {isMobile && (
            <button onClick={() => setSidebarOpen(false)} className="text-slate-400 dark:text-zinc-500 hover:text-slate-600 dark:hover:text-zinc-350 ml-auto">
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
          {NAVIGATION_MENU.map(({ id, name, icon: Icon }) => {
            const isActive = activeNavItem === id;
            return (
              <button
                key={id}
                onClick={() => navigate(id)}
                title={sidebarCollapsed && !isMobile ? name : undefined}
                className={`
                  relative w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm
                  transition-all duration-155 group cursor-pointer
                  ${isActive
                    ? "bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 font-semibold"
                    : "text-slate-600 dark:text-zinc-400 hover:bg-slate-50/50 dark:hover:bg-zinc-800/40 hover:text-slate-955 dark:hover:text-zinc-205"
                  }
                `}
              >
                {isActive && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-blue-500 rounded-r-full" />
                )}
                <Icon className={`w-[18px] h-[18px] shrink-0 ${isActive ? "text-blue-600 dark:text-blue-400" : "text-slate-400 dark:text-zinc-500 group-hover:text-slate-600 group-hover:dark:text-zinc-300"}`} />
                {(!sidebarCollapsed || isMobile) && <span>{name}</span>}
              </button>
            );
          })}
        </nav>

        <div className="p-3 border-t border-slate-100 dark:border-zinc-855 shrink-0">
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-slate-500 dark:text-zinc-500 hover:bg-red-50 dark:hover:bg-red-955/20 hover:text-red-600 dark:hover:text-red-400 transition-colors cursor-pointer"
          >
            <LogOut className="w-[18px] h-[18px] shrink-0" />
            {(!sidebarCollapsed || isMobile) && "Logout"}
          </button>
        </div>
      </aside>

      {/* MAIN */}
      <div
        className={`
          flex-1 flex flex-col min-w-0 transition-all duration-300
          ${isMobile ? "ml-0" : sidebarCollapsed ? "ml-[72px]" : "ml-64"}
        `}
      >
        <header className="h-16 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border-b border-slate-200/80 dark:border-zinc-800/80 flex items-center justify-between px-6 shrink-0 z-30 transition-colors duration-300">
          <div className="flex items-center gap-3">
            {isMobile && (
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="w-9 h-9 rounded-lg hover:bg-slate-100 dark:hover:bg-zinc-800 flex items-center justify-center text-slate-500 dark:text-zinc-400 transition-colors"
              >
                <Menu className="w-5 h-5" />
              </button>
            )}
            <h1 className="text-sm font-bold text-slate-900 dark:text-zinc-50">
              {PAGE_TITLES[activeNavItem] ?? activeNavItem}
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <ThemeToggle />
            <div className="w-px h-5 bg-slate-200 dark:bg-zinc-800"></div>
            <ProfileDropdown
              isOpen={profileDropdownOpen}
              onToggle={() => setProfileDropdownOpen((v) => !v)}
              avatar={initials}
              companyName={user?.name ?? ""}
              email={user?.email ?? ""}
              onLogout={logout}
              onViewProfile={() => navigate("profile")}
            />
          </div>
        </header>

        {/* CONTENT */}
        <main className="flex-1 p-6 overflow-y-auto bg-transparent">
          {activeNavItem === "dashboard"      && <Dashboard onNavigate={navigate} />}
          {activeNavItem === "invoices"       && <AllInvoices onNavigate={navigate} />}
          {activeNavItem === "recurring"      && <RecurringPage />}
          {activeNavItem === "invoices/new"   && (
            <CreateInvoice
              key={editInvoiceData?._id ?? "new"}
              invoiceData={editInvoiceData}
              onNavigate={navigate}
            />
          )}
          {activeNavItem === "invoice-detail" && (
            <InvoiceDetail
              key={editInvoiceData?._id}
              invoiceId={editInvoiceData?._id}
              onNavigate={navigate}
            />
          )}
          {activeNavItem === "profile" && <ProfilePage />}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;