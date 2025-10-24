import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef } from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface KPICardProps {
  title: string;
  value: number;
  change: number;
  prefix?: string;
  suffix?: string;
  icon: LucideIcon;
  delay?: number;
}

export function KPICard({
  title,
  value,
  change,
  prefix = "",
  suffix = "",
  icon: Icon,
  delay = 0,
}: KPICardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 30,
    stiffness: 100,
  });
  const displayValue = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, value, motionValue]);

  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      if (displayValue.current) {
        displayValue.current.textContent = `${prefix}${Math.round(latest).toLocaleString()}${suffix}`;
      }
    });

    return unsubscribe;
  }, [springValue, prefix, suffix]);

  const isPositive = change >= 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.5 }}
      className="glass-card group relative overflow-hidden rounded-2xl p-6 transition-all hover:shadow-xl hover:shadow-primary/10"
      data-magnetic
    >
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
      
      <div className="relative z-10">
        <div className="mb-4 flex items-start justify-between">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
            <Icon className="h-6 w-6 text-primary" />
          </div>
          
          <div className={cn(
            "flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium",
            isPositive ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"
          )}>
            <span>{isPositive ? "↑" : "↓"}</span>
            <span>{Math.abs(change)}%</span>
          </div>
        </div>

        <h3 className="mb-2 text-sm text-muted-foreground">{title}</h3>
        
        <div className="text-3xl font-bold text-foreground">
          <span ref={displayValue}>
            {prefix}0{suffix}
          </span>
        </div>
      </div>

      {/* Glow effect */}
      <motion.div
        className="absolute -bottom-20 -right-20 h-40 w-40 rounded-full bg-primary/20 blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </motion.div>
  );
}
