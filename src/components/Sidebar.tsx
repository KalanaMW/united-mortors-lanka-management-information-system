import { motion, AnimatePresence } from "framer-motion";
import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  TrendingUp,
  Wrench,
  Package,
  Users,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
  Car,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useSidebarStore } from "@/lib/store";

const navItems = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Sales", url: "/sales", icon: TrendingUp },
  { title: "Service", url: "/service", icon: Wrench },
  { title: "Inventory", url: "/inventory", icon: Package },
  { title: "Customers", url: "/customers", icon: Users },
  { title: "Reports", url: "/reports", icon: BarChart3 },
  { title: "Settings", url: "/settings", icon: Settings },
];

export function Sidebar() {
  const { collapsed, toggle } = useSidebarStore();
  const location = useLocation();
  
  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <motion.aside
      initial={false}
      animate={{ width: collapsed ? 80 : 240 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="glass-nav fixed left-0 top-0 z-40 h-screen overflow-hidden"
    >
      <div className="flex h-full flex-col p-4">
        {/* Logo */}
        <motion.div
          className="mb-8 flex items-center gap-3"
          initial={false}
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-secondary">
            <Car className="h-6 w-6 text-primary-foreground" />
          </div>
          <AnimatePresence mode="wait">
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <h1 className="text-lg font-bold text-foreground">UML MIS</h1>
                <p className="text-xs text-muted-foreground">United Motors</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1">
          {navItems.map((item, index) => {
            const active = isActive(item.url);
            const Icon = item.icon;
            
            return (
              <motion.div
                key={item.url}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <NavLink
                  to={item.url}
                  data-magnetic
                  className={cn(
                    "group relative flex items-center gap-3 rounded-lg px-3 py-2.5 transition-all duration-200",
                    active
                      ? "bg-primary/20 text-primary"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  {active && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute inset-0 rounded-lg bg-primary/20"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  
                  <Icon className={cn("relative z-10 h-5 w-5", active && "text-primary")} />
                  
                  <AnimatePresence mode="wait">
                    {!collapsed && (
                      <motion.span
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: "auto" }}
                        exit={{ opacity: 0, width: 0 }}
                        transition={{ duration: 0.2 }}
                        className={cn(
                          "relative z-10 overflow-hidden whitespace-nowrap text-sm font-medium",
                          active && "text-primary"
                        )}
                      >
                        {item.title}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </NavLink>
              </motion.div>
            );
          })}
        </nav>

        {/* Toggle Button */}
        <button
          onClick={toggle}
          data-magnetic
          className="mt-4 flex items-center justify-center rounded-lg border border-border p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          {collapsed ? (
            <ChevronRight className="h-5 w-5" />
          ) : (
            <ChevronLeft className="h-5 w-5" />
          )}
        </button>
      </div>
    </motion.aside>
  );
}
