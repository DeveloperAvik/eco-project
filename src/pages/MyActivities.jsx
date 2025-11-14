import { useEffect, useState } from "react";
import api from "../api";

export default function MyActivities() {
  const [items, setItems] = useState(null);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const res = await api.get("/user-challenges");
    setItems(res.data);
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">My Activities</h1>

      {!items && <p>Loading...</p>}

      {items &&
        items.map((it) => (
          <div key={it._id} className="border p-3 rounded mb-3">
            <p>Challenge ID: {it.challengeId}</p>
            <p>Status: {it.status}</p>
            <p>Progress: {it.progress}%</p>
          </div>
        ))}
    </div>
  );
}