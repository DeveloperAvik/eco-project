import { useEffect, useState } from "react";
import api from "../../api";
import SkeletonCard from "../components/SkeletonCard";
import ChallengeCard from "../components/ChallengeCard";
import TipCard from "../components/TipCard";

export default function Home() {
  const [challenges, setChallenges] = useState(null);
  const [tips, setTips] = useState(null);
  const [events, setEvents] = useState(null);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      const [chRes, tipRes, evRes] = await Promise.all([
        api.get("/challenges"),
        api.get("/tips"),
        api.get("/events"),
      ]);

      setChallenges(chRes.data);
      setTips(tipRes.data);
      setEvents(evRes.data);

      setStats({
        co2: (chRes.data || []).reduce(
          (s, c) => s + (c.participants || 0) * 0.5,
          0
        ),
        plastic: (chRes.data || []).reduce(
          (s, c) => s + (c.participants || 0) * 0.2,
          0
        ),
      });
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-green-50 p-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold">
            Join sustainability challenges — Track your real impact
          </h1>
          <p className="mt-2 text-gray-600">
            Become part of a global eco-friendly movement.
          </p>

          <div className="flex gap-6 mt-4">
            <div className="bg-white p-4 rounded shadow">
              <p className="text-sm text-gray-500">CO₂ Saved</p>
              <p className="text-xl font-bold">{stats ? stats.co2 + " kg" : "---"}</p>
            </div>

            <div className="bg-white p-4 rounded shadow">
              <p className="text-sm text-gray-500">Plastic Reduced</p>
              <p className="text-xl font-bold">{stats ? stats.plastic + " kg" : "---"}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <h2 className="font-semibold text-lg mb-3">Active Challenges</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {!challenges &&
              Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)}

            {challenges &&
              challenges.slice(0, 6).map((c) => (
                <ChallengeCard key={c._id} c={c} />
              ))}
          </div>

          <h2 className="font-semibold text-lg mt-6 mb-3">Upcoming Events</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {!events &&
              Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)}

            {events &&
              events.map((e) => (
                <div key={e._id} className="border p-3 rounded">
                  <h3 className="font-bold">{e.title}</h3>
                  <p className="text-sm text-gray-600">
                    {new Date(e.date).toLocaleString()}
                  </p>
                  <p className="text-sm mt-1">{e.description}</p>
                </div>
              ))}
          </div>
        </div>

        <aside>
          <h3 className="font-semibold mb-3">Recent Tips</h3>

          <div className="space-y-3">
            {!tips &&
              Array.from({ length: 5 }).map((_, i) => <SkeletonCard key={i} />)}

            {tips && tips.map((t) => <TipCard key={t._id} t={t} />)}
          </div>
        </aside>
      </main>
    </div>
  );
}