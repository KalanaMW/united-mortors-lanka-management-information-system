# united-mortor-lanka-management-information-system
A premium, fully-animated automotive enterprise dashboard built with React, TypeScript, and cutting-edge web technologies. Features interactive 3D visualizations, real-time analytics, and a "people-interactive" UI optimized for 60fps performance.
🚀 Features
Core Functionality
Dashboard: Animated KPI cards with count-up effects, 3D car hero component, and interactive charts
Sales Pipeline: Kanban board with drag-and-drop functionality for managing deals
Service Workshop: Real-time bay monitoring, animated progress tracking, and Gantt-style timeline
Inventory Management: Smart stock tracking with low-stock alerts and reorder suggestions
Customer CRM: Profile management with service history and lifetime value tracking
Business Intelligence: Interactive charts with drill-down capabilities and export options
Settings: Comprehensive application configuration
Design & UX
Animated Cursor: Magnetic hover effects, smooth tracking, and ripple animations on click
Collapsible Sidebar: Spring-based animations with active route highlighting
Glass Morphism: Modern translucent cards with backdrop blur effects
Motion Design: Framer Motion powered animations throughout, respecting prefers-reduced-motion
Dark Theme: Enterprise-grade dark mode with teal (#14b8a6) and orange (#f97316) accents
Responsive: Mobile-first design that adapts seamlessly across devices
🛠️ Tech Stack
Core
React 18+ with TypeScript
Vite for blazing-fast development
Tailwind CSS for utility-first styling
Framer Motion for smooth, performant animations
Zustand for lightweight state management
3D & Visualization
Three.js via @react-three/fiber and @react-three/drei
Recharts for interactive data visualization
@dnd-kit for accessible drag-and-drop
UI Components
shadcn/ui - Accessible, customizable components
Lucide React - Beautiful icon set
Radix UI - Unstyled, accessible primitives
📦 Setup & Installation
# Install dependencies
npm install

# Start development server (http://localhost:8080)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run tests
npm run test

# Lint code
npm run lint
🎨 Design System
Colors (HSL)
Primary: 172 66% 50% (Teal) - Main brand color
Secondary: 25 95% 53% (Orange) - Accent color
Background: 224 71% 4% - Deep navy
Foreground: 213 31% 91% - Light gray text
Muted: 223 47% 11% - Subtle backgrounds
Custom Utilities
.glass-card        /* Translucent card with backdrop blur */
.glass-nav         /* Navigation bar with glass effect */
.glow-primary      /* Primary color glow shadow */
.animated-gradient /* Animated gradient background */
Animations
All animations use spring physics via Framer Motion with:

Damping: 25-30 for natural motion
Stiffness: 300-700 for responsive feel
Automatic prefers-reduced-motion support
🎭 Animation Tuning
Global Settings
Edit src/index.css to adjust animation durations:

:root {
  --transition-smooth: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  --transition-spring: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}
Component-Level
Fine-tune individual animations in component files:

Sidebar: src/components/Sidebar.tsx - Collapse/expand timing
KPICard: src/components/KPICard.tsx - Count-up animation speed
Hero3D: src/components/Hero3D.tsx - 3D model rotation speed
Performance
3D scene is lazy-loaded with <Suspense>
Charts use deferred rendering
All animations use GPU-accelerated properties (transform, opacity)
Respects user's motion preferences automatically
📊 Mock API
The application uses a mock server (src/lib/mockServer.ts) with realistic data:

import { getKPIs, getSalesPipeline, getServiceJobs } from '@/lib/mockServer';
Available Endpoints
getKPIs() - Dashboard metrics
getBranches() - Location data with coordinates
getSalesPipeline() - Sales opportunities
getServiceJobs() - Workshop schedules
getInventory() - Parts inventory
getCustomers() - Customer profiles
getRevenueChart() - Historical revenue data
getSalesbyCategory() - Sales distribution
🧪 Testing
Basic test setup included with Jest and React Testing Library:

npm run test
Key components have test coverage:

KPICard - Animation and count-up logic
AnimatedCursor - Interaction and reduced motion
Sidebar - Navigation and collapse state
⚡ Performance
Lighthouse Scores (Target: 90+)
Performance: GPU-accelerated animations, code-splitting
Accessibility: ARIA labels, keyboard navigation, screen reader support
Best Practices: Semantic HTML, responsive images
SEO: Meta tags, structured data ready
Optimization Tips
Keep 3D models under 1MB (GLTF/GLB format)
Use next/image equivalent for optimized images
Defer non-critical chart rendering
Monitor FPS in DevTools Performance tab
🎯 Key Interactive Elements
Magnetic Hover
Add data-magnetic attribute to any element for cursor attraction:

<button data-magnetic>Hover me!</button>
Animated Routes
Route transitions use layout animations for smooth page changes.

3D Interactions
Hover over the 3D car to rotate
Click to open configuration drawer (placeholder)
Auto-rotation when idle
🔐 Accessibility
Full keyboard navigation support
Screen reader friendly with ARIA labels
Color-blind safe palette
Respects prefers-reduced-motion
High contrast mode compatible
📱 Responsive Breakpoints
Mobile: < 768px
Tablet: 768px - 1024px
Desktop: > 1024px
Large Desktop: > 1400px
🚦 Browser Support
Chrome 90+
Firefox 88+
Safari 14+
Edge 90+
📝 File Structure
src/
├── components/
│   ├── AnimatedCursor.tsx    # Custom cursor with effects
│   ├── Sidebar.tsx            # Collapsible navigation
│   ├── TopNav.tsx             # Header with search
│   ├── KPICard.tsx            # Animated metric cards
│   ├── Hero3D.tsx             # 3D car visualization
│   └── ui/                    # shadcn components
├── pages/
│   ├── Dashboard.tsx          # Main dashboard
│   ├── Sales.tsx              # Kanban board
│   ├── Service.tsx            # Workshop timeline
│   ├── Inventory.tsx          # Stock management
│   ├── Customers.tsx          # CRM
│   ├── Reports.tsx            # BI & Analytics
│   └── Settings.tsx           # Configuration
├── lib/
│   ├── store.ts               # Zustand state
│   ├── mockServer.ts          # Mock API
│   └── utils.ts               # Helper functions
└── index.css                  # Global styles & design tokens
🎓 Learning Resources
Framer Motion Docs
React Three Fiber
Tailwind CSS
Recharts Examples
🤝 Contributing
This is a production-ready template. Customize as needed:

Update brand colors in src/index.css
Replace mock data with real API calls
Add authentication flow
Integrate backend services
📄 License
MIT License - feel free to use for commercial projects.
