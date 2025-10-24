import { useState } from "react";
import { motion } from "framer-motion";
import { getInventory } from "@/lib/mockServer";
import { Package, AlertTriangle, CheckCircle2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const statusConfig = {
  healthy: { label: "Healthy", color: "bg-green-500/20 text-green-500", icon: CheckCircle2 },
  low: { label: "Low Stock", color: "bg-yellow-500/20 text-yellow-500", icon: AlertTriangle },
  critical: { label: "Critical", color: "bg-red-500/20 text-red-500", icon: AlertTriangle },
};

export default function Inventory() {
  const [items] = useState(getInventory());

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="mb-2 text-4xl font-bold">Inventory Management</h1>
        <p className="text-muted-foreground">
          Track spare parts stock levels and reorder points
        </p>
      </motion.div>

      {/* Summary Cards */}
      <div className="grid gap-6 md:grid-cols-3">
        {Object.entries(statusConfig).map(([key, config], index) => {
          const count = items.filter((item) => item.status === key).length;
          const Icon = config.icon;

          return (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass-card rounded-2xl p-6"
            >
              <div className="flex items-center gap-4">
                <div className={cn("rounded-lg p-3", config.color)}>
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{config.label}</p>
                  <p className="text-2xl font-bold">{count} items</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Inventory Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass-card overflow-hidden rounded-2xl"
      >
        <Table>
          <TableHeader>
            <TableRow className="border-border/50">
              <TableHead>Part Name</TableHead>
              <TableHead>SKU</TableHead>
              <TableHead className="text-center">Stock</TableHead>
              <TableHead className="text-center">Reorder Point</TableHead>
              <TableHead className="text-center">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item, index) => {
              const status = statusConfig[item.status as keyof typeof statusConfig];
              const StatusIcon = status.icon;

              return (
                <motion.tr
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={cn(
                    "group border-border/50 transition-all hover:bg-muted/50",
                    item.status === "critical" && "bg-red-500/5"
                  )}
                  data-magnetic
                >
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                        <Package className="h-5 w-5 text-primary" />
                      </div>
                      {item.part}
                    </div>
                  </TableCell>
                  <TableCell className="font-mono text-sm text-muted-foreground">
                    {item.sku}
                  </TableCell>
                  <TableCell className="text-center">
                    <span
                      className={cn(
                        "text-lg font-bold",
                        item.status === "critical" && "text-red-500",
                        item.status === "low" && "text-yellow-500",
                        item.status === "healthy" && "text-green-500"
                      )}
                    >
                      {item.stock}
                    </span>
                  </TableCell>
                  <TableCell className="text-center text-muted-foreground">
                    {item.reorder}
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-center">
                      <Badge className={cn("gap-1", status.color)}>
                        <StatusIcon className="h-3 w-3" />
                        {status.label}
                      </Badge>
                    </div>
                  </TableCell>
                </motion.tr>
              );
            })}
          </TableBody>
        </Table>
      </motion.div>
    </div>
  );
}
