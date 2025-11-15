import { useState } from "react";
import api from "../../api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function AddChallenge() {
  const [form, setForm] = useState({
    title: "",
    category: "Waste Reduction",
    description: "",
    duration: 30,
    startDate: "",
    endDate: "",
    imageUrl: "",
  });

  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post("/challenges", form);
      toast.success("Challenge created");
      nav("/challenges");
    } catch (err) {
      toast.error("Failed to create challenge");
    }

    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 sm:p-10 animate-fadeIn">
      <h1 className="text-2xl sm:text-3xl font-bold text-neon drop-shadow-[0_0_12px_#00ff9c] mb-6">
        ➕ Add New Challenge
      </h1>

      <form
        onSubmit={submit}
        className="
          glass-holo p-6 sm:p-8 rounded-2xl 
          border border-green-400/30 
          shadow-[0_0_25px_rgba(0,255,156,0.15)]
          space-y-5
        "
      >
        {/* Title */}
        <div>
          <label className="block text-sm text-gray-300 mb-1">Title</label>
          <input
            className="
              w-full p-3 rounded-lg bg-white/5 text-gray-200 
              border border-white/10 
              focus:border-neon focus:outline-none
              transition
            "
            placeholder="Green Lifestyle Challenge"
            required
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm text-gray-300 mb-1">
            Category
          </label>
          <select
            className="
              w-full p-3 rounded-lg bg-white/5 text-gray-200 
              border border-white/10 focus:border-neon 
            "
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
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
          <label className="block text-sm text-gray-300 mb-1">
            Description
          </label>
          <textarea
            className="
              w-full p-3 h-28 rounded-lg bg-white/5 text-gray-200 
              border border-white/10 focus:border-neon
            "
            placeholder="Describe what this challenge is about..."
            required
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
          />
        </div>

        {/* Duration + Dates */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block text-sm text-gray-300 mb-1">Duration (days)</label>
            <input
              type="number"
              className="
                w-full p-3 rounded-lg bg-white/5 text-gray-200 
                border border-white/10 focus:border-neon
              "
              value={form.duration}
              onChange={(e) =>
                setForm({ ...form, duration: Number(e.target.value) })
              }
            />
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-1">Start Date</label>
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
            <label className="block text-sm text-gray-300 mb-1">End Date</label>
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

        {/* Image URL */}
        <div>
          <label className="block text-sm text-gray-300 mb-1">Image URL</label>
          <input
            className="
              w-full p-3 rounded-lg bg-white/5 text-gray-200 
              border border-white/10 focus:border-neon
            "
            placeholder="https://example.com/challenge.jpg"
            value={form.imageUrl}
            onChange={(e) =>
              setForm({ ...form, imageUrl: e.target.value })
            }
          />
        </div>

        {/* Submit Button */}
        <button
          disabled={loading}
          className="
            w-full py-3 rounded-lg font-semibold 
            bg-neon text-black 
            hover:shadow-[0_0_20px_#00ff9c]
            transition
            disabled:bg-gray-600 disabled:text-gray-300
          "
        >
          {loading ? "Creating..." : "Create Challenge"}
        </button>
      </form>
    </div>
  );
}
