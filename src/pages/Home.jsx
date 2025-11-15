import { useEffect, useState } from "react";
import api from "../../api";
import ChallengeCard from "../components/ChallengeCard";
import GlassCard from "../components/GlassCard";

export default function Home() {
  const [challenges, setChallenges] = useState([]);

  useEffect(() => {
    api.get("/challenges").then((res) => setChallenges(res.data.slice(0, 4)));
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-12 animate-fadeIn">

      {/* ===== HERO SECTION ===== */}
      <div className="relative text-center py-20 sm:py-28">

        {/* Floating Glow */}
        <div className="absolute inset-0 flex justify-center items-center -z-10">
          <div className="w-[500px] h-[500px] bg-green-400/20 blur-3xl rounded-full"></div>
        </div>

        {/* Title */}
        <h1
          className="
            text-4xl sm:text-5xl md:text-6xl 
            font-bold text-neon 
            drop-shadow-[0_0_25px_#00ff9c]
          "
        >
          EcoPulse: Carbon Intelligence
        </h1>

        {/* Subtitle */}
        <div
          className="
            mt-6 bg-white/5 backdrop-blur-xl 
            border border-white/10 
            px-6 py-3 rounded-xl inline-block
            shadow-[0_0_20px_rgba(0,255,156,0.1)]
          "
        >
          <p className="text-gray-300 text-base sm:text-lg leading-relaxed max-w-3xl mx-auto">
            Track. Analyze. Offset.  
            Build a sustainable digital footprint in a futuristic world.
          </p>
        </div>
      </div>

      {/* ===== ACTIVE CHALLENGES ===== */}
      <div>
        <h2
          className="
            text-2xl sm:text-3xl font-semibold 
            text-neon drop-shadow-[0_0_12px_#00ff9c] 
            mb-4
          "
        >
          Active Challenges
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {challenges.map((c) => (
            <ChallengeCard key={c._id} c={c} />
          ))}
        </div>
      </div>
    </div>
  );
}
