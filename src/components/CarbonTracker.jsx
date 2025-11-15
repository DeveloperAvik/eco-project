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
    <div
      className="
        fixed 
        bottom-4 right-4         /* mobile */
        sm:bottom-6 sm:right-6   /* tablet/desktop */
        max-w-[80%]              /* prevents overflow */
        
        bg-panel backdrop-blur-md 
        border border-neonSoft 
        px-4 py-2                /* mobile padding */
        sm:px-6 sm:py-3          /* larger padding on bigger devices */
        rounded-xl 
        
        shadow-neonSoft hover:shadow-neon 
        transition
      "
    >
      <p className="text-xs sm:text-sm text-gray-300">
        Live Carbon Output
      </p>

      <p className="
        text-neon 
        text-xl sm:text-2xl md:text-3xl 
        font-bold 
        drop-shadow-[0_0_10px_#00ff9c]
      ">
        {carbon.toFixed(1)} g
      </p>
    </div>
  );
}
