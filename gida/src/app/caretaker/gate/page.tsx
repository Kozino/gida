"use client";

import { useState } from "react";
import { PageTitle, EmptyState, SectionCard } from "@/components/DashShell";
import { ScrollText, UserCheck } from "lucide-react";

export default function Gate() {
  const [log, setLog] = useState<{ who: string; at: string }[]>([]);
  const [who, setWho] = useState("");

  function checkIn() {
    if (!who) return;
    setLog((l) => [{ who, at: new Date().toLocaleString() }, ...l]);
    setWho("");
  }

  return (
    <div className="max-w-2xl">
      <PageTitle kicker="Security" title="Gate log" subtitle="Track visitors in and out — kept for this session." />
      <SectionCard>
        <form
          className="flex gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            checkIn();
          }}
        >
          <input className="input" placeholder="Visitor name" value={who} onChange={(e) => setWho(e.target.value)} />
          <button className="btn-primary shrink-0">
            <UserCheck size={15} /> Check in
          </button>
        </form>
      </SectionCard>

      <SectionCard title="Today's log" className="mt-6" padded={log.length === 0}>
        {log.length === 0 ? (
          <EmptyState icon={ScrollText} title="No visitors logged yet" />
        ) : (
          <div className="divide-y divide-teal-900/5">
            {log.map((x, i) => (
              <div key={i} className="list-row">
                <p className="text-sm font-medium text-teal-950">{x.who}</p>
                <p className="text-xs text-teal-800/70">{x.at}</p>
              </div>
            ))}
          </div>
        )}
      </SectionCard>
    </div>
  );
}
