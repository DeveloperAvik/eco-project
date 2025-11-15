import { useEffect, useState } from "react";
import GlassCard from "./GlassCard";

export default function Badges({ total }) {
  const [currentBadge, setCurrentBadge] = useState(null);

  const badges = [
    { name: "Eco Newbie", limit: 0, icon: "🌱" },
    { name: "Carbon Cutter", limit: 200, icon: "⚡" },
    { name: "Planet Guardian", limit: 500, icon: "🌍" },
    { name: "Zero Hero", limit: 800, icon: "💠" },
  ];

  useEffect(() => {
    // Determine the highest badge unlocked
    const unlockedBadges = badges.filter((b) => total <= b.limit || b.limit === 0);
    if (unlockedBadges.length > 0) {
      // Find the badge with the highest limit (most challenging unlocked)
      const highestUnlockedBadge = unlockedBadges.reduce((prev, current) => {
        return (prev.limit > current.limit) ? prev : current;
      });
      setCurrentBadge(highestUnlockedBadge);
    } else {
      setCurrentBadge(null);
    }
  }, [total]);

  return (
    <GlassCard className="p-4 sm:p-6 md:p-8">
      <h3 className="text-lg sm:text-xl md:text-2xl text-neon mb-2">
        🏅 Achievements
      </h3>

      {currentBadge && (
        <div className="text-center mb-6">
          <p className="text-sm text-gray-300">Your Current Badge:</p>
          <div className="text-5xl my-2 animate-bounce">{currentBadge.icon}</div>
          <p className="text-xl font-bold text-green-300">{currentBadge.name}</p>
        </div>
      )}

      <p className="text-[11px] sm:text-xs text-gray-400 mb-4 leading-relaxed">
        Badges unlock as your daily carbon stays under key thresholds.
      </p>

      <div className="
        grid 
        grid-cols-2 
        sm:grid-cols-3 
        md:grid-cols-4 
        gap-3 
        sm:gap-4
      ">
        {badges.map((b, i) => {
          const unlocked = total <= b.limit || b.limit === 0;
          return (
            <div
              key={i}
              className={`
                p-3 sm:p-4 rounded-lg text-center border
                transition-all duration-300 select-none
                ${
                  unlocked
                    ? "border-green-400/60 bg-green-500/15 text-green-200 shadow-[0_0_12px_rgba(34,197,94,0.6)]"
                    : "border-gray-600/60 bg-black/30 text-gray-500 opacity-50"
                }
              `}
            >
              <div className="text-2xl sm:text-3xl mb-1">{b.icon}</div>

              <p className="text-xs sm:text-sm font-semibold">{b.name}</p>

              <p className="
                text-[10px] 
                sm:text-[11px] 
                text-gray-400 
                mt-1
              ">
                {unlocked ? "Unlocked" : "Keep optimizing to unlock"}
              </p>
            </div>
          );
        })}
      </div>
    </GlassCard>
  );
}
