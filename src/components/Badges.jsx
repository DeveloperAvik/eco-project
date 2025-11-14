import GlassCard from "./GlassCard";

export default function Badges({ total }) {
  const badges = [
    { name: "Eco Newbie", limit: 0, icon: "🌱" },
    { name: "Carbon Cutter", limit: 200, icon: "⚡" },
    { name: "Planet Guardian", limit: 500, icon: "🌍" },
    { name: "Zero Hero", limit: 800, icon: "💠" },
  ];

  return (
    <GlassCard>
      <h3 className="text-xl text-neon mb-3">🏅 Achievements</h3>
      <p className="text-xs text-gray-400 mb-3">
        Badges unlock as your daily carbon stays under key thresholds.
      </p>

      <div className="grid grid-cols-2 gap-4">
        {badges.map((b, i) => {
          const unlocked = total <= b.limit || b.limit === 0;
          return (
            <div
              key={i}
              className={`
                p-3 rounded-lg text-center border
                transition-all duration-300
                ${
                  unlocked
                    ? "border-green-400/60 bg-green-500/15 text-green-200 shadow-[0_0_12px_rgba(34,197,94,0.6)]"
                    : "border-gray-600/60 bg-black/30 text-gray-500 opacity-50"
                }
              `}
            >
              <div className="text-3xl mb-1">{b.icon}</div>
              <p className="text-sm font-semibold">{b.name}</p>
              <p className="text-[11px] text-gray-400 mt-1">
                {unlocked ? "Unlocked" : `Keep optimizing to unlock`}
              </p>
            </div>
          );
        })}
      </div>
    </GlassCard>
  );
}
