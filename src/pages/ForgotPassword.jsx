import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase";
import { toast } from "react-toastify";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("A reset link has been sent to your email!");
    } catch (err) {
      toast.error(err.message || "Unable to send reset link");
    }

    setLoading(false);
  }

  return (
    <div className="max-w-md mx-auto p-6 sm:p-8 animate-fadeIn">

      {/* Title */}
      <h1 className="text-2xl sm:text-3xl font-bold text-neon drop-shadow-[0_0_10px_#00ff9c] mb-6 text-center">
        Reset Your Password
      </h1>

      {/* Card */}
      <div
        className="
          glass-holo p-6 sm:p-8 rounded-2xl 
          border border-green-400/30 
          backdrop-blur-xl
          shadow-[0_0_25px_rgba(0,255,156,0.15)]
        "
      >
        <form onSubmit={submit} className="space-y-5">

          {/* Input */}
          <div>
            <label className="block text-gray-300 text-sm mb-1">
              Email Address
            </label>
            <input
              type="email"
              required
              placeholder="you@example.com"
              onChange={(e) => setEmail(e.target.value)}
              className="
                w-full p-3 rounded-lg bg-white/5 text-gray-200 
                border border-white/10 focus:border-neon
                transition placeholder-gray-400
              "
            />
          </div>

          {/* Button */}
          <button
            disabled={loading}
            className="
              w-full py-3 rounded-lg font-semibold 
              bg-neon text-black 
              hover:shadow-[0_0_18px_#00ff9c]
              disabled:bg-gray-500 disabled:text-gray-300
              transition
            "
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>
      </div>
    </div>
  );
}
