import { useEffect, useState } from "react";
import api from "../../api";
import GlassCard from "./GlassCard";

export default function AICarbonPredictor() {
  const [loading, setLoading] = useState(true);
  const [insight, setInsight] = useState("");

  useEffect(() => {
    load();
  }, []);

  async function load() {
    try {
      const [todayRes, statsRes, challengesRes, activitiesRes] =
        await Promise.all([
          api.get("/carbon/today"),
          api.get("/carbon/stats"),
          api.get("/challenges"),
          api.get("/user-challenges"),
        ]);

      const insightRes = await api.post("/carbon/insight", {
        today: todayRes.data,
        stats: statsRes.data,
        challenges: challengesRes.data,
        activities: activitiesRes.data,
      });

      setInsight(insightRes.data.insight);
    } catch (err) {
      console.error(err);
      setInsight("Unable to generate prediction right now.");
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <GlassCard>
        <p className="text-gray-300 animate-pulse text-sm sm:text-base">
          Calculating AI-based projection...
        </p>
      </GlassCard>
    );
  }

  return (
    <GlassCard className="p-4 sm:p-6 md:p-8">
      <h3 className="text-lg sm:text-xl md:text-2xl text-neon mb-2">
        🤖 AI Carbon Predictor
      </h3>

      <p className="text-xs sm:text-sm text-gray-300 mb-3 leading-relaxed">
        Using your recent activity to estimate your upcoming digital carbon
        footprint.
      </p>

      <p className="text-sm sm:text-base text-gray-100 leading-relaxed">
        {insight}
      </p>

      <div className="mt-4 text-xs text-gray-500">
        <span className="italic">
          *This projection is heuristic-based for demo purposes (not a trained
          ML model).{" "}
        </span>
      </div>
    </GlassCard>
  );
}
