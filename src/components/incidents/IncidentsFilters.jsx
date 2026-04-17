import { PRIORITES, STATUTS, AGENCES } from "./incidentsData";

export default function IncidentsFilters({ filters, onChange }) {
  const set = (k) => (e) => onChange({ ...filters, [k]: e.target.value });

  const cls =
    "border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white " +
    "focus:outline-none focus:ring-2 focus:ring-blue-400 " +
    "focus:border-transparent transition-all";

  const hasFilters =
    filters.search || filters.priorite || filters.statut || filters.agence;

  return (
    <div className="flex flex-wrap items-center gap-3 mb-5">

      {/* Recherche */}
      <div className="relative flex-1 min-w-48">
        <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
          fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          value={filters.search}
          onChange={set("search")}
          placeholder="Rechercher un incident..."
          className={cls + " pl-9 w-full"}
        />
      </div>

      {/* Filtre priorité */}
      <select value={filters.priorite} onChange={set("priorite")} className={cls}>
        <option value="">Toutes priorités</option>
        {PRIORITES.map((p) => <option key={p}>{p}</option>)}
      </select>

      {/* Filtre statut */}
      <select value={filters.statut} onChange={set("statut")} className={cls}>
        <option value="">Tous statuts</option>
        {STATUTS.map((s) => <option key={s}>{s}</option>)}
      </select>

      {/* Filtre agence */}
      <select value={filters.agence} onChange={set("agence")} className={cls}>
        <option value="">Toutes agences</option>
        {AGENCES.map((a) => <option key={a}>{a}</option>)}
      </select>

      {/* Reset */}
      {hasFilters && (
        <button
          onClick={() => onChange({ search: "", priorite: "", statut: "", agence: "" })}
          className="text-xs text-gray-400 hover:text-red-500 underline transition-colors"
        >
          Réinitialiser
        </button>
      )}
    </div>
  );
}
