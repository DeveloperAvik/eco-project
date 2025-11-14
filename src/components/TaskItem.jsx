import { useState } from "react";
import GlassCard from "./GlassCard";
import FloatingXP from "./FloatingXP";

export default function TaskItem({ task, onComplete }) {
  const [anim, setAnim] = useState(false);
  const [xpGain, setXpGain] = useState(null);

  async function handleComplete() {
    setAnim(true);

    const res = await onComplete(task._id);

    setXpGain(res?.xpGain);

    setTimeout(() => setXpGain(null), 1800);
  }

  return (
    <GlassCard className="relative overflow-hidden">

      {xpGain && <FloatingXP xp={xpGain} />}

      <div
        className={`flex justify-between items-center transition-all 
        ${anim ? "scale-[1.03] brightness-125 saturate-150" : ""}`}
      >
        <div>
          <h3 className="text-xl text-green-300">{task.title}</h3>
          <p className="text-gray-400 text-sm">{task.description}</p>
        </div>

        <button
          onClick={handleComplete}
          disabled={task.completed}
          className={`
            px-4 py-2 rounded-lg font-semibold 
            ${task.completed
              ? "bg-gray-600 text-gray-300 cursor-not-allowed"
              : "bg-green-500 hover:bg-green-600 text-black shadow-[0_0_12px_#22c55e]"
            }
          `}
        >
          {task.completed ? "Completed ✓" : "Mark Done"}
        </button>
      </div>

      {anim && (
        <div className="absolute inset-0 pointer-events-none animate-shine bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
      )}
    </GlassCard>
  );
}
