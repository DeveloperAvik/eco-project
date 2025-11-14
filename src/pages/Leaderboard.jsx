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
    <div className="max-w-4xl mx-auto p-6 space-y-6">

      <h1 className="text-3xl font-bold text-neon drop-shadow-glow mb-2">
        🌍 EcoPulse Leaderboard
      </h1>
      <p className="text-gray-300 mb-4">
        See who is leading the carbon-aware future. Rankings are based on total XP
        earned across all challenges.
      </p>

      <GlassCard>
        {!rows && <p className="text-gray-400 animate-pulse">Loading leaderboard...</p>}

        {rows && rows.length === 0 && (
          <p className="text-gray-400">No leaderboard data yet. Start completing tasks!</p>
        )}

        {rows && rows.length > 0 && (
          <div className="mt-2">
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
