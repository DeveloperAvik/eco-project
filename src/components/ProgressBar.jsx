export default function ProgressBar({ progress, xp, streak }) {
  return (
    <div className="mt-6">

      {/* Progress Label */}
      <p className="text-gray-300 text-xs sm:text-sm mb-2 tracking-wide">
        Progress: <span className="text-green-300 font-semibold">{progress}%</span>
      </p>

      {/* Outer Bar */}
      <div
        className="
          w-full 
          h-4 sm:h-5 
          bg-gray-700/30 
          rounded-full 
          overflow-hidden 
          relative
        "
      >
        {/* Glow Gradient Behind */}
        <div className="absolute inset-0 bg-gradient-to-r from-green-300/20 to-transparent" />

        {/* Animated Fill Bar */}
        <div
          className="
            h-full 
            rounded-full
            bg-gradient-to-r from-green-400 to-green-300
            shadow-[0_0_12px_#22c55e]
            transition-all duration-[1200ms] ease-out
          "
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* XP & Streak Info */}
      <div
        className="
          flex flex-col sm:flex-row 
          justify-between 
          text-gray-300 
          text-xs sm:text-sm 
          mt-3 
          gap-1 sm:gap-0
        "
      >
        <p className="font-medium">
          XP: <span className="text-green-400">{xp}</span>
        </p>

        <p className="font-medium">
          🔥 Streak: <span className="text-green-400">{streak} days</span>
        </p>
      </div>
    </div>
  );
}
