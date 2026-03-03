"use client";

import { useEffect, useMemo, useState } from "react";
import type { UpcomingDrop } from "@/lib/mock-drops";

export function DropCalendarClient({ drops }: { drops: UpcomingDrop[] }) {
  const [month, setMonth] = useState("all");
  const [universe, setUniverse] = useState("all");
  const [reminders, setReminders] = useState<string[]>([]);

  useEffect(() => {
    const saved = JSON.parse(window.localStorage.getItem("vaultview-reminders") ?? "[]") as string[];
    setReminders(saved);
  }, []);

  const toggle = (id: string) => {
    const next = reminders.includes(id) ? reminders.filter((entry) => entry !== id) : [...reminders, id];
    setReminders(next);
    window.localStorage.setItem("vaultview-reminders", JSON.stringify(next));
  };

  const months = [...new Set(drops.map((drop) => drop.date.slice(0, 7)))];
  const universes = [...new Set(drops.map((drop) => drop.universeSlug))];
  const filtered = useMemo(
    () =>
      drops.filter(
        (drop) => (month === "all" || drop.date.startsWith(month)) && (universe === "all" || drop.universeSlug === universe)
      ),
    [drops, month, universe]
  );

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          className={`rounded-full px-4 py-2 text-sm ${month === "all" ? "bg-primary text-primary-foreground" : "bg-card/80"}`}
          onClick={() => setMonth("all")}
        >
          All months
        </button>
        {months.map((value) => (
          <button
            key={value}
            type="button"
            className={`rounded-full px-4 py-2 text-sm ${
              month === value ? "bg-primary text-primary-foreground" : "bg-card/80"
            }`}
            onClick={() => setMonth(value)}
          >
            {new Date(`${value}-01`).toLocaleDateString("en-US", { month: "long", year: "numeric" })}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          className={`rounded-full px-4 py-2 text-sm ${universe === "all" ? "bg-primary text-primary-foreground" : "bg-card/80"}`}
          onClick={() => setUniverse("all")}
        >
          All universes
        </button>
        {universes.map((value) => (
          <button
            key={value}
            type="button"
            className={`rounded-full px-4 py-2 text-sm ${
              universe === value ? "bg-primary text-primary-foreground" : "bg-card/80"
            }`}
            onClick={() => setUniverse(value)}
          >
            {value}
          </button>
        ))}
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((drop) => (
          <article key={drop.id} className="rounded-[28px] border border-border bg-card/80 p-5 shadow-vault">
            <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">{drop.universeSlug}</p>
            <h2 className="mt-2 font-display text-2xl font-semibold">{drop.itemName}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{drop.releaseName}</p>
            <p className="mt-4 text-sm">{new Date(drop.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</p>
            <p className="mt-2 text-sm text-muted-foreground">{drop.note}</p>
            <button
              type="button"
              className={`mt-5 rounded-full px-4 py-2 text-sm font-medium ${
                reminders.includes(drop.id) ? "bg-primary text-primary-foreground" : "bg-muted"
              }`}
              onClick={() => toggle(drop.id)}
            >
              {reminders.includes(drop.id) ? "Reminder set" : "Remind me"}
            </button>
          </article>
        ))}
      </div>
    </div>
  );
}
