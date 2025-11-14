export default function GlassCard({ children, className = "" }) {
  return (
    <div
      className={`
        glass-holo 
        rounded-xl 
        p-5 
        border border-green-400/30 
        shadow-[0_0_20px_rgba(0,255,156,0.25)] 
        hover:shadow-[0_0_28px_rgba(0,255,156,0.5)]
        transition-all duration-300
        ${className}
      `}
    >
      {children}
    </div>
  );
}
