import { useMemo, useState } from "react";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  useDroppable,
  useDraggable,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import type { Lead, Stage } from "@/lib/types";
import { PIPELINE_STAGES } from "@/lib/types";
import { STAGE_LABEL, STAGE_HINT } from "@/lib/labels";
import type { CSSProperties } from "react";
import { LeadCard } from "./LeadCard";
import { useClientsStore } from "./store";
import { PopNumber } from "@/components/PopNumber";
import { fadeUpItem } from "@/styles/motion.css";
import * as styles from "./BoardView.css";

function DraggableCard({ lead }: { lead: Lead }) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: lead.id,
  });
  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={{ opacity: isDragging ? 0.4 : 1, touchAction: "none" }}
    >
      <LeadCard lead={lead} />
    </div>
  );
}

function Column({ stage, leads, index }: { stage: Stage; leads: Lead[]; index: number }) {
  const { setNodeRef, isOver } = useDroppable({ id: stage });
  return (
    <section
      className={`${styles.column} ${fadeUpItem}`}
      style={{ "--i": index } as CSSProperties}
    >
      <header className={styles.columnHead}>
        <span className={styles.columnName}>{STAGE_LABEL[stage]}</span>
        <PopNumber value={leads.length} className={styles.columnCount} />
      </header>
      <div
        ref={setNodeRef}
        className={styles.dropZone}
        data-over={isOver ? "true" : undefined}
      >
        {leads.length === 0 ? (
          <p className={styles.columnHint}>{STAGE_HINT[stage]}</p>
        ) : (
          leads.map((lead) => <DraggableCard key={lead.id} lead={lead} />)
        )}
      </div>
    </section>
  );
}

export function BoardView({ leads }: { leads: Lead[] }) {
  const moveLead = useClientsStore((s) => s.moveLead);
  const [activeId, setActiveId] = useState<string | null>(null);
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
  );

  const byStage = useMemo(() => {
    const groups = {} as Record<Stage, Lead[]>;
    for (const stage of PIPELINE_STAGES) groups[stage] = [];
    for (const lead of leads) groups[lead.stage]?.push(lead);
    return groups;
  }, [leads]);

  const activeLead = leads.find((l) => l.id === activeId) ?? null;

  function handleStart(event: DragStartEvent) {
    setActiveId(String(event.active.id));
  }

  function handleEnd(event: DragEndEvent) {
    setActiveId(null);
    const { active, over } = event;
    if (!over) return;
    const lead = leads.find((l) => l.id === active.id);
    const target = over.id as Stage;
    if (lead && lead.stage !== target) void moveLead(lead.id, target);
  }

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleStart}
      onDragEnd={handleEnd}
    >
      <div className={styles.board}>
        {PIPELINE_STAGES.map((stage, i) => (
          <Column key={stage} stage={stage} leads={byStage[stage]} index={i} />
        ))}
      </div>
      <DragOverlay>
        {activeLead ? <LeadCard lead={activeLead} dragging /> : null}
      </DragOverlay>
    </DndContext>
  );
}
