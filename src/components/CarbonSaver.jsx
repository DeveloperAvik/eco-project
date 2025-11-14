import { useEffect, useState } from "react";
import GlassCard from "./GlassCard";

export default function CarbonSaver({ today }) {
  const [saved, setSaved] = useState(0);

  useEffect(() => {
    // Simple "savings" model compared to some hypothetical 200 g baseline
    const baseline = 200;
    const target = Math.max(0, baseline - today);
    let current = 0;

    const interval = setInterval(() => {
      current += 1;
      setSaved(current);
      if (current >= target) clearInterval(interval);
    }, 12);

    return () => clearInterval(interval);
  }, [today]);

  return (
    <GlassCard>
      <h3 className="text-xl text-neon mb-2">🌿 Carbon Savings</h3>
      <p className="text-4xl font-bold text-green-300 drop-shadow-[0_0_10px_#22c55e]">
        {saved} g CO₂
      </p>
      <p className="text-gray-300 text-sm mt-1">
        Approximate CO₂ saved today compared to an average baseline user.
      </p>
    </GlassCard>
  );
}
