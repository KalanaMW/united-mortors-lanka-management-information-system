import { motion } from "framer-motion";
import { getServiceJobs } from "@/lib/mockServer";
import { Clock, Wrench, CheckCircle2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

const jobs = getServiceJobs();

const statusConfig = {
  "in-progress": { label: "In Progress", color: "text-primary", icon: Wrench },
  completed: { label: "Completed", color: "text-green-500", icon: CheckCircle2 },
  waiting: { label: "Waiting", color: "text-yellow-500", icon: Clock },
};

export default function Service() {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="mb-2 text-4xl font-bold">Service Workshop</h1>
        <p className="text-muted-foreground">
          Monitor service bays and track job progress
        </p>
      </motion.div>

      {/* Workshop Timeline */}
      <div className="space-y-4">
        {jobs.map((job, index) => {
          const status = statusConfig[job.status as keyof typeof statusConfig];
          const StatusIcon = status.icon;

          return (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass-card group rounded-2xl p-6 transition-all hover:shadow-xl hover:shadow-primary/10"
              data-magnetic
            >
              <div className="flex items-start gap-6">
                {/* Bay Number */}
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-secondary">
                  <div className="text-center">
                    <div className="text-xs text-primary-foreground/70">Bay</div>
                    <div className="text-2xl font-bold text-primary-foreground">{job.bay}</div>
                  </div>
                </div>

                {/* Job Details */}
                <div className="flex-1 space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-foreground">{job.customer}</h3>
                      <p className="text-sm text-muted-foreground">{job.vehicle}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <StatusIcon className={cn("h-5 w-5", status.color)} />
                      <span className={cn("text-sm font-medium", status.color)}>
                        {status.label}
                      </span>
                    </div>
                  </div>

                  <div className="rounded-lg bg-background/50 p-3">
                    <div className="mb-2 flex items-center justify-between text-sm">
                      <span className="font-medium">{job.service}</span>
                      <span className="text-muted-foreground">ETA: {job.eta}</span>
                    </div>

                    {/* Progress Bar */}
                    <div className="space-y-1">
                      <Progress value={job.progress} className="h-2" />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Progress</span>
                        <span>{job.progress}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Animated progress indicator */}
              {job.status === "in-progress" && (
                <motion.div
                  className="mt-4 h-1 rounded-full bg-primary/20"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 2, repeat: Infinity }}
                  style={{ transformOrigin: "left" }}
                />
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Bay Heatmap */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="glass-card rounded-2xl p-6"
      >
        <h2 className="mb-6 text-xl font-bold">Bay Status Overview</h2>
        <div className="grid grid-cols-4 gap-4 md:grid-cols-8">
          {Array.from({ length: 8 }, (_, i) => {
            const job = jobs.find((j) => j.bay === i + 1);
            const isOccupied = !!job;

            return (
              <div
                key={i}
                className={cn(
                  "flex h-20 items-center justify-center rounded-lg border-2 transition-all",
                  isOccupied
                    ? "border-primary bg-primary/20 shadow-lg shadow-primary/20"
                    : "border-border bg-background/50"
                )}
              >
                <div className="text-center">
                  <div className="text-2xl font-bold">{i + 1}</div>
                  {isOccupied && (
                    <div className="text-xs text-primary">Active</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
