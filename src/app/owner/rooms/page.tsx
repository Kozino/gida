"use client";

import { FormEvent, useState } from "react";
import { useAuth } from "@/lib/AuthContext";
import { uid } from "@/lib/ids";

export default function RoomsPage() {
  const { store, org, patch } = useAuth();
  const props = store.properties.filter((p) => p.orgId === org?.id);
  const rooms = store.rooms.filter((r) => r.orgId === org?.id);
  const [propertyId, setPropertyId] = useState(props[0]?.id || "");
  const [name, setName] = useState("");
  const [block, setBlock] = useState("A");
  const [beds, setBeds] = useState("1");
  const [amenities, setAmenities] = useState("Wardrobe");

  if (!org) return null;

  function add(e: FormEvent) {
    e.preventDefault();
    if (!org || !propertyId) return;
    patch((s) => {
      s.rooms.push({
        id: uid("rm"),
        propertyId,
        orgId: org.id,
        name,
        block,
        beds: Number(beds) || 1,
        occupiedBeds: 0,
        rent: null,
        amenities: amenities.split(",").map((x) => x.trim()).filter(Boolean),
        available: true,
      });
    });
    setName("");
  }

  return (
    <div>
      <h1 className="font-display text-3xl">Rooms & bedspaces</h1>
      <form onSubmit={add} className="card mt-6 grid gap-3 p-6 md:grid-cols-2">
        <select className="input" value={propertyId} onChange={(e) => setPropertyId(e.target.value)}>
          {props.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>
        <input className="input" placeholder="Room name" value={name} onChange={(e) => setName(e.target.value)} required />
        <input className="input" placeholder="Block" value={block} onChange={(e) => setBlock(e.target.value)} />
        <input className="input" placeholder="Beds" value={beds} onChange={(e) => setBeds(e.target.value)} />
        <input className="input md:col-span-2" placeholder="Amenities (comma)" value={amenities} onChange={(e) => setAmenities(e.target.value)} />
        <button className="btn-primary md:col-span-2">Add room</button>
      </form>
      <div className="mt-6 overflow-x-auto card">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b text-ink-600">
              <th className="p-3">Room</th>
              <th>Beds</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {rooms.map((r) => (
              <tr key={r.id} className="border-b border-ink-900/5">
                <td className="p-3">
                  {r.block} {r.name}
                </td>
                <td>
                  {r.occupiedBeds}/{r.beds}
                </td>
                <td>{r.available ? "Open" : "Full"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
