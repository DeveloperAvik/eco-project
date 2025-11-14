import { useEffect, useState } from "react";
import api from "../../api";
import { Link } from "react-router-dom";

// Reusable activity card
function ActivityCard({ item }) {
  return (
    <div
      className="backdrop-blur-xl bg-white/10 border border-green-400/30 p-5 rounded-xl shadow-lg 
                 hover:shadow-green-400/40 hover:-translate-y-1 transition-all duration-300
                 animate-fadeIn"
    >
      <div className="flex items-center gap-4">
        
        <img
          src={item.challenge?.imageUrl || "https://picsum.photos/100"}
          className="w-24 h-24 rounded-lg object-cover border border-green-500/40 shadow"
          alt=""
        />

        <div className="flex-1">
          <h3 className="text-xl font-semibold text-green-300 drop-shadow">
            {item.challenge?.title || "Unknown Challenge"}
          </h3>

          <p className="text-sm text-gray-300 mt-1">
            Status: <span className="text-green-400">{item.status}</span>
          </p>

          {/* Progress Bar */}
          <div className="mt-3">
            <div className="w-full h-3 bg-gray-700/40 rounded-full overflow-hidden">
              <div
                className="h-3 bg-green-400 shadow-[0_0_10px_#22c55e] transition-all duration-700"
                style={{ width: `${item.progress}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-400 mt-1">
              {item.progress}% completed
            </p>
          </div>

          <Link
            to={`/my-activities/${item._id}`}
            className="inline-block mt-3 text-sm text-green-400 hover:text-green-300 
                       underline underline-offset-2 transition"
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
    const res = await api.get("/user-challenges");

    // Fetch challenge details for each user challenge
    const enriched = await Promise.all(
      res.data.map(async (it) => {
        const c = await api.get(`/challenges/${it.challengeId}`);
        return { ...it, challenge: c.data };
      })
    );

    setItems(enriched);
  }

  return (
    <div className="max-w-4xl mx-auto p-6">

      <h1 className="text-3xl font-bold text-green-400 mb-6 drop-shadow-glow">
        🌱 My Activities
      </h1>

      {!items && (
        <p className="text-gray-400 animate-pulse">Loading your activities...</p>
      )}

      {/* Empty state */}
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

      {/* List */}
      <div className="space-y-6">
        {items &&
          items.map((item) => <ActivityCard key={item._id} item={item} />)}
      </div>
    </div>
  );
}
