import { motion } from "framer-motion";
import { Download, TrendingUp, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Reports() {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-start justify-between"
      >
        <div>
          <h1 className="mb-2 text-4xl font-bold">Business Intelligence</h1>
          <p className="text-muted-foreground">
            Generate reports and analyze performance metrics
          </p>
        </div>
        <Button className="gap-2" data-magnetic>
          <Download className="h-4 w-4" />
          Export Report
        </Button>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card rounded-2xl p-6"
        >
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <TrendingUp className="h-6 w-6 text-primary" />
            </div>
            <h2 className="text-xl font-bold">Sales Performance</h2>
          </div>
          <p className="text-sm text-muted-foreground">
            Detailed analysis of sales trends, conversion rates, and revenue growth across all branches.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card rounded-2xl p-6"
        >
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary/10">
              <BarChart3 className="h-6 w-6 text-secondary" />
            </div>
            <h2 className="text-xl font-bold">Service Analytics</h2>
          </div>
          <p className="text-sm text-muted-foreground">
            Workshop efficiency metrics, average service time, and customer satisfaction scores.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
