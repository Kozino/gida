"use client";

import { FormEvent, useState } from "react";
import { useAuth } from "@/lib/AuthContext";
import { uid } from "@/lib/ids";
import { PageTitle, Pill, EmptyState, SectionCard } from "@/components/DashShell";
import { DoorOpen } from "lucide-react";

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
      <PageTitle kicker="Inventory" title="Rooms & bedspaces" subtitle={`${rooms.length} rooms across ${props.length} propert${props.length === 1 ? "y" : "ies"}`} />

      {props.length === 0 ? (
        <EmptyState icon={DoorOpen} title="Add a property first" description="Rooms belong to a property — create one under Properties & fees before adding rooms." />
      ) : (
        <SectionCard title="Add a room">
          <form onSubmit={add} className="grid gap-3 md:grid-cols-2">
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
            <input className="input md:col-span-2" placeholder="Amenities (comma separated)" value={amenities} onChange={(e) => setAmenities(e.target.value)} />
            <button className="btn-primary md:col-span-2">Add room</button>
          </form>
        </SectionCard>
      )}

      <SectionCard title="All rooms" className="mt-6" padded={rooms.length === 0}>
        {rooms.length === 0 ? (
          <EmptyState icon={DoorOpen} title="No rooms yet" />
        ) : (
          <div className="overflow-x-auto">
            <table className="table-clean">
              <thead>
                <tr>
                  <th>Room</th>
                  <th>Beds</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {rooms.map((r) => (
                  <tr key={r.id}>
                    <td className="font-medium">
                      {r.block} {r.name}
                    </td>
                    <td>
                      {r.occupiedBeds}/{r.beds}
                    </td>
                    <td>
                      <Pill tone={r.available ? "emerald" : "slate"}>{r.available ? "Open" : "Full"}</Pill>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </SectionCard>
    </div>
  );
}
