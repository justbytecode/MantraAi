"use client";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";

export default function Campaigns() {
  const { data, error } = useSWR("/api/campaigns", fetcher, { refreshInterval: 5000 });

  if (error) return <div className="text-red-500">Error loading campaigns</div>;
  if (!data) return <div className="text-gray-500">Loading...</div>;

  return (
    <div className="card">
      <h2 className="text-2xl font-bold mb-4 text-primary">Campaign Performance</h2>
      <div className="space-y-4">
        {data.campaigns.map((campaign) => (
          <div key={campaign.id} className="p-4 bg-gray-50 rounded-lg shadow">
            <p className="font-semibold">{campaign.name}</p>
            <p className="text-sm text-gray-600">Status: {campaign.status}</p>
            <p className="text-sm text-secondary">
              Success Rate: {campaign.metrics?.successRate || "N/A"}%
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}