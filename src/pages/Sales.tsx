import { useState } from "react";
import { motion } from "framer-motion";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { getSalesPipeline } from "@/lib/mockServer";
import { GripVertical } from "lucide-react";
import { cn } from "@/lib/utils";

const initialData = getSalesPipeline();

interface Deal {
  id: number;
  customer: string;
  vehicle: string;
  value: number;
  stage: string;
  date: string;
}

function SortableItem({ deal }: { deal: Deal }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: deal.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "glass-card mb-3 rounded-lg p-4 transition-all",
        isDragging && "opacity-50"
      )}
    >
      <div className="flex items-start gap-3">
        <button {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing">
          <GripVertical className="h-5 w-5 text-muted-foreground" />
        </button>
        
        <div className="flex-1">
          <h4 className="font-semibold text-foreground">{deal.customer}</h4>
          <p className="text-sm text-muted-foreground">{deal.vehicle}</p>
          <div className="mt-2 flex items-center justify-between">
            <span className="text-lg font-bold text-primary">
              ${deal.value.toLocaleString()}
            </span>
            <span className="text-xs text-muted-foreground">{deal.date}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Sales() {
  const [deals, setDeals] = useState<Deal[]>(initialData.leads);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setDeals((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const stageColumns = [
    { id: "inquiry", title: "Inquiry", color: "hsl(217 91% 60%)" },
    { id: "test-drive", title: "Test Drive", color: "hsl(172 66% 50%)" },
    { id: "negotiation", title: "Negotiation", color: "hsl(25 95% 53%)" },
    { id: "closing", title: "Closing", color: "hsl(142 71% 45%)" },
  ];

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="mb-2 text-4xl font-bold">Sales Pipeline</h1>
        <p className="text-muted-foreground">
          Manage your sales opportunities and track progress
        </p>
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-4">
        {stageColumns.map((stage, index) => {
          const stageDeals = deals.filter((d) => d.stage === stage.id);
          
          return (
            <motion.div
              key={stage.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="space-y-3"
            >
              <div className="flex items-center gap-2">
                <div
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: stage.color }}
                />
                <h2 className="font-semibold">{stage.title}</h2>
                <span className="ml-auto rounded-full bg-muted px-2 py-0.5 text-xs">
                  {stageDeals.length}
                </span>
              </div>

              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
              >
                <SortableContext
                  items={stageDeals.map((d) => d.id)}
                  strategy={verticalListSortingStrategy}
                >
                  {stageDeals.map((deal) => (
                    <SortableItem key={deal.id} deal={deal} />
                  ))}
                </SortableContext>
              </DndContext>

              {stageDeals.length === 0 && (
                <div className="glass-card rounded-lg p-8 text-center">
                  <p className="text-sm text-muted-foreground">No deals in this stage</p>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
