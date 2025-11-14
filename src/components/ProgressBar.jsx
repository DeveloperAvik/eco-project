export default function ProgressBar({ progress, xp, streak }) {
  return (
    <div className="mt-6">
      <p className="text-gray-300 text-sm mb-2">
        Progress: {progress}%
      </p>

      <div className="w-full h-4 bg-gray-700/30 rounded-full overflow-hidden">
        <div
          className="h-4 bg-green-400 shadow-[0_0_10px_#22c55e] transition-all duration-[1200ms]"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="flex justify-between text-gray-300 text-sm mt-3">
        <p>XP: {xp}</p>
        <p>🔥 Streak: {streak} days</p>
      </div>
    </div>
  );
}
