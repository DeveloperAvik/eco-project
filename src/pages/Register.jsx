import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithPopup,
} from "firebase/auth";
import { auth, googleProvider } from "../../firebase";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    photoURL: "",
    password: "",
  });

  const nav = useNavigate();

  function isValidPassword(pwd) {
    return /[A-Z]/.test(pwd) &&
           /[a-z]/.test(pwd) &&
           /[^a-zA-Z0-9]/.test(pwd) &&
           pwd.length >= 6;
  }

  async function submit(e) {
    e.preventDefault();

    if (!isValidPassword(form.password)) {
      return toast.error("Password does not meet requirements.");
    }

    try {
      const res = await createUserWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );

      await updateProfile(res.user, {
        displayName: form.name,
        photoURL: form.photoURL,
      });

      toast.success("Registered successfully!");
      nav("/");
    } catch (err) {
      toast.error(err.message);
    }
  }

  async function google() {
    try {
      await signInWithPopup(auth, googleProvider);
      toast.success("Registered with Google");
      nav("/");
    } catch {
      toast.error("Google registration failed");
    }
  }

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold">Join EcoTrack</h1>

      <form onSubmit={submit} className="space-y-3 mt-4">
        <input
          className="border p-2 w-full"
          placeholder="Name"
          value={form.name}
          required
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          className="border p-2 w-full"
          placeholder="Email"
          type="email"
          required
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          className="border p-2 w-full"
          placeholder="Photo URL"
          value={form.photoURL}
          onChange={(e) =>
            setForm({ ...form, photoURL: e.target.value })
          }
        />

        <input
          className="border p-2 w-full"
          placeholder="Password"
          type="password"
          required
          value={form.password}
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <p className="text-xs text-gray-600">
          Password must include:
          <br />✔ 1 uppercase letter  
          ✔ 1 lowercase letter  
          ✔ 1 special character  
          ✔ Minimum 6 characters
        </p>

        <button className="bg-green-600 text-white px-4 py-2 rounded w-full">
          Register
        </button>
      </form>

      <button
        onClick={google}
        className="border px-4 py-2 mt-3 w-full"
      >
        Register with Google
      </button>

      <p className="text-sm mt-3">
        Already have an account?{" "}
        <Link to="/login" className="text-green-600">
          Login
        </Link>
      </p>
    </div>
  );
}