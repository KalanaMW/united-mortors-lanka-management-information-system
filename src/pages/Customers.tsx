import { motion } from "framer-motion";
import { getCustomers } from "@/lib/mockServer";
import { User, Mail, Phone, Car, Calendar, Shield } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const customers = getCustomers();

export default function Customers() {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="mb-2 text-4xl font-bold">Customer Management</h1>
        <p className="text-muted-foreground">
          View customer profiles and service history
        </p>
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-2">
        {customers.map((customer, index) => (
          <motion.div
            key={customer.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass-card group rounded-2xl p-6 transition-all hover:shadow-xl hover:shadow-primary/10"
            data-magnetic
          >
            {/* Header */}
            <div className="mb-6 flex items-start gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary">
                <User className="h-8 w-8 text-primary-foreground" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-foreground">{customer.name}</h3>
                <div className="mt-2 space-y-1">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Mail className="h-4 w-4" />
                    {customer.email}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Phone className="h-4 w-4" />
                    {customer.phone}
                  </div>
                </div>
              </div>
            </div>

            {/* Customer Info Grid */}
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-lg bg-background/50 p-4">
                <div className="mb-2 flex items-center gap-2 text-xs text-muted-foreground">
                  <Car className="h-4 w-4" />
                  Vehicles
                </div>
                {customer.vehicles.map((vehicle, i) => (
                  <div key={i} className="text-sm font-medium">
                    {vehicle}
                  </div>
                ))}
              </div>

              <div className="rounded-lg bg-background/50 p-4">
                <div className="mb-2 flex items-center gap-2 text-xs text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  Last Service
                </div>
                <div className="text-sm font-medium">{customer.lastService}</div>
              </div>

              <div className="rounded-lg bg-background/50 p-4">
                <div className="mb-2 flex items-center gap-2 text-xs text-muted-foreground">
                  <Shield className="h-4 w-4" />
                  Warranty Status
                </div>
                <Badge className="bg-green-500/20 text-green-500">
                  {customer.warranty}
                </Badge>
              </div>

              <div className="rounded-lg bg-background/50 p-4">
                <div className="mb-2 text-xs text-muted-foreground">
                  Lifetime Value
                </div>
                <div className="text-xl font-bold text-primary">
                  ${customer.ltv.toLocaleString()}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
