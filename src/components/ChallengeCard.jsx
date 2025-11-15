import GlassCard from "./GlassCard";
import { Link } from "react-router-dom";

export default function ChallengeCard({ c }) {
  return (
    <GlassCard className="p-4 sm:p-5 md:p-6">
      <img
        src={c.imageUrl}
        alt={c.title}
        className="
          w-full 
          h-32 sm:h-40 md:h-48 
          object-cover 
          rounded-lg 
          mb-3 sm:mb-4
        "
      />

      <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-neon leading-snug">
        {c.title}
      </h2>

      <p className="text-gray-300 text-xs sm:text-sm mt-1">
        {c.category}
      </p>

      <p className="
        mt-2 
        text-gray-400 
        text-xs sm:text-sm 
        leading-relaxed
      ">
        {c.description.slice(0, 80)}...
      </p>

      <Link
        to={`/challenges/${c._id}`}
        className="
          mt-3 sm:mt-4 
          inline-block 
          px-3 sm:px-4 
          py-1.5 sm:py-2 
          bg-neon text-black 
          rounded 
          text-xs sm:text-sm 
          hover:shadow-neon 
          transition
        "
      >
        View
      </Link>
    </GlassCard>
  );
}
