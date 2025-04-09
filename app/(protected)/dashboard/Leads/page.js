"use client";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";

export default function Leads() {
  const { data, error } = useSWR("/api/leads", fetcher, { refreshInterval: 5000 });

  // Handle error state
  if (error) {
    return (
      <div className="text-red-500">
        Error loading leads: {error.message || "Unknown error"}
      </div>
    );
  }

  // Handle loading state
  if (!data) {
    return <div className="text-gray-500">Loading leads...</div>;
  }

  // Check if data.leads exists and is an array
  if (!data.leads || !Array.isArray(data.leads)) {
    return (
      <div className="text-yellow-500">
        No leads available or invalid data format: {JSON.stringify(data)}
      </div>
    );
  }

  // Render leads if data.leads is valid
  return (
    <div className="card">
      <h2 className="text-2xl font-bold mb-4 text-primary">AI-Driven Lead Scoring</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {data.leads.map((lead) => (
          <div
            key={lead.id}
            className="p-4 bg-gray-50 rounded-lg shadow hover:shadow-md transition"
          >
            <p className="font-semibold text-lg">{lead.name}</p>
            <p className="text-sm text-gray-600">{lead.company}</p>
            <p className="text-sm text-secondary font-medium">
              Score: {lead.score.toFixed(2)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}