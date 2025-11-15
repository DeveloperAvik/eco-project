import { useEffect, useState } from "react";
import api from "../../api";
import GlassCard from "./GlassCard";

export default function AICarbonPredictor() {
  const [today, setToday] = useState(0);
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [insight, setInsight] = useState("");

  useEffect(() => {
    load();
  }, []);

  async function load() {
    try {
      const [todayRes, statsRes] = await Promise.all([
        api.get("/carbon/today"),
        api.get("/carbon/stats"),
      ]);

      const t = todayRes.data.total || 0;
      const s = statsRes.data || [];

      setToday(t);
      setStats(s);

      const totalLast7 = s.reduce((sum, i) => sum + i.total, 0);
      const avgDaily = totalLast7 / 7 || 0;

      const projectedWeek = Math.round(avgDaily * 7);
      const projectedMonth = Math.round(avgDaily * 30);

      const trend =
        t > avgDaily * 1.2
          ? "up"
          : t < avgDaily * 0.8
          ? "down"
          : "stable";

      let text = "";

      if (trend === "up") {
        text = `Your carbon output today is higher than your weekly average. If this pattern continues, your next 30 days could emit around ${projectedMonth} g CO₂. Try reducing streaming time or running fewer high-power tasks.`;
      } else if (trend === "down") {
        text = `Nice! Today you're emitting less than your weekly average. At this pace, your next 30 days might stay near ${projectedMonth} g CO₂ — keep going with more low-energy habits.`;
      } else {
        text = `Your carbon pattern is relatively stable. Based on recent activity, the next 7 days are projected near ${projectedWeek} g CO₂, and the next 30 days near ${projectedMonth} g CO₂. Small optimizations can still unlock big savings.`;
      }

      setInsight(text);
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
        Using your recent activity to estimate your upcoming digital carbon footprint.
      </p>

      <p className="text-sm sm:text-base text-gray-100 leading-relaxed">
        {insight}
      </p>

      <div className="mt-4">
        <span className="text-[10px] sm:text-xs text-gray-500 italic block">
          *This projection is heuristic-based for demo purposes (not a trained ML model).
        </span>
      </div>
    </GlassCard>
  );
}
