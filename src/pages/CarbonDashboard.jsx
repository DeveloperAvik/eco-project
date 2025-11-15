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
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";

export default function CarbonDashboard() {
  const [today, setToday] = useState(0);
  const [stats, setStats] = useState([]);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const t = await api.get("/carbon/today");
    setToday(t.data.total);

    const s = await api.get("/carbon/stats");
    setStats(s.data.map((x) => ({ name: x._id, value: x.total })));
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
        <CarbonSaver today={today} />
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
                  data={stats}
                  dataKey="value"
                  nameKey="name"
                  fill="#00ff9c"
                  label
                  isAnimationActive
                  animationBegin={200}
                  animationDuration={1500}
                  outerRadius="70%"
                  stroke="#00ff9c"
                  strokeWidth={2}
                />
                <Tooltip
                  contentStyle={{
                    background: "rgba(10, 15, 31, 0.85)",
                    backdropFilter: "blur(6px)",
                    border: "1px solid #00ff9c",
                    color: "#fff",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        {/* Responsive LineChart */}
        <GlassCard>
          <h3 className="text-lg sm:text-xl text-neon mb-3">
            Weekly Trend
          </h3>

          <div className="w-full h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={stats}>
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#00ff9c"
                  strokeWidth={3}
                  isAnimationActive
                  animationDuration={1600}
                  dot={{ r: 6, fill: "#00ff9c", stroke: "#00ff9c" }}
                  activeDot={{ r: 10, strokeWidth: 2, stroke: "#00ffaa" }}
                />
                <CartesianGrid stroke="#1f2937" opacity={0.3} />
                <XAxis dataKey="name" stroke="#e5e7eb" />
                <YAxis stroke="#e5e7eb" />
                <Tooltip
                  contentStyle={{
                    background: "rgba(10, 15, 31, 0.85)",
                    border: "1px solid #00ff9c",
                    color: "#fff",
                  }}
                />
              </LineChart>
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
