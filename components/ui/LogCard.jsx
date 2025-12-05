export function LogCard({ attack }) {
    return (
        <div className="p-4 bg-black/20 rounded-xl border border-white/10 backdrop-blur-lg shadow-lg">
            <p className="text-lg font-bold">{attack.type}</p>
            <p className="text-sm opacity-80">{attack.timestamp}</p>
            <p className="mt-2 text-sm">{attack.description}</p>
        </div>
    );
}
