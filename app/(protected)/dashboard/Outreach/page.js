"use client";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";

export default function Outreach() {
  const { data, error } = useSWR("/api/outreach", fetcher, { refreshInterval: 5000 });

  if (error) return <div className="text-red-500">Error loading outreach</div>;
  if (!data) return <div className="text-gray-500">Loading...</div>;

  return (
    <div className="card">
      <h2 className="text-2xl font-bold mb-4 text-primary">Autonomous Outreach</h2>
      <div className="space-y-4">
        {data.outreach.map((item) => (
          <div key={item.id} className="p-4 bg-gray-50 rounded-lg shadow flex justify-between">
            <div>
              <p className="font-semibold">{item.channel}</p>
              <p className="text-sm text-gray-600">{item.message}</p>
            </div>
            <p className="text-sm text-secondary">{item.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
}