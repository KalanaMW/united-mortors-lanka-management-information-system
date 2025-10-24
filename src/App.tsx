import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AnimatedCursor } from "@/components/AnimatedCursor";
import { Sidebar } from "@/components/Sidebar";
import { TopNav } from "@/components/TopNav";
import { useSidebarStore } from "@/lib/store";
import { motion } from "framer-motion";
import Dashboard from "./pages/Dashboard";
import Sales from "./pages/Sales";
import Service from "./pages/Service";
import Inventory from "./pages/Inventory";
import Customers from "./pages/Customers";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function Layout({ children }: { children: React.ReactNode }) {
  const { collapsed } = useSidebarStore();

  return (
    <div className="flex min-h-screen flex-col">
      <TopNav />
      <motion.main
        initial={false}
        animate={{ paddingLeft: collapsed ? 96 : 256 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="flex-1 p-6"
      >
        {children}
      </motion.main>
    </div>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AnimatedCursor />
        <Sidebar />
        <Routes>
          <Route path="/" element={<Layout><Dashboard /></Layout>} />
          <Route path="/sales" element={<Layout><Sales /></Layout>} />
          <Route path="/service" element={<Layout><Service /></Layout>} />
          <Route path="/inventory" element={<Layout><Inventory /></Layout>} />
          <Route path="/customers" element={<Layout><Customers /></Layout>} />
          <Route path="/reports" element={<Layout><Reports /></Layout>} />
          <Route path="/settings" element={<Layout><Settings /></Layout>} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
