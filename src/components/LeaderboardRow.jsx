export default function LeaderboardRow({ rank, user }) {
  const isTop1 = rank === 1;
  const isTop2 = rank === 2;
  const isTop3 = rank === 3;

  const medal = isTop1 ? "🥇" : isTop2 ? "🥈" : isTop3 ? "🥉" : "🏅";

  const displayName = user.userId || user._id;

  return (
    <div
      className={`
        flex flex-col sm:flex-row sm:items-center sm:justify-between
        gap-4 sm:gap-0
        px-4 py-3 mb-3 rounded-xl
        bg-white/5 border border-green-400/20 backdrop-blur-md
        hover:border-green-400/60 
        hover:shadow-[0_0_20px_rgba(34,197,94,0.6)]
        transition-all duration-300 
        animate-fadeIn
      `}
      style={{ animationDelay: `${rank * 0.05}s` }}
    >
      {/* Left: Rank + User */}
      <div className="flex items-center gap-3">
        <div className="text-2xl sm:text-3xl">{medal}</div>

        <div>
          <p className="text-xs sm:text-sm text-gray-400">#{rank}</p>

          <p className="text-base sm:text-lg font-semibold text-green-300 truncate max-w-[150px] sm:max-w-none">
            {displayName}
          </p>
        </div>
      </div>

      {/* Right: Stats (XP, streak, challenges) */}
      <div
        className="
          flex justify-between sm:gap-10
          text-xs sm:text-sm 
          text-gray-200 
          w-full sm:w-auto
        "
      >
        <div className="text-right flex-1 sm:flex-none">
          <p className="font-semibold text-neon">{user.totalXP} XP</p>
          <p className="text-gray-400 text-[10px] sm:text-xs">Total XP</p>
        </div>

        <div className="text-right flex-1 sm:flex-none">
          <p className="font-semibold">{user.maxStreak} 🔥</p>
          <p className="text-gray-400 text-[10px] sm:text-xs">Best Streak</p>
        </div>

        <div className="text-right flex-1 sm:flex-none">
          <p className="font-semibold">{user.challengesCount}</p>
          <p className="text-gray-400 text-[10px] sm:text-xs">Challenges</p>
        </div>
      </div>
    </div>
  );
}
