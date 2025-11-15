import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";

export default function EditChallenge() {
  const { id } = useParams();
  const nav = useNavigate();
  const { user } = useContext(AuthContext);

  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    title: "",
    category: "",
    description: "",
    duration: "",
    startDate: "",
    endDate: "",
    target: "",
    impactMetric: "",
    imageUrl: "",
  });

  useEffect(() => {
    loadChallenge();
  }, []);

  async function loadChallenge() {
    try {
      const res = await api.get(`/challenges/${id}`);
      const c = res.data;

      setForm({
        title: c.title,
        category: c.category,
        description: c.description,
        duration: c.duration,
        startDate: c.startDate?.substring(0, 10),
        endDate: c.endDate?.substring(0, 10),
        target: c.target || "",
        impactMetric: c.impactMetric || "",
        imageUrl: c.imageUrl || "",
      });

      setLoading(false);
    } catch {
      toast.error("Failed to load challenge");
      nav("/challenges");
    }
  }

  async function handleUpdate(e) {
    e.preventDefault();

    try {
      await api.patch(`/challenges/${id}`, form);
      toast.success("Challenge updated successfully!");
      nav(`/challenges/${id}`);
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed");
    }
  }

  if (!user) return <p className="p-6 text-gray-300">You must be logged in.</p>;
  if (loading) return <p className="p-6 text-gray-300">Loading challenge...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 sm:p-10 animate-fadeIn">
      
      {/* Title */}
      <h1 className="text-2xl sm:text-3xl font-bold text-neon drop-shadow-[0_0_12px_#00ff9c] mb-6">
        ✏️ Edit Challenge
      </h1>

      {/* Form */}
      <form
        onSubmit={handleUpdate}
        className="
          glass-holo p-6 sm:p-8 rounded-2xl
          border border-green-400/30 
          backdrop-blur-xl 
          shadow-[0_0_25px_rgba(0,255,156,0.15)]
          space-y-5
        "
      >

        {/* Title */}
        <div>
          <label className="block text-gray-300 text-sm mb-1">Title</label>
          <input
            className="
              w-full p-3 rounded-lg bg-white/5 text-gray-200
              border border-white/10 focus:border-neon 
              transition
            "
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-gray-300 text-sm mb-1">Category</label>
          <select
            className="
              w-full p-3 rounded-lg bg-white/5 text-gray-200
              border border-white/10 focus:border-neon
            "
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            required
          >
            <option>Waste Reduction</option>
            <option>Energy Conservation</option>
            <option>Water Conservation</option>
            <option>Sustainable Transport</option>
            <option>Green Living</option>
          </select>
        </div>

        {/* Description */}
        <div>
          <label className="block text-gray-300 text-sm mb-1">Description</label>
          <textarea
            className="
              w-full p-3 h-28 rounded-lg bg-white/5 text-gray-200
              border border-white/10 focus:border-neon
            "
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
            required
          ></textarea>
        </div>

        {/* Duration */}
        <div>
          <label className="block text-gray-300 text-sm mb-1">
            Duration (days)
          </label>
          <input
            type="number"
            className="
              w-full p-3 rounded-lg bg-white/5 text-gray-200
              border border-white/10 focus:border-neon
            "
            value={form.duration}
            onChange={(e) =>
              setForm({ ...form, duration: e.target.value })
            }
            required
          />
        </div>

        {/* Dates */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-300 text-sm mb-1">
              Start Date
            </label>
            <input
              type="date"
              className="
                w-full p-3 rounded-lg bg-white/5 text-gray-200
                border border-white/10 focus:border-neon
              "
              value={form.startDate}
              onChange={(e) =>
                setForm({ ...form, startDate: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block text-gray-300 text-sm mb-1">
              End Date
            </label>
            <input
              type="date"
              className="
                w-full p-3 rounded-lg bg-white/5 text-gray-200
                border border-white/10 focus:border-neon
              "
              value={form.endDate}
              onChange={(e) =>
                setForm({ ...form, endDate: e.target.value })
              }
            />
          </div>
        </div>

        {/* Target */}
        <div>
          <label className="block text-gray-300 text-sm mb-1">Target</label>
          <input
            className="
              w-full p-3 rounded-lg bg-white/5 text-gray-200
              border border-white/10 focus:border-neon
            "
            value={form.target}
            onChange={(e) => setForm({ ...form, target: e.target.value })}
          />
        </div>

        {/* Impact Metric */}
        <div>
          <label className="block text-gray-300 text-sm mb-1">
            Impact Metric
          </label>
          <input
            className="
              w-full p-3 rounded-lg bg-white/5 text-gray-200
              border border-white/10 focus:border-neon
            "
            value={form.impactMetric}
            onChange={(e) =>
              setForm({ ...form, impactMetric: e.target.value })
            }
          />
        </div>

        {/* Image URL */}
        <div>
          <label className="block text-gray-300 text-sm mb-1">Image URL</label>
          <input
            className="
              w-full p-3 rounded-lg bg-white/5 text-gray-200
              border border-white/10 focus:border-neon
            "
            value={form.imageUrl}
            onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
          />
        </div>

        {/* Submit */}
        <button
          className="
            mt-4 w-full py-3 rounded-lg font-semibold 
            bg-neon text-black 
            hover:shadow-[0_0_20px_#00ff9c]
            transition
          "
        >
          Update Challenge
        </button>
      </form>
    </div>
  );
}
