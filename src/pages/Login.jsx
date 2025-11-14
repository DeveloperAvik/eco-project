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
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Login to EcoTrack</h1>

      <form onSubmit={submit} className="space-y-3">
        <input
          className="border p-2 w-full"
          placeholder="Email"
          type="email"
          required
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="border p-2 w-full"
          placeholder="Password"
          type="password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="bg-green-600 text-white px-4 py-2 rounded w-full">
          Login
        </button>
      </form>

      <button
        onClick={google}
        className="border px-4 py-2 mt-3 w-full"
      >
        Login with Google
      </button>

      <p className="text-sm mt-3">
        Don’t have an account?{" "}
        <Link to="/register" className="text-green-600">
          Register
        </Link>
      </p>

      <p className="text-sm mt-1">
        <Link to="/forgot-password" className="underline">
          Forgot Password?
        </Link>
      </p>
    </div>
  );
}