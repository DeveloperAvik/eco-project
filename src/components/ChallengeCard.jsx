import GlassCard from "./GlassCard";
import { Link } from "react-router-dom";

export default function ChallengeCard({ c }) {
  return (
    <GlassCard>
      <img
        src={c.imageUrl}
        className="w-full h-40 object-cover rounded-lg mb-3"
      />
      <h2 className="text-xl font-semibold text-neon">{c.title}</h2>
      <p className="text-gray-300 text-sm">{c.category}</p>
      <p className="mt-2 text-gray-400 text-sm">{c.description.slice(0, 80)}...</p>
      
      <Link
        to={`/challenges/${c._id}`}
        className="mt-4 inline-block px-4 py-2 bg-neon text-black rounded hover:shadow-neon transition"
      >
        View
      </Link>
    </GlassCard>
  );
}
