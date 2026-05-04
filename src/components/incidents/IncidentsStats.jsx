const T = {
  fr: { total: "Total", enAttente: "En attente", enCours: "En cours", termines: "Terminés", critiques: "Critiques" },
  en: { total: "Total", enAttente: "Pending",    enCours: "In Progress", termines: "Resolved", critiques: "Critical" },
  mg: { total: "Rehetra", enAttente: "Miandry",  enCours: "Eo am-pandehanana", termines: "Vita", critiques: "Maika" },
};

export default function IncidentsStats({ incidents, langue = "fr" }) {
  const t = T[langue] || T.fr;
  const total     = incidents.length;
  const enAttente = incidents.filter((i) => i.statut === "En attente").length;
  const enCours   = incidents.filter((i) => i.statut === "En cours").length;
  const termines  = incidents.filter((i) => i.statut === "Terminé").length;
  const critiques = incidents.filter((i) => i.priorite === "Critique").length;

  const cards = [
    { label: t.total,     value: total,     bg: "bg-blue-900 dark:bg-blue-950",                              text: "text-white",                                        icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" },
    { label: t.enAttente, value: enAttente, bg: "bg-yellow-50 border border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-800", text: "text-yellow-800 dark:text-yellow-300", icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" },
    { label: t.enCours,   value: enCours,   bg: "bg-blue-50 border border-blue-200 dark:bg-blue-900/20 dark:border-blue-800",       text: "text-blue-800 dark:text-blue-300",   icon: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" },
    { label: t.termines,  value: termines,  bg: "bg-teal-50 border border-teal-200 dark:bg-teal-900/20 dark:border-teal-800",       text: "text-teal-800 dark:text-teal-300",   icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" },
    { label: t.critiques, value: critiques, bg: "bg-red-50 border border-red-200 dark:bg-red-900/20 dark:border-red-800",           text: "text-red-800 dark:text-red-300",     icon: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
      {cards.map((c) => (
        <div key={c.label} className={`rounded-xl p-4 ${c.bg} ${c.text} transition-colors duration-300`}>
          <svg className="w-5 h-5 opacity-70 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={c.icon} />
          </svg>
          <p className="text-2xl font-bold">{c.value}</p>
          <p className="text-xs font-medium opacity-70 mt-0.5">{c.label}</p>
        </div>
      ))}
    </div>
  );
}
