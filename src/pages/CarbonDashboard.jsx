import { useEffect, useState } from "react";
import api from "../../api";
import GlassCard from "../components/GlassCard";
import AICarbonPredictor from "../components/AICarbonPredictor";
import GlobeVisualizer from "../components/GlobeVisualizer";
import CarbonSaver from "../components/CarbonSaver";
import Badges from "../components/Badges";

import {
  PieChart,
  Pie,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const COLORS = ['#00FF8C', '#22C55E', '#84CC16', '#DCF836', '#FACC15', '#FB923C', '#F87171'];

export default function CarbonDashboard() {
  const [today, setToday] = useState(0);
  const [categoryStats, setCategoryStats] = useState([]);
  const [averageCarbon, setAverageCarbon] = useState(0);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const t = await api.get("/carbon/today");
    setToday(t.data.total);

    const userChallenges = await api.get("/user-challenges");
    const challenges = await api.get("/challenges");

    const categoryCounts = userChallenges.data.reduce((acc, uc) => {
      const challenge = challenges.data.find(c => c._id === uc.challengeId);
      if (challenge) {
        acc[challenge.category] = (acc[challenge.category] || 0) + 1;
      }
      return acc;
    }, {});

    const categoryData = Object.keys(categoryCounts).map(key => ({
      name: key,
      value: categoryCounts[key]
    }));

    setCategoryStats(categoryData);

    const avg = await api.get("/carbon/average");
    setAverageCarbon(avg.data.average);
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-12 relative">

      {/* Particle Background */}
      <div className="particle-bg pointer-events-none"></div>

      {/* Today's Output */}
      <GlassCard className="p-6 sm:p-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-neon mb-3">
          Today's Carbon Output
        </h2>

        <p className="text-4xl sm:text-5xl text-green-400 drop-shadow-[0_0_12px_#00ff9c] font-semibold">
          {today} g CO₂
        </p>

        <p className="mt-3 text-xs sm:text-sm text-gray-300">
          Estimated digital carbon emission for today.
        </p>
      </GlassCard>

      {/* Carbon Saver + Badges */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <CarbonSaver today={today} average={averageCarbon} />
        <Badges total={today} />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Responsive PieChart */}
        <GlassCard>
          <h3 className="text-lg sm:text-xl text-neon mb-3">
            Category Breakdown
          </h3>

          <div className="w-full h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryStats}
                  dataKey="value"
                  nameKey="name"
                  label
                  isAnimationActive
                  animationBegin={200}
                  animationDuration={1500}
                  outerRadius="70%"
                  stroke="#00ff9c"
                  strokeWidth={2}
                >
                  {
                    categoryStats.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
                  }
                </Pie>
                  <Tooltip
                    contentStyle={{
                      background: "rgba(0, 0, 0, 0.2)", 
                      backdropFilter: "blur(6px)",
                      border: "1px solid #00ff9c",
                      color: "#000", 
                    }}
                  />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

      </div>

      {/* AI Predictor + 3D Globe */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AICarbonPredictor />
        <GlobeVisualizer />
      </div>

    </div>
  );
}
