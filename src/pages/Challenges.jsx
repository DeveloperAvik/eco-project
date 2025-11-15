import { useEffect, useState } from "react";
import api from "../../api";
import ChallengeCard from "../components/ChallengeCard";
import SkeletonCard from "../components/SkeletonCard";

export default function Challenges() {
  const [challenges, setChallenges] = useState(null);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const res = await api.get("/challenges");
    setChallenges(res.data);
  }

  const filtered =
    challenges?.filter((c) => (filter ? c.category === filter : true)) || [];

  return (
    <div className="max-w-6xl mx-auto p-6 animate-fadeIn space-y-6">

      {/* Page Title */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-neon drop-shadow-[0_0_10px_#00ff9c]">
          All Challenges
        </h1>
        <div className="w-24 h-1 bg-neon mt-1 rounded-full"></div>
      </div>

      {/* Filter Dropdown */}
      <div className="flex items-center gap-3">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="
            px-4 py-2 rounded-lg 
            bg-white/10 text-gray-100 
            border border-white/20 
            focus:border-neon 
            transition backdrop-blur-xl
          "
        >
          <option value="">All Categories</option>
          <option>Waste Reduction</option>
          <option>Energy Conservation</option>
          <option>Water Conservation</option>
          <option>Sustainable Transport</option>
          <option>Green Living</option>
        </select>
      </div>

      {/* Challenges Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

        {/* Skeleton Loaders */}
        {!challenges &&
          Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}

        {/* Actual Cards */}
        {challenges &&
          filtered.map((c) => <ChallengeCard key={c._id} c={c} />)}
      </div>
    </div>
  );
}
