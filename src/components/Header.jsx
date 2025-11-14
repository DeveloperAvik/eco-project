import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Header() {
  const { user, logoutUser } = useContext(AuthContext);

  return (
    <header className="backdrop-blur-md bg-panel border-b border-neon/30 shadow-neon sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        
        <Link
          to="/"
          className="text-3xl font-bold text-neon drop-shadow-[0_0_10px_#00ff9c]"
        >
          EcoPulse
        </Link>

        <nav className="flex gap-8 text-white font-light tracking-wide">
          <Link className="hover:text-neon transition" to="/">Home</Link>
          <Link className="hover:text-neon transition" to="/challenges">Challenges</Link>
          {user && <Link className="hover:text-neon transition" to="/carbon">Carbon</Link>}
          {user && <Link className="hover:text-neon transition" to="/my-activities">My Activities</Link>}
        </nav>

        <div>
          {!user ? (
            <>
              <Link
                to="/login"
                className="px-4 py-1 border border-neon text-neon rounded hover:shadow-neonSoft transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="ml-3 px-4 py-1 bg-neon text-black rounded hover:shadow-neon transition"
              >
                Register
              </Link>
            </>
          ) : (
            <button
              onClick={logoutUser}
              className="px-4 py-1 bg-red-600 text-white rounded hover:shadow-lg hover:bg-red-700"
            >
              Logout
            </button>
          )}
        </div>

      </div>
    </header>
  );
}
