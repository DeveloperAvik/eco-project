import { useEffect, useState } from "react";
import GlassCard from "./GlassCard";

export default function CarbonSaver({ today, average }) {
  const [saved, setSaved] = useState(0);

  useEffect(() => {
    const target = Math.max(0, average - today);
    let current = 0;

    const interval = setInterval(() => {
      current += 1;
      setSaved(current);
      if (current >= target) clearInterval(interval);
    }, 12);

    return () => clearInterval(interval);
  }, [today, average]);

  return (
    <GlassCard className="p-4 sm:p-6 md:p-8">
      <h3 className="text-lg sm:text-xl md:text-2xl text-neon mb-1 sm:mb-2">
        🌿 Carbon Savings
      </h3>

      <p className="
        text-3xl 
        sm:text-4xl 
        md:text-5xl 
        font-bold 
        text-green-300 
        drop-shadow-[0_0_10px_#22c55e]
      ">
        {saved} g CO₂
      </p>

      <p className="
        text-[11px] 
        sm:text-sm 
        text-gray-300 
        mt-1 
        sm:mt-2 
        leading-relaxed
      ">
        Approximate CO₂ saved today compared to your average daily output.
      </p>
    </GlassCard>
  );
}
