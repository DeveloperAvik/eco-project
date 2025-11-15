import { useState } from "react";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth, googleProvider } from "../../firebase";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();
  const loc = useLocation();
  const redirect = loc.state?.from?.pathname || "/";

  async function submit(e) {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Logged in!");
      nav(redirect);
    } catch (err) {
      toast.error(err.message);
    }
  }

  async function google() {
    try {
      await signInWithPopup(auth, googleProvider);
      toast.success("Logged in with Google");
      nav(redirect);
    } catch (err) {
      toast.error("Google Login failed");
    }
  }

  return (
    <div className="max-w-md mx-auto p-6 sm:p-8 animate-fadeIn">

      {/* Title */}
      <h1 className="text-3xl font-bold text-neon drop-shadow-[0_0_12px_#00ff9c] text-center mb-8">
        Login to EcoPulse
      </h1>

      {/* Glass Login Card */}
      <div
        className="
          glass-holo p-6 sm:p-8 rounded-2xl
          border border-green-400/30 backdrop-blur-xl
          shadow-[0_0_25px_rgba(0,255,156,0.15)]
        "
      >
        <form onSubmit={submit} className="space-y-5">

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
              onChange={(e) => setEmail(e.target.value)}
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
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Login Button */}
          <button
            className="
              w-full py-3 rounded-lg font-semibold
              bg-neon text-black 
              hover:shadow-[0_0_20px_#00ff9c]
              transition
            "
          >
            Login
          </button>
        </form>

        {/* Google Login */}
        <button
          onClick={google}
          className="
            w-full py-3 mt-4 rounded-lg
            border border-white/20 bg-white/5
            text-gray-200
            hover:border-neon hover:text-neon 
            transition flex items-center justify-center gap-2
          "
        >
          <img
            src='https://www.svgrepo.com/show/475656/google-color.svg'
            alt='google'
            className='w-5 h-5'
          />
          Login with Google
        </button>

        {/* Register Link */}
        <p className="text-gray-300 text-sm mt-4 text-center">
          Don’t have an account?{" "}
          <Link to="/register" className="text-neon hover:underline">
            Register
          </Link>
        </p>

        {/* Forgot Password */}
        <p className="text-gray-300 text-sm mt-2 text-center">
          <Link to="/forgot-password" className="underline hover:text-neon">
            Forgot Password?
          </Link>
        </p>
      </div>
    </div>
  );
}
