import { Link } from "react-router-dom";

export default function ChallengeCard({ c }) {
  return (
    <div className="border rounded shadow-sm overflow-hidden">
      <img
        src={c.imageUrl || `https://picsum.photos/seed/${c._id}/600/300`}
        alt={c.title}
        className="w-full h-40 object-cover"
      />

      <div className="p-3">
        <h3 className="font-bold">{c.title}</h3>
        <p className="text-xs text-gray-600">{c.category}</p>

        <p className="text-sm mt-2">
          {c.description?.length > 80
            ? c.description.slice(0, 80) + "..."
            : c.description}
        </p>

        <div className="flex justify-between items-center mt-3">
          <span className="text-xs text-gray-500">
            {c.participants} participants
          </span>

          <Link
            to={`/challenges/${c._id}`}
            className="text-green-600 text-sm"
          >
            View →
          </Link>
        </div>
      </div>
    </div>
  );
}