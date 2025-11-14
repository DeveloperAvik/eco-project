import { useEffect, useState } from "react";
import api from "../../api";
import ChallengeCard from "../components/ChallengeCard";
import GlassCard from "../components/GlassCard";

export default function Home() {
  const [challenges, setChallenges] = useState([]);

  useEffect(() => {
    api.get("/challenges").then(res => setChallenges(res.data.slice(0, 4)));
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6">

      {/* HERO SECTION */}
      <div className="text-center py-20">
        <h1 className="text-5xl font-bold text-neon drop-shadow-[0_0_20px_#00ff9c]">
          EcoPulse: Carbon Intelligence
        </h1>
        <p className="text-gray-300 mt-4 text-lg max-w-3xl mx-auto">
          Track. Analyze. Offset. Build a sustainable digital footprint in a futuristic world.
        </p>
      </div>

      {/* ACTIVE CHALLENGES */}
      <h2 className="text-2xl font-semibold text-neon mb-4">Active Challenges</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {challenges.map(c => <ChallengeCard key={c._id} c={c} />)}
      </div>

    </div>
  );
}
