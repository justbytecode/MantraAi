"use client";
import { signIn } from "next-auth/react";

export default function IntegrationPopup({ feature, onClose }) {
  const platforms = {
    gemini: { name: "Gemini AI", provider: null }, // No OAuth; manual integration
    slack: { name: "Slack", provider: "slack" },
    zapier: { name: "Zapier", provider: "zapier" }, // Assuming Zapier OAuth
  };

  const handleIntegrate = (provider) => {
    if (provider) {
      signIn(provider, { callbackUrl: `/dashboard?integrated=${feature.requires}` });
    } else {
      // For Gemini AI, store integration status
      fetch("/api/integrations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "gemini", config: { enabled: true } }),
      }).then(() => onClose());
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="card w-full max-w-md bg-white rounded-xl shadow-2xl p-6">
        <h2 className="text-2xl font-bold mb-4 text-primary">
          Integrate {feature.requires.toUpperCase()}
        </h2>
        <p className="mb-4 text-gray-600">
          Connect {feature.requires} to unlock the {feature.name} feature.
        </p>
        <div className="space-y-4">
          {Object.entries(platforms)
            .filter(([key]) => key === feature.requires)
            .map(([key, { name, provider }]) => (
              <button
                key={key}
                onClick={() => handleIntegrate(provider)}
                className="btn bg-primary text-white hover:bg-blue-700 w-full flex items-center justify-center space-x-2"
              >
                <span>{name}</span>
                {provider && <span className="text-xs">(OAuth)</span>}
              </button>
            ))}
        </div>
        <button
          onClick={onClose}
          className="btn bg-gray-300 hover:bg-gray-400 text-gray-800 w-full mt-4"
        >
          Later
        </button>
      </div>
    </div>
  );
}