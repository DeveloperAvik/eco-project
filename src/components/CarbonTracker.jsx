import { useEffect, useState } from "react";
import api from "../../api";

export default function CarbonTracker() {
  const [carbon, setCarbon] = useState(0);

  useEffect(() => {
    const timer = setInterval(track, 6000);
    return () => clearInterval(timer);
  }, []);

  async function track() {
    const usage = Math.random() * 0.15;
    const res = await api.post("/carbon/calc", {
      category: "browsing",
      value: usage,
    });
    setCarbon((c) => c + res.data.carbon);
  }

  return (
    <div className="
      fixed bottom-6 right-6 
      bg-panel backdrop-blur-md 
      border border-neonSoft 
      px-6 py-3 rounded-xl 
      shadow-neonSoft hover:shadow-neon transition
    ">
      <p className="text-sm text-gray-300">Live Carbon Output</p>
      <p className="text-neon text-2xl font-bold drop-shadow-[0_0_10px_#00ff9c]">
        {carbon.toFixed(1)} g
      </p>
    </div>
  );
}
