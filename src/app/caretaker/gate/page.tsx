"use client";

import { useState } from "react";

export default function Gate() {
  const [log, setLog] = useState<{ who: string; at: string }[]>([]);
  const [who, setWho] = useState("");
  return (
    <div>
      <h1 className="font-display text-3xl">Gate log</h1>
      <div className="mt-4 flex gap-2">
        <input className="input" placeholder="Visitor name" value={who} onChange={(e) => setWho(e.target.value)} />
        <button
          className="btn-primary"
          onClick={() => {
            if (!who) return;
            setLog((l) => [{ who, at: new Date().toLocaleString() }, ...l]);
            setWho("");
          }}
        >
          In
        </button>
      </div>
      <ul className="mt-6 space-y-2 text-sm">
        {log.map((x, i) => (
          <li key={i} className="card p-3">
            {x.who} · {x.at}
          </li>
        ))}
      </ul>
    </div>
  );
}
