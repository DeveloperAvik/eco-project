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
    return (
      /[A-Z]/.test(pwd) &&
      /[a-z]/.test(pwd) &&
      /[^a-zA-Z0-9]/.test(pwd) &&
      pwd.length >= 6
    );
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
    <div className="max-w-md mx-auto p-6 sm:p-8 animate-fadeIn">

      {/* Title */}
      <h1 className="text-3xl font-bold text-neon drop-shadow-[0_0_12px_#00ff9c] text-center mb-8">
        Join EcoPulse
      </h1>

      {/* Glass Register Box */}
      <div
        className="
          glass-holo p-6 sm:p-8 rounded-2xl 
          border border-green-400/30 backdrop-blur-xl
          shadow-[0_0_25px_rgba(0,255,156,0.15)]
        "
      >

        <form onSubmit={submit} className="space-y-5">
          {/* Name */}
          <div>
            <label className="text-gray-300 text-sm mb-1 block">Full Name</label>
            <input
              className="
                w-full p-3 rounded-lg bg-white/5 text-gray-200 
                border border-white/10 placeholder-gray-400
                focus:border-neon transition
              "
              placeholder="Your name"
              value={form.name}
              required
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-gray-300 text-sm mb-1 block">Email</label>
            <input
              className="
                w-full p-3 rounded-lg bg-white/5 text-gray-200 
                border border-white/10 placeholder-gray-400
                focus:border-neon transition
              "
              placeholder="you@example.com"
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>

          {/* Optional Photo URL */}
          <div>
            <label className="text-gray-300 text-sm mb-1 block">Photo URL</label>
            <input
              className="
                w-full p-3 rounded-lg bg-white/5 text-gray-200 
                border border-white/10 placeholder-gray-400
                focus:border-neon transition
              "
              placeholder="Optional"
              value={form.photoURL}
              onChange={(e) => setForm({ ...form, photoURL: e.target.value })}
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-gray-300 text-sm mb-1 block">Password</label>
            <input
              className="
                w-full p-3 rounded-lg bg-white/5 text-gray-200
                border border-white/10 placeholder-gray-400
                focus:border-neon transition
              "
              placeholder="••••••••"
              type="password"
              required
              value={form.password}
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
            />

            {/* Password Rules */}
            <p className="text-xs text-gray-400 mt-2">
              Password must include:<br />
              ✔ 1 uppercase letter<br />
              ✔ 1 lowercase letter<br />
              ✔ 1 special character<br />
              ✔ Minimum 6 characters
            </p>
          </div>

          {/* Register Button */}
          <button
            className="
              w-full py-3 rounded-lg font-semibold
              bg-neon text-black 
              hover:shadow-[0_0_20px_#00ff9c]
              transition
            "
          >
            Register
          </button>
        </form>

        {/* Google Register */}
        <button
          onClick={google}
          className="
            w-full py-3 mt-4 rounded-lg
            border border-white/20 bg-white/5
            text-gray-200 
            flex items-center justify-center gap-2
            hover:border-neon hover:text-neon transition
          "
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="google"
            className="w-5 h-5"
          />
          Register with Google
        </button>

        {/* Login Link */}
        <p className="text-gray-300 text-sm text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-neon hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
