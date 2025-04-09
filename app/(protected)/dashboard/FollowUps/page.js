"use client";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";

export default function FollowUps() {
  const { data, error } = useSWR("/api/followups", fetcher, { refreshInterval: 5000 });

  if (error) return <div className="text-red-500">Error loading follow-ups</div>;
  if (!data) return <div className="text-gray-500">Loading...</div>;

  return (
    <div className="card">
      <h2 className="text-2xl font-bold mb-4 text-primary">Smart Follow-Ups</h2>
      <div className="space-y-4">
        {data.followups.map((item) => (
          <div key={item.id} className="p-4 bg-gray-50 rounded-lg shadow">
            <p className="font-semibold">{item.message}</p>
            <p className="text-sm text-gray-600">
              Sent: {new Date(item.sentAt).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}