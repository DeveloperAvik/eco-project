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

  // Join Challenge
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

  // DELETE Challenge
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

  if (!challenge) return <p className="p-6">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      
      {/* Image */}
      <img
        src={challenge.imageUrl || "https://picsum.photos/800/300"}
        className="w-full h-60 object-cover rounded"
        alt={challenge.title}
      />

      {/* Title */}
      <h1 className="text-3xl font-bold mt-4">{challenge.title}</h1>

      {/* Category + Duration */}
      <p className="text-sm text-gray-600">
        {challenge.category} • {challenge.duration} days
      </p>

      {/* Description */}
      <p className="mt-4 text-gray-700">{challenge.description}</p>

      {/* JOIN Button */}
      <button
        onClick={joinChallenge}
        className="mt-4 bg-green-600 text-white px-5 py-2 rounded-md hover:bg-green-700"
      >
        Join Challenge
      </button>

      {/* ONLY SHOW Edit/Delete IF LOGGED IN */}
      {user && (
        <div className="mt-4 flex gap-3">

          {/* EDIT BUTTON */}
          <button
            onClick={() => nav(`/challenges/edit/${id}`)}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Edit
          </button>

          {/* DELETE BUTTON */}
          <button
            onClick={deleteChallenge}
            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}