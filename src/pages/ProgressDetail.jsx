import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api";
import GlassCard from "../components/GlassCard";
import TaskItem from "../components/TaskItem";
import ProgressBar from "../components/ProgressBar";
import LevelUpModal from "../components/LevelUpModal";
import { toast } from "react-toastify";

export default function ProgressDetail() {
  const { id } = useParams();
  const [challenge, setChallenge] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [userChallenge, setUserChallenge] = useState(null);
  const [levelUp, setLevelUp] = useState(false);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const ucRes = await api.get("/user-challenges");
    const uc = ucRes.data.find((x) => x._id === id);

    setUserChallenge(uc);

    const challengeRes = await api.get(`/challenges/${uc.challengeId}`);
    setChallenge(challengeRes.data);

    const tasksRes = await api.get(`/tasks/${uc.challengeId}`);
    setTasks(tasksRes.data);
  }

  async function handleComplete(taskId) {
    const res = await api.patch(`/tasks/${taskId}`);

    toast.success(
      `+${res.data.xpEarned} XP • Streak ${res.data.streak} days 🔥`,
      { position: "bottom-right", theme: "dark" }
    );

    if (res.data.levelUp) setLevelUp(true);

    // Update tasks + progress stats
    setTasks((prev) =>
      prev.map((t) => (t._id === taskId ? { ...t, completed: true } : t))
    );

    setUserChallenge((prev) => ({
      ...prev,
      xp: res.data.newXP,
      streak: res.data.streak,
      progress: res.data.progress,
    }));
  }

  if (!challenge || !userChallenge)
    return (
      <p className="p-10 text-gray-300 animate-pulse text-center">
        Loading progress...
      </p>
    );

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-10 animate-fadeIn">

      {/* Level Up Popup */}
      {levelUp && <LevelUpModal onClose={() => setLevelUp(false)} />}

      {/* Page Title */}
      <h1 className="text-3xl sm:text-4xl font-bold text-green-400 drop-shadow-[0_0_12px_#22c55e]">
        {challenge.title} — Progress Tracker
      </h1>

      {/* Challenge Overview Card */}
      <GlassCard className="p-5 sm:p-7">

        {/* Hero Image */}
        <div className="rounded-xl overflow-hidden shadow-md">
          <img
            src={challenge.imageUrl}
            className="w-full h-52 sm:h-60 object-cover"
            alt=""
          />
        </div>

        <p className="text-gray-300 mt-4 text-sm sm:text-base leading-relaxed">
          {challenge.description}
        </p>

        {/* Progress Section */}
        <ProgressBar
          progress={userChallenge.progress}
          xp={userChallenge.xp}
          streak={userChallenge.streak}
        />
      </GlassCard>

      {/* Tasks Header */}
      <h2 className="text-xl sm:text-2xl font-semibold text-green-300">
        Your Tasks
      </h2>

      {/* Task List */}
      <div className="space-y-5">
        {tasks.map((t) => (
          <TaskItem key={t._id} task={t} onComplete={handleComplete} />
        ))}
      </div>
    </div>
  );
}
