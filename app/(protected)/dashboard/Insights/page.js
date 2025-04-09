"use client";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";

export default function Insights() {
  const { data, error } = useSWR("/api/insights", fetcher, { refreshInterval: 5000 });

  if (error) return <div className="text-red-500">Error loading insights</div>;
  if (!data) return <div className="text-gray-500">Loading...</div>;

  return (
    <div className="card">
      <h2 className="text-2xl font-bold mb-4 text-primary">Sales Insights</h2>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="p-4 bg-gray-50 rounded-lg shadow">
          <p className="font-semibold">Total Leads: {data.totalLeads}</p>
          <p className="text-sm text-gray-600">Active Campaigns: {data.activeCampaigns}</p>
          <p className="text-sm text-secondary">Predicted Revenue: ${data.predictedRevenue}</p>
        </div>
      </div>
    </div>
  );
}