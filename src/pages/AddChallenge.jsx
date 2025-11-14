import { useState } from "react";
import api from "../api";
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
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-xl font-bold">Add Challenge</h1>

      <form onSubmit={submit} className="space-y-3 mt-4">
        <input
          className="border p-2 w-full"
          placeholder="Title"
          required
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />

        <select
          className="border p-2 w-full"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        >
          <option>Waste Reduction</option>
          <option>Energy Conservation</option>
          <option>Water Conservation</option>
          <option>Sustainable Transport</option>
          <option>Green Living</option>
        </select>

        <textarea
          className="border p-2 w-full"
          placeholder="Description"
          required
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />

        <div className="flex gap-2">
          <input
            type="number"
            className="border p-2"
            value={form.duration}
            onChange={(e) =>
              setForm({ ...form, duration: Number(e.target.value) })
            }
          />

          <input
            type="date"
            className="border p-2"
            value={form.startDate}
            onChange={(e) => setForm({ ...form, startDate: e.target.value })}
          />

          <input
            type="date"
            className="border p-2"
            value={form.endDate}
            onChange={(e) => setForm({ ...form, endDate: e.target.value })}
          />
        </div>

        <input
          className="border p-2 w-full"
          placeholder="Image URL"
          value={form.imageUrl}
          onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
        />

        <button
          disabled={loading}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          {loading ? "Creating..." : "Create Challenge"}
        </button>
      </form>
    </div>
  );
}