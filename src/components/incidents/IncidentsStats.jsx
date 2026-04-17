export default function IncidentsStats({ incidents }) {
  const total     = incidents.length;
  const enAttente = incidents.filter((i) => i.statut === "En attente").length;
  const enCours   = incidents.filter((i) => i.statut === "En cours").length;
  const termines  = incidents.filter((i) => i.statut === "Terminé").length;
  const critiques = incidents.filter((i) => i.priorite === "Critique").length;

  const cards = [
    {
      label: "Total", value: total,
      bg: "bg-blue-900", text: "text-white",
      icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2",
    },
    {
      label: "En attente", value: enAttente,
      bg: "bg-yellow-50 border border-yellow-200", text: "text-yellow-800",
      icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
    },
    {
      label: "En cours", value: enCours,
      bg: "bg-blue-50 border border-blue-200", text: "text-blue-800",
      icon: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15",
    },
    {
      label: "Terminés", value: termines,
      bg: "bg-teal-50 border border-teal-200", text: "text-teal-800",
      icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
    },
    {
      label: "Critiques", value: critiques,
      bg: "bg-red-50 border border-red-200", text: "text-red-800",
      icon: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z",
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
      {cards.map((c) => (
        <div key={c.label} className={`rounded-xl p-4 ${c.bg} ${c.text}`}>
          <svg className="w-5 h-5 opacity-70 mb-3" fill="none"
            stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={c.icon} />
          </svg>
          <p className="text-2xl font-bold">{c.value}</p>
          <p className="text-xs font-medium opacity-70 mt-0.5">{c.label}</p>
        </div>
      ))}
    </div>
  );
}
