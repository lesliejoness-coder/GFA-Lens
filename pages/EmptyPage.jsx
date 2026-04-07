export default function EmptyPage({ title, icon = "🚧" }) {
  return (
    <div className="flex-1 flex items-center justify-center">
      <div className="text-center">
        <div className="text-6xl mb-4">{icon}</div>
        <h2 className="text-xl font-semibold text-gray-700 mb-2">{title}</h2>
        <p className="text-gray-400 text-sm">Cette section est en cours de développement</p>
      </div>
    </div>
  );
}
