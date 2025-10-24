import { motion } from "framer-motion";
import { User, Bell, Shield, Palette } from "lucide-react";

export default function Settings() {
  const sections = [
    {
      icon: User,
      title: "Profile Settings",
      description: "Manage your account information and preferences",
    },
    {
      icon: Bell,
      title: "Notifications",
      description: "Configure alert preferences and notification channels",
    },
    {
      icon: Shield,
      title: "Security",
      description: "Update password and security settings",
    },
    {
      icon: Palette,
      title: "Appearance",
      description: "Customize theme and display options",
    },
  ];

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="mb-2 text-4xl font-bold">Settings</h1>
        <p className="text-muted-foreground">
          Manage your application preferences and account settings
        </p>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-2">
        {sections.map((section, index) => {
          const Icon = section.icon;
          
          return (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass-card group cursor-pointer rounded-2xl p-6 transition-all hover:shadow-xl hover:shadow-primary/10"
              data-magnetic
            >
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <h2 className="text-xl font-bold">{section.title}</h2>
              </div>
              <p className="text-sm text-muted-foreground">{section.description}</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
