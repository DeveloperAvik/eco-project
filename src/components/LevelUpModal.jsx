export default function LevelUpModal({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 animate-fadeIn">
      <div className="glass-holo p-10 rounded-2xl text-center shadow-[0_0_40px_#00ffcc] border border-green-400/40">
        <h2 className="text-4xl text-green-300 drop-shadow-glow mb-3">
          LEVEL UP! 🔥
        </h2>
        <p className="text-gray-300 mb-4">You've reached a new eco level.</p>

        <button
          onClick={onClose}
          className="px-6 py-2 bg-green-500 text-black rounded-lg shadow-lg hover:bg-green-600"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
