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

    setTimeout(() => {
      setXpGain(null);
      setAnim(false);
    }, 1800);
  }

  return (
    <GlassCard className="relative overflow-hidden p-4 sm:p-5">
      
      {/* XP Float Animation */}
      {xpGain && <FloatingXP xp={xpGain} />}

      {/* Main Row */}
      <div
        className={`
          flex flex-col sm:flex-row 
          justify-between sm:items-center 
          gap-3 sm:gap-0
          transition-all duration-300
          ${anim ? "scale-[1.03] brightness-125 saturate-150" : ""}
        `}
      >
        {/* Task Info */}
        <div className="max-w-[80%]">
          <h3 className="text-lg sm:text-xl font-semibold text-green-300">
            {task.title}
          </h3>

          <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
            {task.description}
          </p>
        </div>

        {/* Button */}
        <button
          onClick={handleComplete}
          disabled={task.completed}
          className={`
            px-3 py-1.5 sm:px-4 sm:py-2
            rounded-lg font-semibold text-sm sm:text-base
            transition-all duration-300
            ${
              task.completed
                ? "bg-gray-600/50 text-gray-300 cursor-not-allowed"
                : "bg-green-500 text-black hover:bg-green-600 shadow-[0_0_12px_#22c55e]"
            }
          `}
        >
          {task.completed ? "Completed ✓" : "Mark Done"}
        </button>
      </div>

      {/* Animated Shine Overlay */}
      {anim && (
        <div
          className="
          absolute inset-0 pointer-events-none 
          animate-shine 
          bg-gradient-to-r 
          from-transparent via-white/15 to-transparent
          "
        />
      )}
    </GlassCard>
  );
}
