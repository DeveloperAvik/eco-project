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
    <div className="max-w-6xl mx-auto p-6 space-y-10">

      {/* Particle Background */}
      <div className="particle-bg"></div>

      {/* Today's Output */}
      <GlassCard>
        <h2 className="text-3xl font-bold text-neon">Today's Carbon Output</h2>

        <p className="mt-4 text-5xl text-green-400 drop-shadow-[0_0_10px_#00ff9c]">
          {today} g CO₂
        </p>

        <p className="mt-2 text-sm text-gray-300">
          Estimated total carbon emitted today from your digital activity.
        </p>
      </GlassCard>

      {/* Carbon Savings + Badges */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <CarbonSaver today={today} />
        <Badges total={today} />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Animated PieChart */}
        <GlassCard>
          <h3 className="text-xl text-neon mb-3">Category Breakdown</h3>
          <PieChart width={350} height={300}>
            <Pie
              data={stats}
              dataKey="value"
              nameKey="name"
              fill="#00ff9c"
              label
              isAnimationActive={true}
              animationBegin={200}
              animationDuration={1500}
              outerRadius={110}
              stroke="#00ff9c"
              strokeWidth={2}
            />
            <Tooltip
              contentStyle={{
                background: "rgba(10, 15, 31, 0.8)",
                backdropFilter: "blur(6px)",
                border: "1px solid #00ff9c",
                color: "#f9fafb",
                boxShadow: "0 0 12px #00ff9c",
              }}
            />
          </PieChart>
        </GlassCard>

        {/* Animated LineChart */}
        <GlassCard>
          <h3 className="text-xl text-neon mb-3">Weekly Trend</h3>
          <LineChart width={350} height={300} data={stats}>
            <Line
              type="monotone"
              dataKey="value"
              stroke="#00ff9c"
              strokeWidth={3}
              isAnimationActive={true}
              animationDuration={1600}
              dot={{ r: 6, fill: "#00ff9c", stroke: "#00ff9c" }}
              activeDot={{ r: 10, strokeWidth: 2, stroke: "#00ffaa" }}
            />
            <CartesianGrid stroke="#1f2937" opacity={0.3} />
            <XAxis dataKey="name" stroke="#d1d5db" />
            <YAxis stroke="#d1d5db" />
            <Tooltip
              contentStyle={{
                background: "rgba(10, 15, 31, 0.8)",
                border: "1px solid #00ff9c",
                boxShadow: "0 0 12px #00ff9c",
              }}
            />
          </LineChart>
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
