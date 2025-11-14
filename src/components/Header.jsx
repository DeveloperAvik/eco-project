import { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";

export default function Header() {
  const { user } = useContext(AuthContext);
  const nav = useNavigate();
  const [open, setOpen] = useState(false);

  const logout = async () => {
    await signOut(auth);
    nav("/");
  };

  return (
    <header className="bg-green-600 text-white p-4">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">EcoTrack</Link>

        <nav className="hidden md:flex gap-4">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/challenges">Challenges</NavLink>
           <NavLink to="/challenges/add">Add Challenge</NavLink>
          <NavLink to="/my-activities">My Activities</NavLink>
        </nav>

        {!user ? (
          <div className="hidden md:flex gap-3">
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </div>
        ) : (
          <button onClick={logout}>Logout</button>
        )}

        <button className="md:hidden" onClick={() => setOpen(!open)}>
          ☰
        </button>
      </div>
    </header>
  );
}