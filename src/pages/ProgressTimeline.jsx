import { useEffect, useState } from "react";
import api from "../../api";

export default function ProgressTimeline() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    try {
      const res = await api.get("/carbon/logs");
      setLogs(res.data);
    } catch (err) {
      console.error("Failed to load timeline", err);
    }
  }

  function getDisplayName(log) {
    if (log.userEmail) {
      return log.userEmail.split("@")[0]; // part before @
    }
    if (log.userId) {
      return log.userId.slice(0, 8); // fallback to uid prefix
    }
    return "Someone";
  }

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold text-neon mb-2">
        🌐 Community Timeline
      </h1>
      <p className="text-gray-300 text-sm mb-4">
        Live feed of eco activity from everyone on EcoPulse.
      </p>

      <div className="relative border-l border-green-300/40 pl-6 space-y-10">
        {logs.map((log, i) => {
          const user = getDisplayName(log);
          const date = new Date(log.createdAt);

          return (
            <div
              key={log._id || i}
              className="relative animate-fadeIn"
              style={{ animationDelay: `${i * 0.06}s` }}
            >
              <div className="absolute -left-3 w-4 h-4 bg-green-400 rounded-full shadow-[0_0_10px_#22c55e]" />

              <h3 className="text-green-300 font-semibold">
                {user} • {log.category}
              </h3>

              <p className="text-gray-300 text-sm mt-1">
                {log.amount} g CO₂ emitted
              </p>

              <p className="text-gray-400 text-xs mt-1">
                {date.toLocaleString()}
              </p>
            </div>
          );
        })}

        {logs.length === 0 && (
          <p className="text-gray-400 text-sm">
            No activity yet. Start logging your carbon to see the feed!
          </p>
        )}
      </div>
    </div>
  );
}
