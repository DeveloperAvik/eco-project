import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";

export default function ChallengeDetail() {
  const { id } = useParams();
  const [challenge, setChallenge] = useState(null);
  const { user } = useContext(AuthContext);
  const nav = useNavigate();

  useEffect(() => {
    load();
  }, []);

  async function load() {
    try {
      const res = await api.get(`/challenges/${id}`);
      setChallenge(res.data);
    } catch {
      toast.error("Challenge not found");
      nav("/challenges");
    }
  }

  async function joinChallenge() {
    if (!user)
      return nav("/login", { state: { from: `/challenges/${id}` } });

    try {
      await api.post(`/challenges/join/${id}`);
      toast.success("Joined this challenge!");
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || "Error joining challenge");
    }
  }

  async function deleteChallenge() {
    if (!confirm("Are you sure you want to delete this challenge?")) return;

    try {
      await api.delete(`/challenges/${id}`);
      toast.success("Challenge deleted successfully!");
      nav("/challenges");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete");
    }
  }

  if (!challenge) return <p className="p-6 text-gray-200">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 animate-fadeIn">

      {/* --- HERO IMAGE SECTION --- */}
      <div className="relative w-full h-56 sm:h-72 md:h-80 rounded-2xl overflow-hidden shadow-lg">
        <img
          src={challenge.imageUrl || "https://picsum.photos/800/300"}
          alt={challenge.title}
          className="w-full h-full object-cover"
        />

        {/* Gradient overlay + Title */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-5">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-neon drop-shadow-[0_0_12px_#00ff9c]">
            {challenge.title}
          </h1>
        </div>
      </div>

      {/* --- INFO CARD --- */}
      <div
        className="
          glass-holo mt-6 p-5 sm:p-6 rounded-2xl 
          border border-green-400/20 
          shadow-[0_0_25px_rgba(0,255,156,0.15)]
        "
      >
        {/* Category + Duration */}
        <p className="text-sm text-green-300 font-medium">
          {challenge.category} • {challenge.duration} days
        </p>

        {/* Dates */}
        {(challenge.startDate || challenge.endDate) && (
          <p className="text-xs text-gray-400 mt-1">
            {challenge.startDate && (
              <>Starts: {new Date(challenge.startDate).toLocaleDateString()} </>
            )}
            {challenge.endDate && (
              <>• Ends: {new Date(challenge.endDate).toLocaleDateString()}</>
            )}
          </p>
        )}

        {/* Description */}
        <p className="mt-4 text-gray-300 leading-relaxed text-sm sm:text-base">
          {challenge.description}
        </p>

        {/* BUTTONS */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:gap-4">

          {/* JOIN BUTTON */}
          <button
            onClick={joinChallenge}
            className="
              px-5 py-2 rounded-lg 
              bg-neon text-black font-semibold
              hover:shadow-[0_0_20px_#00ff9c]
              transition w-full sm:w-auto
            "
          >
            Join Challenge
          </button>

          {/* EDIT/DELETE FOR LOGGED IN USER */}
          {user && (
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto sm:ml-auto">
              
              <button
                onClick={() => nav(`/challenges/edit/${id}`)}
                className="
                  px-4 py-2 rounded-lg 
                  bg-blue-600 text-white 
                  hover:bg-blue-700 transition w-full sm:w-auto
                "
              >
                Edit
              </button>

              <button
                onClick={deleteChallenge}
                className="
                  px-4 py-2 rounded-lg 
                  bg-red-600 text-white 
                  hover:bg-red-700 transition w-full sm:w-auto
                "
              >
                Delete
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
