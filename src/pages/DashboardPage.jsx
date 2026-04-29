import { useState } from "react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer,
} from "recharts";
import { useAppSettings } from "../contexts/AppSettingsContext";

const chartData = [
  { mois: "Oct", incidents: 12 },
  { mois: "Nov", incidents: 8 },
  { mois: "Déc", incidents: 15 },
  { mois: "Jan", incidents: 6 },
  { mois: "Fév", incidents: 10 },
  { mois: "Mar", incidents: 4 },
];

const ALL_INCIDENTS = [
  { id: 1, titre: "Connexion impossible à GFA",     agence: "Agence Plateau",      priorite: "Critique", statut: "En cours",   date: "2025-03-10" },
  { id: 2, titre: "Lenteur sur les transactions",   agence: "Agence Bonapriso",    priorite: "Moyen",    statut: "Terminé",    date: "2025-03-05" },
  { id: 3, titre: "Erreur d'impression des reçus",  agence: "Agence Centre-ville", priorite: "Faible",   statut: "En attente", date: "2025-03-12" },
  { id: 4, titre: "Module rapport inaccessible",    agence: "Agence Yopougon",     priorite: "Critique", statut: "En attente", date: "2025-03-13" },
];

const agences = [
  { nom: "Agence Plateau",      filiale: "Filiale Abidjan", statut: "Active",   dispo: "99.1%" },
  { nom: "Agence Bonapriso",    filiale: "Filiale Douala",  statut: "Active",   dispo: "97.8%" },
  { nom: "Agence Centre-ville", filiale: "Filiale Douala",  statut: "Incident", dispo: "91.2%" },
  { nom: "Agence Yopougon",     filiale: "Filiale Abidjan", statut: "Active",   dispo: "98.5%" },
];

const T = {
  fr: {
    kpis: ["Filiales actives", "Agences total", "Disponibilité", "Incidents (mois)"],
    changes: ["+1", "+2", "+0.5%", "-8"],
    chartTitle: "Évolution des incidents (6 derniers mois)",
    agencesTitle: "Suivi des agences",
    agencesCols: ["Agence", "Filiale", "Statut", "Disponibilité"],
    incidentsTitle: "Incidents récents",
    incidentsCols: ["Titre", "Agence", "Priorité", "Statut", "Date"],
    search: "Rechercher...",
    noResult: "Aucun incident ne correspond à votre recherche.",
    statuts: { "En attente": "En attente", "En cours": "En cours", "Terminé": "Terminé" },
    priorites: { Critique: "Critique", Moyen: "Moyen", Faible: "Faible" },
    agenceStatuts: { Active: "Active", Incident: "Incident" },
    thisMois: "ce mois",
  },
  en: {
    kpis: ["Active Branches", "Total Agencies", "Availability", "Incidents (month)"],
    changes: ["+1", "+2", "+0.5%", "-8"],
    chartTitle: "Incident Trend (last 6 months)",
    agencesTitle: "Agency Overview",
    agencesCols: ["Agency", "Branch", "Status", "Availability"],
    incidentsTitle: "Recent Incidents",
    incidentsCols: ["Title", "Agency", "Priority", "Status", "Date"],
    search: "Search...",
    noResult: "No incident matches your search.",
    statuts: { "En attente": "Pending", "En cours": "In Progress", "Terminé": "Done" },
    priorites: { Critique: "Critical", Moyen: "Medium", Faible: "Low" },
    agenceStatuts: { Active: "Active", Incident: "Incident" },
    thisMois: "this month",
  },
  mg: {
    kpis: ["Filiale mavitrika", "Agence rehetra", "Fahazoan-dàlana", "Olana (volana)"],
    changes: ["+1", "+2", "+0.5%", "-8"],
    chartTitle: "Fivoaran'ny olana (6 volana lasa)",
    agencesTitle: "Fanaraha-maso ny agence",
    agencesCols: ["Agence", "Filiale", "Toe-javatra", "Fahazoan-dàlana"],
    incidentsTitle: "Olana farany teo",
    incidentsCols: ["Lohateny", "Agence", "Laharam-pahamehan'", "Toe-javatra", "Daty"],
    search: "Hikaroka...",
    noResult: "Tsy misy olana mifanaraka amin'ny fikarohana.",
    statuts: { "En attente": "Miandry", "En cours": "Eo am-pandehanana", "Terminé": "Vita" },
    priorites: { Critique: "Maika", Moyen: "Antonony", Faible: "Ambany" },
    agenceStatuts: { Active: "Mavitrika", Incident: "Olana" },
    thisMois: "ity volana ity",
  },
};

const kpiValues = [
  { value: "3",     up: true  },
  { value: "12",    up: true  },
  { value: "98.2%", up: true  },
  { value: "4",     up: false },
];

const priorityColors = {
  Critique: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300",
  Moyen:    "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300",
  Faible:   "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300",
};

const statutColors = {
  "En attente": "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300",
  "En cours":   "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
  "Terminé":    "bg-teal-100 text-teal-700 dark:bg-teal-900/40 dark:text-teal-300",
};

export default function DashboardPage() {
  const [search, setSearch] = useState("");
  const { langue } = useAppSettings();
  const t = T[langue] || T.fr;

  const filtered = ALL_INCIDENTS.filter((inc) => {
    const q = search.toLowerCase();
    return (
      inc.titre.toLowerCase().includes(q) ||
      inc.agence.toLowerCase().includes(q) ||
      inc.statut.toLowerCase().includes(q) ||
      inc.priorite.toLowerCase().includes(q)
    );
  });

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {t.kpis.map((label, i) => (
          <div key={label} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 transition-colors duration-300">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{label}</p>
            <p className="text-2xl font-bold text-blue-900 dark:text-blue-400">{kpiValues[i].value}</p>
            <p className={`text-xs mt-1 font-medium ${kpiValues[i].up ? "text-green-600 dark:text-green-400" : "text-red-500 dark:text-red-400"}`}>
              {t.changes[i]} {t.thisMois}
            </p>
          </div>
        ))}
      </div>

      {/* Graphique */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 transition-colors duration-300">
        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-4">{t.chartTitle}</h3>
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="mois" tick={{ fontSize: 12, fill: "#9ca3af" }} />
            <YAxis tick={{ fontSize: 12, fill: "#9ca3af" }} />
            <Tooltip formatter={(v) => [v, "Incidents"]} contentStyle={{ fontSize: 12, borderRadius: 8, backgroundColor: "#1f2937", border: "1px solid #374151", color: "#f9fafb" }} />
            <Area type="monotone" dataKey="incidents" stroke="#3b82f6" fill="#1e3a8a33" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Tableau agences */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden transition-colors duration-300">
        <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-200">{t.agencesTitle}</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 dark:bg-gray-700/50">
              <tr>
                {t.agencesCols.map((h) => (
                  <th key={h} className="text-left py-3 px-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {agences.map((a, i) => (
                <tr key={i} className="border-t border-gray-50 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                  <td className="py-3 px-4 font-medium text-gray-900 dark:text-gray-100">{a.nom}</td>
                  <td className="py-3 px-4 text-gray-500 dark:text-gray-400">{a.filiale}</td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${a.statut === "Active" ? "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300" : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300"}`}>
                      {t.agenceStatuts[a.statut] || a.statut}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-medium text-blue-900 dark:text-blue-400">{a.dispo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Incidents récents */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden transition-colors duration-300">
        <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between gap-4 flex-wrap">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-200">{t.incidentsTitle}</h3>
          <div className="flex items-center gap-3">
            <div className="relative">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder={t.search}
                className="pl-9 pr-4 py-1.5 border border-gray-200 dark:border-gray-600 rounded-lg text-sm bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 w-48 transition-colors" />
              {search && <button onClick={() => setSearch("")} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500">✕</button>}
            </div>
            <span className="text-xs text-gray-400 dark:text-gray-500">{filtered.length} / {ALL_INCIDENTS.length}</span>
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="py-10 text-center text-sm text-gray-400 dark:text-gray-500">{t.noResult}</div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50 dark:bg-gray-700/50">
              <tr>
                {t.incidentsCols.map((h) => (
                  <th key={h} className="text-left py-3 px-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((inc, i) => (
                <tr key={inc.id} className={`border-t border-gray-50 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors ${i % 2 === 0 ? "bg-white dark:bg-gray-800" : "bg-gray-50/50 dark:bg-gray-750"}`}>
                  <td className="py-3 px-4 font-medium text-gray-900 dark:text-gray-100 max-w-xs truncate">{inc.titre}</td>
                  <td className="py-3 px-4 text-gray-500 dark:text-gray-400 text-xs">{inc.agence}</td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-semibold ${priorityColors[inc.priorite] || "bg-gray-100 text-gray-600"}`}>
                      {t.priorites[inc.priorite] || inc.priorite}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-semibold ${statutColors[inc.statut] || "bg-gray-100 text-gray-600"}`}>
                      {t.statuts[inc.statut] || inc.statut}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-400 dark:text-gray-500 text-xs">{inc.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
