import { Bell, Search, User } from "lucide-react";
import { motion } from "framer-motion";
import { useSidebarStore } from "@/lib/store";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function TopNav() {
  const { collapsed } = useSidebarStore();
  
  return (
    <motion.header
      initial={false}
      animate={{ paddingLeft: collapsed ? 96 : 256 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="glass-nav sticky top-0 z-30 h-16"
    >
      <div className="flex h-full items-center justify-between px-6">
        {/* Search */}
        <div className="flex w-full max-w-md items-center gap-2">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-full pl-9 glass-card border-border/50"
            />
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="relative"
            data-magnetic
          >
            <Bell className="h-5 w-5" />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-secondary" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full"
                data-magnetic
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary">
                  <User className="h-4 w-4 text-primary-foreground" />
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 glass-card">
              <DropdownMenuLabel>
                <div>
                  <p className="text-sm font-medium">John Smith</p>
                  <p className="text-xs text-muted-foreground">john@unitedmotors.com</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Sign out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </motion.header>
  );
}
