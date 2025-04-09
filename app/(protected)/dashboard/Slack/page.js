"use client";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";

export default function Slack() {
  const { data, error } = useSWR("/api/slack", fetcher, { refreshInterval: 5000 });

  if (error) return <div className="text-red-500">Error loading Slack data</div>;
  if (!data) return <div className="text-gray-500">Loading...</div>;

  return (
    <div className="card">
      <h2 className="text-2xl font-bold mb-4 text-primary">Slack Notifications</h2>
      <div className="space-y-4">
        {data.notifications.map((notification) => (
          <div key={notification.id} className="p-4 bg-gray-50 rounded-lg shadow">
            <p className="font-semibold">{notification.message}</p>
            <p className="text-sm text-gray-600">
              Sent: {new Date(notification.sentAt).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}