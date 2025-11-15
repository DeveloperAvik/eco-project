export default function TipCard({ t }) {
  return (
    <div
      className="
        glass-holo 
        rounded-xl 
        p-4 sm:p-5 
        border border-green-400/20 
        backdrop-blur-xl 
        shadow-[0_0_20px_rgba(0,255,156,0.15)]
        hover:shadow-[0_0_30px_rgba(0,255,156,0.35)]
        hover:border-green-400/40
        transition-all duration-300 
        animate-fadeIn
        relative overflow-hidden
      "
    >
      {/* Subtle shine overlay */}
      <div className="absolute inset-0 opacity-0 hover:opacity-20 bg-gradient-to-br from-white/10 to-transparent pointer-events-none transition-all duration-500"></div>

      <h4 className="font-semibold text-green-300 text-base sm:text-lg">
        {t.title}
      </h4>

      <p className="text-[10px] sm:text-xs text-gray-400 mt-0.5">
        by {t.authorName || t.author}
      </p>

      <p className="mt-2 text-gray-300 text-xs sm:text-sm leading-relaxed">
        {t.content?.length > 100 
          ? t.content.slice(0, 100) + "..."
          : t.content}
      </p>
    </div>
  );
}
