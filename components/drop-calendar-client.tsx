"use client";

import { useEffect, useMemo, useState } from "react";
import type { UpcomingDrop } from "@/lib/mock-drops";
import { SparkleButton } from "@/components/sparkle-button";

export function DropCalendarClient({ drops }: { drops: UpcomingDrop[] }) {
  const [month, setMonth] = useState("all");
  const [universe, setUniverse] = useState("all");
  const [reminders, setReminders] = useState<string[]>([]);

  useEffect(() => {
    const saved = JSON.parse(window.localStorage.getItem("trinket-reminders") ?? "[]") as string[];
    setReminders(saved);
  }, []);

  const toggle = (id: string) => {
    const next = reminders.includes(id) ? reminders.filter((entry) => entry !== id) : [...reminders, id];
    setReminders(next);
    window.localStorage.setItem("trinket-reminders", JSON.stringify(next));
  };

  const months = [...new Set(drops.map((drop) => drop.date.slice(0, 7)))];
  const universes = [...new Set(drops.map((drop) => drop.universeSlug))];
  const filtered = useMemo(
    () => drops.filter((drop) => (month === "all" || drop.date.startsWith(month)) && (universe === "all" || drop.universeSlug === universe)),
    [drops, month, universe]
  );

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-3">
        <FilterPill label="All months" active={month === "all"} onClick={() => setMonth("all")} />
        {months.map((value) => (
          <FilterPill
            key={value}
            label={new Date(`${value}-01`).toLocaleDateString("en-US", { month: "long", year: "numeric" })}
            active={month === value}
            onClick={() => setMonth(value)}
          />
        ))}
      </div>
      <div className="flex flex-wrap gap-3">
        <FilterPill label="All universes" active={universe === "all"} onClick={() => setUniverse("all")} />
        {universes.map((value) => (
          <FilterPill key={value} label={value} active={universe === value} onClick={() => setUniverse(value)} />
        ))}
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((drop, index) => {
          const hypeScore = 68 + ((index * 7 + drop.releaseName.length) % 28);
          return (
            <article key={drop.id} className="sticker-card rounded-[30px] p-5">
              <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">{drop.universeSlug}</p>
              <h2 className="mt-2 font-display text-2xl font-semibold">{drop.itemName}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{drop.releaseName}</p>
              <div className="mt-4 rounded-[20px] bg-white/70 p-4">
                <p className="text-sm font-semibold">
                  {new Date(drop.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                </p>
                <p className="mt-2 text-sm text-muted-foreground">{drop.note}</p>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">Hype {hypeScore}</span>
                <SparkleButton variant={reminders.includes(drop.id) ? "secondary" : "default"} onClick={() => toggle(drop.id)}>
                  {reminders.includes(drop.id) ? "Reminder set" : "Remind me"}
                </SparkleButton>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}

function FilterPill({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      className={`rounded-full px-4 py-2 text-sm font-semibold ${active ? "bg-primary text-primary-foreground" : "bg-white/75"}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
}
