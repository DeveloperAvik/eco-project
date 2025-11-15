export default function GlassCard({ children, className = "" }) {
  return (
    <div
      className={`
        relative
        rounded-2xl
        p-5 sm:p-6
        border border-green-300/25
        bg-white/5
        backdrop-blur-xl

        /* Glow + depth */
        shadow-[0_0_18px_rgba(0,255,156,0.15)]
        hover:shadow-[0_0_30px_rgba(0,255,156,0.5)]
        hover:-translate-y-1

        /* Glow border animation */
        before:absolute
        before:inset-0
        before:rounded-2xl
        before:bg-gradient-to-br before:from-green-400/20 before:to-transparent
        before:pointer-events-none

        transition-all duration-300 ease-out
        ${className}
      `}
    >
      {children}
    </div>
  );
}
