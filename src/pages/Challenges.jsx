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
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">All Challenges</h1>

      <select
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="border p-2"
      >
        <option value="">All Categories</option>
        <option>Waste Reduction</option>
        <option>Energy Conservation</option>
        <option>Water Conservation</option>
        <option>Sustainable Transport</option>
        <option>Green Living</option>
      </select>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        {!challenges &&
          Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}

        {challenges &&
          filtered.map((c) => <ChallengeCard key={c._id} c={c} />)}
      </div>
    </div>
  );
}