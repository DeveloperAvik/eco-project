import { useEffect, useState } from "react";
import api from "../../api";
import { Link } from "react-router-dom";

// Reusable Activity Card
function ActivityCard({ item }) {
  return (
    <div
      className="
        glass-holo p-5 sm:p-6 rounded-2xl border border-green-400/20 
        shadow-[0_0_20px_rgba(0,255,156,0.1)]
        hover:shadow-[0_0_25px_rgba(0,255,156,0.3)]
        hover:-translate-y-[2px]
        transition-all duration-300 animate-fadeIn
      "
    >
      <div className="flex gap-4 sm:gap-5">

        {/* Challenge Image */}
        <div className="shrink-0">
          <img
            src={item.challenge?.imageUrl || 'https://picsum.photos/100'}
            className="
              w-24 h-24 sm:w-28 sm:h-28 
              rounded-xl object-cover 
              border border-green-500/40 shadow-md
            "
            alt=""
          />
        </div>

        {/* Details */}
        <div className="flex-1">

          {/* Title */}
          <h3 className="text-lg sm:text-xl font-semibold text-green-300 drop-shadow">
            {item.challenge?.title || 'Unknown Challenge'}
          </h3>

          {/* Status */}
          <p className="text-sm text-gray-300 mt-1">
            Status:{" "}
            <span className="text-green-400 font-semibold">
              {item.status}
            </span>
          </p>

          {/* Progress Bar */}
          <div className="mt-4">
            <div className="w-full h-3 bg-gray-700/40 rounded-full overflow-hidden">
              <div
                className="
                  h-3 bg-green-400 
                  shadow-[0_0_12px_#22c55e]
                  transition-all duration-700
                "
                style={{ width: `${item.progress}%` }}
              />
            </div>

            <p className="text-xs text-gray-400 mt-1">
              {item.progress}% completed
            </p>
          </div>

          {/* View Progress Link */}
          <Link
            to={`/my-activities/${item._id}`}
            className="
              inline-block mt-3 text-sm 
              text-green-400 underline underline-offset-2 
              hover:text-green-300 transition
            "
          >
            View Progress →
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function MyActivities() {
  const [items, setItems] = useState(null);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const res = await api.get('/user-challenges');

    // Fetch corresponding challenge data
    const enriched = await Promise.all(
      res.data.map(async (it) => {
        const c = await api.get(`/challenges/${it.challengeId}`);
        return { ...it, challenge: c.data };
      })
    );

    setItems(enriched);
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8 animate-fadeIn">

      {/* Page Title */}
      <h1 className="
        text-3xl sm:text-4xl font-bold 
        text-green-400 drop-shadow-[0_0_12px_#22c55e]
      ">
        🌱 My Activities
      </h1>

      {/* Loading */}
      {!items && (
        <p className="text-gray-400 animate-pulse">Loading your activities...</p>
      )}

      {/* Empty State */}
      {items && items.length === 0 && (
        <div className="text-gray-300 text-center py-20 animate-fadeIn">
          <p className="text-lg">You haven’t joined any challenges yet.</p>

          <Link
            to="/challenges"
            className="text-green-400 underline mt-2 inline-block"
          >
            Explore Challenges →
          </Link>
        </div>
      )}

      {/* Activities List */}
      {items && items.length > 0 && (
        <div className="space-y-6">
          {items.map((item) => (
            <ActivityCard key={item._id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}
