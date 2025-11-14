import { useEffect, useState } from "react";
import api from "../../api";

export default function ProgressTimeline() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const res = await api.get("/carbon/logs");
    setLogs(res.data);
  }

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold text-neon mb-4">📅 Progress Timeline</h1>

      <div className="relative border-l border-green-300/40 pl-6 space-y-10">
        {logs.map((log, i) => (
          <div
            key={i}
            className="relative animate-fadeIn"
            style={{ animationDelay: `${i * 0.2}s` }}
          >
            <div className="absolute -left-3 w-4 h-4 bg-green-400 rounded-full shadow-[0_0_10px_#22c55e]"></div>
            <h3 className="text-green-300 font-semibold">{log.category}</h3>
            <p className="text-gray-300 text-sm mt-1">{log.value} g emitted</p>
            <p className="text-gray-400 text-xs mt-1">
              {new Date(log.createdAt).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
