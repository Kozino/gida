"use client";

import { useAuth } from "@/lib/AuthContext";
import { PageTitle, Pill, EmptyState, statusTone } from "@/components/DashShell";
import { Building2 } from "lucide-react";

export default function AllOrgs() {
  const { store } = useAuth();
  const orgs = store.orgs;

  return (
    <div>
      <PageTitle kicker="Directory" title="All organisations" subtitle={`${orgs.length} organisations registered on Gida`} />
      {orgs.length === 0 ? (
        <EmptyState icon={Building2} title="No organisations yet" />
      ) : (
        <div className="card overflow-x-auto">
          <table className="table-clean">
            <thead>
              <tr>
                <th>Name</th>
                <th>Location</th>
                <th>Type</th>
                <th>Status</th>
                <th>Verification</th>
                <th>Listed</th>
              </tr>
            </thead>
            <tbody>
              {orgs.map((o) => (
                <tr key={o.id}>
                  <td className="font-medium">{o.name}</td>
                  <td>
                    {o.city}, {o.state}
                  </td>
                  <td className="capitalize">{o.type}</td>
                  <td>
                    <Pill tone={statusTone(o.status)}>{o.status}</Pill>
                  </td>
                  <td>
                    <Pill tone={statusTone(o.verification)}>{o.verification.replace("_", " ")}</Pill>
                  </td>
                  <td>
                    <Pill tone={o.listed ? "emerald" : "slate"}>{o.listed ? "Listed" : "Hidden"}</Pill>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
