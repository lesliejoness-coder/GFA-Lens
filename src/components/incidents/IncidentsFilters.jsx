import { PRIORITES, STATUTS, AGENCES } from "./incidentsData";

const T = {
  fr: { search: "Rechercher un incident...", allPrio: "Toutes priorités", allStatut: "Tous statuts", allAgence: "Toutes agences", reset: "Réinitialiser" },
  en: { search: "Search an incident...",     allPrio: "All priorities",   allStatut: "All statuses",  allAgence: "All agencies",   reset: "Reset" },
  mg: { search: "Hikaroka olana...",          allPrio: "Laharam-pahamehana rehetra", allStatut: "Satus rehetra", allAgence: "Agence rehetra", reset: "Avereno" },
};

export default function IncidentsFilters({ filters, onChange, langue = "fr" }) {
  const t = T[langue] || T.fr;
  const set = (k) => (e) => onChange({ ...filters, [k]: e.target.value });

  const cls = "border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-2 text-sm bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all";

  const hasFilters = filters.search || filters.priorite || filters.statut || filters.agence;

  return (
    <div className="flex flex-wrap items-center gap-3 mb-5">
      <div className="relative flex-1 min-w-48">
        <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input value={filters.search} onChange={set("search")} placeholder={t.search} className={cls + " pl-9 w-full"} />
      </div>

      <select value={filters.priorite} onChange={set("priorite")} className={cls}>
        <option value="">{t.allPrio}</option>
        {PRIORITES.map((p) => <option key={p}>{p}</option>)}
      </select>

      <select value={filters.statut} onChange={set("statut")} className={cls}>
        <option value="">{t.allStatut}</option>
        {STATUTS.map((s) => <option key={s}>{s}</option>)}
      </select>

      <select value={filters.agence} onChange={set("agence")} className={cls}>
        <option value="">{t.allAgence}</option>
        {AGENCES.map((a) => <option key={a}>{a}</option>)}
      </select>

      {hasFilters && (
        <button onClick={() => onChange({ search: "", priorite: "", statut: "", agence: "" })}
          className="text-xs text-gray-400 hover:text-red-500 underline transition-colors">
          {t.reset}
        </button>
      )}
    </div>
  );
}
