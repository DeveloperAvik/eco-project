export default function LeaderboardRow({ rank, user }) {
  const isTop1 = rank === 1;
  const isTop2 = rank === 2;
  const isTop3 = rank === 3;

  const medal = isTop1 ? "🥇" : isTop2 ? "🥈" : isTop3 ? "🥉" : "🏅";

  // Extract username from email
    const displayName = user.userId || user._id;

  return (
    <div
      className={`
        flex items-center justify-between px-4 py-3 rounded-xl mb-3
        bg-white/5 border border-green-400/20 backdrop-blur-md
        hover:border-green-400/60 hover:shadow-[0_0_20px_rgba(34,197,94,0.6)]
        transition-all duration-300 animate-fadeIn
      `}
      style={{ animationDelay: `${rank * 0.05}s` }}
    >
      <div className="flex items-center gap-3">
        <div className="text-2xl">{medal}</div>

        <div>
          <p className="text-sm text-gray-400">#{rank}</p>

          <p className="text-lg font-semibold text-green-300">
            {displayName}
          </p>
        </div>
      </div>

      <div className="flex gap-8 text-sm text-gray-200">
        <div className="text-right">
          <p className="font-semibold text-neon">{user.totalXP} XP</p>
          <p className="text-gray-400 text-xs">Total XP</p>
        </div>

        <div className="text-right">
          <p className="font-semibold">{user.maxStreak} 🔥</p>
          <p className="text-gray-400 text-xs">Best Streak</p>
        </div>

        <div className="text-right">
          <p className="font-semibold">{user.challengesCount}</p>
          <p className="text-gray-400 text-xs">Challenges</p>
        </div>
      </div>
    </div>
  );
}
