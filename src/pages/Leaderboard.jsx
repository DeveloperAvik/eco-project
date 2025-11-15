import { useEffect, useState } from "react";
import api from "../../api";
import GlassCard from "../components/GlassCard";
import LeaderboardRow from "../components/LeaderboardRow";

export default function Leaderboard() {
  const [rows, setRows] = useState(null);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const res = await api.get("/leaderboard");
    setRows(res.data);
  }

  return (
    <div className="max-w-4xl mx-auto p-6 animate-fadeIn space-y-8">

      {/* Header Section */}
      <div>
        <h1 className="text-3xl sm:text-4xl font-bold text-neon drop-shadow-[0_0_12px_#00ff9c]">
          🌍 EcoPulse Leaderboard
        </h1>

        <div className="w-32 h-1 bg-neon rounded-full mt-2 animate-pulse"></div>

        <p className="text-gray-300 mt-3 text-sm sm:text-base leading-relaxed">
          See who is leading the carbon-aware future. Rankings are based on 
          total XP earned across all completed challenges and activities.
        </p>
      </div>

      {/* Leaderboard Container */}
      <GlassCard className="p-6 sm:p-8">

        {/* Loading */}
        {!rows && (
          <p className="text-gray-400 text-sm animate-pulse">
            Loading leaderboard...
          </p>
        )}

        {/* Empty */}
        {rows && rows.length === 0 && (
          <p className="text-gray-400 text-sm">
            No leaderboard data yet — start completing eco challenges!
          </p>
        )}

        {/* Data */}
        {rows && rows.length > 0 && (
          <div className="mt-4 space-y-3">
            {rows.map((user, idx) => (
              <LeaderboardRow
                key={user.userId}
                rank={idx + 1}
                user={user}
              />
            ))}
          </div>
        )}
      </GlassCard>
    </div>
  );
}
