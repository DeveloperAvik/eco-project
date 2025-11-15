export default function SkeletonCard() {
  return (
    <div
      className="
        glass-holo 
        rounded-xl 
        p-4 sm:p-5 
        border border-green-400/20 
        backdrop-blur-xl 
        shadow-[0_0_20px_rgba(0,255,156,0.15)]
        animate-fadeIn
      "
    >
      <div className="animate-pulse space-y-4">

        {/* Image Placeholder */}
        <div className="
          h-32 sm:h-40 
          bg-white/10 
          rounded-lg 
          shadow-inner
        "></div>

        {/* Title Placeholder */}
        <div className="h-4 bg-white/10 rounded w-3/4"></div>

        {/* Subtitle Placeholder */}
        <div className="h-3 bg-white/10 rounded w-1/2"></div>
      </div>
    </div>
  );
}
