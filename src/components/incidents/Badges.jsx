// ── Badge Priorité ─────────────────────────────────────────────────
const PRIORITE_STYLES = {
  Critique: "bg-red-100 text-red-700 ring-1 ring-red-300 dark:bg-red-900/40 dark:text-red-300 dark:ring-red-700",
  Moyen:    "bg-orange-100 text-orange-700 ring-1 ring-orange-300 dark:bg-orange-900/40 dark:text-orange-300 dark:ring-orange-700",
  Faible:   "bg-green-100 text-green-700 ring-1 ring-green-300 dark:bg-green-900/40 dark:text-green-300 dark:ring-green-700",
};
const PRIORITE_DOT = {
  Critique: "bg-red-500",
  Moyen:    "bg-orange-500",
  Faible:   "bg-green-500",
};

export function PrioriteBadge({ value }) {
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${PRIORITE_STYLES[value] || "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400"}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${PRIORITE_DOT[value] || "bg-gray-400"}`} />
      {value}
    </span>
  );
}

// ── Badge Statut ───────────────────────────────────────────────────
const STATUT_STYLES = {
  "En attente": "bg-yellow-100 text-yellow-700 ring-1 ring-yellow-300 dark:bg-yellow-900/40 dark:text-yellow-300 dark:ring-yellow-700",
  "En cours":   "bg-blue-100 text-blue-700 ring-1 ring-blue-300 dark:bg-blue-900/40 dark:text-blue-300 dark:ring-blue-700",
  "Terminé":    "bg-teal-100 text-teal-700 ring-1 ring-teal-300 dark:bg-teal-900/40 dark:text-teal-300 dark:ring-teal-700",
};

export function StatutBadge({ value }) {
  return (
    <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold ${STATUT_STYLES[value] || "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400"}`}>
      {value}
    </span>
  );
}

// ── Badge Transféré ────────────────────────────────────────────────
export function TransfereBadge() {
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-purple-100 text-purple-700 ring-1 ring-purple-300 dark:bg-purple-900/40 dark:text-purple-300 dark:ring-purple-700">
      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
      </svg>
      Transféré
    </span>
  );
}
