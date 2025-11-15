export default function LevelUpModal({ onClose }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-xl z-50 animate-fadeIn">
      
      {/* Floating Glow Behind Card */}
      <div className="absolute w-80 h-80 bg-green-400/20 blur-3xl rounded-full"></div>

      <div
        className="
          relative z-10
          p-6 sm:p-10 
          rounded-2xl 
          bg-white/10 
          backdrop-blur-2xl 
          border border-green-400/40
          shadow-[0_0_40px_rgba(0,255,156,0.5)]
          animate-levelUpScale
          text-center
        "
      >
        {/* Top Shine Gradient */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/10 to-transparent pointer-events-none"></div>

        <h2 className="text-3xl sm:text-4xl font-bold text-green-300 drop-shadow-[0_0_15px_#00ff9c] mb-3">
          LEVEL UP! 🔥
        </h2>

        <p className="text-gray-300 text-sm sm:text-base mb-6">
          You've reached a new eco level.
        </p>

        <button
          onClick={onClose}
          className="
            px-6 py-2 sm:px-8 sm:py-3
            bg-neon text-black rounded-xl 
            font-semibold
            shadow-[0_0_20px_#00ff9c] 
            hover:shadow-[0_0_30px_#00ff9c]
            hover:bg-green-300 
            transition-all
          "
        >
          Continue
        </button>
      </div>

      {/* Sparkle particles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="particle"></div>
        <div className="particle delay-150"></div>
        <div className="particle delay-300"></div>
      </div>
    </div>
  );
}
