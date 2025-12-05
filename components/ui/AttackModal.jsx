"use client";

export default function AttackModal({ attack, onClose, onSend }) {
    if (!attack) return null;

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="w-[420px] bg-black/50 border border-cyan-400/40 p-6 rounded-2xl shadow-2xl text-white">
                <h2 className="text-2xl font-bold mb-3 text-cyan-300">
                    {attack.type} Attack
                </h2>

                <p className="text-gray-300 text-sm mb-2">
                    <b>Timestamp:</b> {attack.time}
                </p>

                <p className="text-gray-300 mb-4">{attack.description}</p>

                <div className="flex justify-end gap-3 mt-6">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-600/40 rounded-xl hover:bg-gray-600/60 transition"
                    >
                        Close
                    </button>

                    <button
                        onClick={() => onSend(attack)}
                        className="px-4 py-2 bg-cyan-500 rounded-xl hover:bg-cyan-600 transition"
                    >
                        Send to Monitoring
                    </button>
                </div>
            </div>
        </div>
    );
}