export default function FloatingXP({ xp }) {
  return (
    <div className="absolute -top-6 right-4 animate-pingSlow text-green-400 font-bold text-xl drop-shadow-[0_0_10px_#22c55e]">
      +{xp} XP
    </div>
  );
}
