"use client";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";

export default function Scripts() {
  const { data, error } = useSWR("/api/scripts", fetcher, { refreshInterval: 5000 });

  if (error) return <div className="text-red-500">Error loading scripts</div>;
  if (!data) return <div className="text-gray-500">Loading...</div>;

  return (
    <div className="card">
      <h2 className="text-2xl font-bold mb-4 text-primary">AI Sales Scripts</h2>
      <div className="space-y-4">
        {data.scripts.map((script) => (
          <div key={script.id} className="p-4 bg-gray-50 rounded-lg shadow">
            <p className="font-semibold">{script.lead.name}</p>
            <p className="text-sm text-gray-600">{script.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}