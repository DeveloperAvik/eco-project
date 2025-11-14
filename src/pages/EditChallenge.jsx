import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";
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

  // Load challenge
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
    } catch (err) {
      toast.error("Failed to load challenge");
      nav("/challenges");
    }
  }

  // Update challenge
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

  if (!user) return <p className="p-6">You must be logged in.</p>;
  if (loading) return <p className="p-6">Loading challenge...</p>;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Edit Challenge</h1>

      <form onSubmit={handleUpdate} className="space-y-4">

        {/* Title */}
        <div>
          <label className="block font-semibold mb-1">Title</label>
          <input
            className="border p-2 w-full rounded"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />
        </div>

        {/* Category */}
        <div>
          <label className="block font-semibold mb-1">Category</label>
          <select
            className="border p-2 w-full rounded"
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
          <label className="block font-semibold mb-1">Description</label>
          <textarea
            className="border p-2 w-full rounded h-28"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            required
          ></textarea>
        </div>

        {/* Duration */}
        <div>
          <label className="block font-semibold mb-1">Duration (days)</label>
          <input
            type="number"
            className="border p-2 w-full rounded"
            value={form.duration}
            onChange={(e) => setForm({ ...form, duration: e.target.value })}
            required
          />
        </div>

        {/* Dates */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold mb-1">Start Date</label>
            <input
              type="date"
              className="border p-2 w-full rounded"
              value={form.startDate}
              onChange={(e) => setForm({ ...form, startDate: e.target.value })}
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">End Date</label>
            <input
              type="date"
              className="border p-2 w-full rounded"
              value={form.endDate}
              onChange={(e) => setForm({ ...form, endDate: e.target.value })}
            />
          </div>
        </div>

        {/* Target */}
        <div>
          <label className="block font-semibold mb-1">Target (Goal)</label>
          <input
            className="border p-2 w-full rounded"
            value={form.target}
            onChange={(e) => setForm({ ...form, target: e.target.value })}
          />
        </div>

        {/* Impact Metric */}
        <div>
          <label className="block font-semibold mb-1">Impact Metric</label>
          <input
            className="border p-2 w-full rounded"
            value={form.impactMetric}
            onChange={(e) =>
              setForm({ ...form, impactMetric: e.target.value })
            }
          />
        </div>

        {/* Image URL */}
        <div>
          <label className="block font-semibold mb-1">Image URL</label>
          <input
            className="border p-2 w-full rounded"
            value={form.imageUrl}
            onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
          />
        </div>

        {/* Submit */}
        <button className="bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-700">
          Update Challenge
        </button>
      </form>
    </div>
  );
}