import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase";
import { toast } from "react-toastify";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  async function submit(e) {
    e.preventDefault();

    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("Reset link sent");
    } catch (err) {
      toast.error(err.message);
    }
  }

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold">Forgot Password</h1>

      <form onSubmit={submit} className="mt-4 space-y-3">
        <input
          className="border p-2 w-full"
          placeholder="Your email"
          type="email"
          required
          onChange={(e) => setEmail(e.target.value)}
        />

        <button className="bg-green-600 text-white px-4 py-2 rounded w-full">
          Send Reset Link
        </button>
      </form>
    </div>
  );
}