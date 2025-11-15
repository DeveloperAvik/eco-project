import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Menu, X } from "lucide-react";

export default function Header() {
  const { user, logoutUser } = useContext(AuthContext);
  const [open, setOpen] = useState(false);

  return (
    <header className="backdrop-blur-xl bg-panel/80 border-b border-neon/30 shadow-neon sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <Link
          to="/"
          className="text-2xl sm:text-3xl font-bold text-neon drop-shadow-[0_0_10px_#00ff9c]"
        >
          EcoPulse
        </Link>

        {/* MOBILE MENU BUTTON */}
        <button
          className="sm:hidden text-white"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>

        {/* DESKTOP NAV */}
        <nav className="hidden sm:flex gap-8 text-white font-light tracking-wide">
          <Link className="hover:text-neon transition" to="/">Home</Link>
          <Link className="hover:text-neon transition" to="/challenges">Challenges</Link>
          {user && <Link className="hover:text-neon transition" to="/carbon">Carbon</Link>}
          {user && <Link className="hover:text-neon transition" to="/my-activities">My Activities</Link>}
          {user && <Link className="hover:text-neon transition" to="/leaderboard">Leaderboard</Link>}
          <Link className="hover:text-neon transition" to="/timeline">Timeline</Link>
        </nav>

        {/* DESKTOP AUTH BUTTONS */}
        <div className="hidden sm:block">
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
              className="px-4 py-1 bg-red-600 text-white rounded hover:shadow-lg hover:bg-red-700 transition"
            >
              Logout
            </button>
          )}
        </div>
      </div>

      {/* MOBILE DROPDOWN MENU */}
      <div
        className={`
          sm:hidden 
          bg-black/60 backdrop-blur-xl border-t border-white/10 
          overflow-hidden transition-all duration-300 
          ${open ? "max-h-96 py-4" : "max-h-0 py-0"}
        `}
      >
        <div className="flex flex-col gap-4 px-6 text-white text-sm">

          <Link onClick={() => setOpen(false)} className="hover:text-neon transition" to="/">
            Home
          </Link>

          <Link onClick={() => setOpen(false)} className="hover:text-neon transition" to="/challenges">
            Challenges
          </Link>

          {user && (
            <Link onClick={() => setOpen(false)} className="hover:text-neon transition" to="/carbon">
              Carbon
            </Link>
          )}

          {user && (
            <Link onClick={() => setOpen(false)} className="hover:text-neon transition" to="/my-activities">
              My Activities
            </Link>
          )}

          {user && (
            <Link onClick={() => setOpen(false)} className="hover:text-neon transition" to="/leaderboard">
              Leaderboard
            </Link>
          )}

          <Link onClick={() => setOpen(false)} className="hover:text-neon transition" to="/timeline">
            Timeline
          </Link>

          {/* Mobile Auth */}
          <div className="mt-2">
            {!user ? (
              <>
                <Link
                  onClick={() => setOpen(false)}
                  to="/login"
                  className="block w-fit px-4 py-1 border border-neon text-neon rounded hover:shadow-neonSoft transition"
                >
                  Login
                </Link>
                <Link
                  onClick={() => setOpen(false)}
                  to="/register"
                  className="block w-fit mt-2 px-4 py-1 bg-neon text-black rounded hover:shadow-neon transition"
                >
                  Register
                </Link>
              </>
            ) : (
              <button
                onClick={() => {
                  logoutUser();
                  setOpen(false);
                }}
                className="px-4 py-1 bg-red-600 text-white rounded hover:bg-red-700 w-fit transition"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
