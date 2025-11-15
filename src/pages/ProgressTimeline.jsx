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
    if (log.userEmail) return log.userEmail.split("@")[0];
    if (log.userId) return log.userId.slice(0, 8);
    return "Someone";
  }

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-8 animate-fadeIn">

      {/* Page Header */}
      <h1 className="text-3xl sm:text-4xl font-bold text-neon drop-shadow-[0_0_10px_#00ff9c]">
        🌐 Community Timeline
      </h1>

      <p className="text-gray-300 text-sm sm:text-base max-w-2xl">
        Live feed of eco activity happening right now across EcoPulse.
      </p>

      {/* Timeline */}
      <div className="relative pl-6 space-y-10">

        {/* Glowing Vertical Line */}
        <div className="absolute left-0 top-0 w-[2px] h-full bg-gradient-to-b from-green-400 via-green-300/40 to-transparent rounded-full" />

        {/* Logs */}
        {logs.map((log, i) => {
          const user = getDisplayName(log);
          const date = new Date(log.createdAt);

          return (
            <div
              key={log._id || i}
              className="
                relative p-4 rounded-xl 
                bg-white/5 backdrop-blur-lg
                border border-green-400/20
                shadow-[0_0_18px_rgba(0,255,156,0.1)]
                hover:shadow-[0_0_22px_rgba(0,255,156,0.3)]
                transition-all duration-300
                animate-fadeIn
              "
              style={{ animationDelay: `${i * 0.07}s` }}
            >
              {/* Timeline Node */}
              <div className="absolute -left-3 top-4 w-4 h-4 bg-green-400 rounded-full shadow-[0_0_10px_#22c55e]" />

              {/* Title */}
              <h3 className="text-green-300 font-semibold text-sm sm:text-base">
                {user} • {log.category}
              </h3>

              {/* Amount */}
              <p className="text-gray-300 text-sm mt-1">
                {log.amount} g CO₂ emitted
              </p>

              {/* Date */}
              <p className="text-gray-500 text-xs mt-1">
                {date.toLocaleString()}
              </p>
            </div>
          );
        })}

        {/* Empty State */}
        {logs.length === 0 && (
          <p className="text-gray-400 text-sm mt-6">
            No activity yet — once users start emitting or reducing carbon, the feed
            will appear here.
          </p>
        )}
      </div>
    </div>
  );
}
