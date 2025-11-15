import { Link } from "react-router-dom";
import { Facebook, Twitter, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-10 bg-black/40 backdrop-blur-xl border-t border-white/10">
      <div className="max-w-6xl mx-auto px-6 py-8">

        {/* TOP SECTION */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-6">
          
          {/* Branding */}
          <div>
            <h2 className="text-xl font-semibold text-neon mb-1">
              EcoTrack
            </h2>
            <p className="text-gray-400 text-sm max-w-xs leading-relaxed">
              Track, reduce, and optimize your digital carbon footprint — one action at a time.
            </p>
          </div>

          {/* Footer Links */}
          <div className="flex gap-6 text-sm">
            <Link className="text-gray-300 hover:text-neon transition">About</Link>
            <Link className="text-gray-300 hover:text-neon transition">Contact</Link>
            <Link className="text-gray-300 hover:text-neon transition">Privacy</Link>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="border-t border-white/10 my-6" />

        {/* BOTTOM SECTION */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          
          <p className="text-gray-500 text-xs">
            © 2025 EcoTrack • All rights reserved
          </p>

          {/* Social Icons */}
          <div className="flex gap-4">
            <a className="text-gray-300 hover:text-neon transition">
              <Facebook size={18} />
            </a>
            <a className="text-gray-300 hover:text-neon transition">
              <Twitter size={18} />
            </a>
            <a className="text-gray-300 hover:text-neon transition">
              <Mail size={18} />
            </a>
          </div>

        </div>
      </div>
    </footer>
  );
}
