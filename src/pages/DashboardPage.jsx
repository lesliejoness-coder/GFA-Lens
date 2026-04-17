import { useState } from "react";
import {
  AreaChart, Area, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";

const chartData = [
  { mois: "Oct", incidents: 12 },
  { mois: "Nov", incidents: 8  },
  { mois: "Déc", incidents: 15 },
  { mois: "Jan", incidents: 6  },
  { mois: "Fév", incidents: 10 },
  { mois: "Mar", incidents: 4  },
];

const kpis = [
  { label: "Filiales actives", value: "3",     change: "+1",    up: true  },
  { label: "Agences total",    value: "12",    change: "+2",    up: true  },
  { label: "Disponibilité",    value: "98.2%", change: "+0.5%", up: true  },
  { label: "Incidents (mois)", value: "4",     change: "-8",    up: false },
];

const ALL_INCIDENTS = [
  { id: 1, titre: "Connexion impossible à GFA",    agence: "Agence Plateau",      priorite: "Critique", statut: "En cours",   date: "2025-03-10" },
  { id: 2, titre: "Lenteur sur les transactions",  agence: "Agence Bonapriso",    priorite: "Moyen",    statut: "Terminé",    date: "2025-03-05" },
  { id: 3, titre: "Erreur d'impression des reçus", agence: "Agence Centre-ville", priorite: "Faible",   statut: "En attente", date: "2025-03-12" },
  { id: 4, titre: "Module rapport inaccessible",   agence: "Agence Yopougon",     priorite: "Critique", statut: "En attente", date: "2025-03-13" },
];

// ── Badges inline (pas d'import externe nécessaire) ───────────────
function PrioriteBadge({ value }) {
  const s = {
    Critique: "bg-red-100 text-red-700",
    Moyen:    "bg-orange-100 text-orange-700",
    Faible:   "bg-green-100 text-green-700",
  };
  return (
    <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-semibold
      ${s[value] || "bg-gray-100 text-gray-600"}`}>
      {value}
    </span>
  );
}

function StatutBadge({ value }) {
  const s = {
    "En attente": "bg-yellow-100 text-yellow-700",
    "En cours":   "bg-blue-100 text-blue-700",
    "Terminé":    "bg-teal-100 text-teal-700",
  };
  return (
    <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-semibold
      ${s[value] || "bg-gray-100 text-gray-600"}`}>
      {value}
    </span>
  );
}

// ── Composant principal ───────────────────────────────────────────
export default function DashboardPage() {
  const [search, setSearch] = useState("");

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
    <div className="flex-1 overflow-y-auto p-6 space-y-6">

      {/* ── KPI Cards ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((k) => (
          <div key={k.label} className="bg-white rounded-xl border border-gray-200 p-5">
            <p className="text-sm text-gray-500 mb-1">{k.label}</p>
            <p className="text-2xl font-bold text-blue-900">{k.value}</p>
            <p className={`text-xs mt-1 font-medium
              ${k.up ? "text-green-600" : "text-red-500"}`}>
              {k.change} ce mois
            </p>
          </div>
        ))}
      </div>

      {/* ── Graphique ── */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-sm font-semibold text-gray-700 mb-4">
          Évolution des incidents (6 derniers mois)
        </h3>
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="mois" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip
              formatter={(v) => [v, "Incidents"]}
              contentStyle={{ fontSize: 12, borderRadius: 8 }}
            />
            <Area type="monotone" dataKey="incidents"
              stroke="#1e3a8a" fill="#dbeafe" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* ── Incidents récents avec barre de recherche ── */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">

        {/* En-tête + recherche */}
        <div className="px-6 py-4 border-b border-gray-100 flex items-center
                        justify-between gap-4 flex-wrap">
          <h3 className="text-sm font-semibold text-gray-700">Incidents récents</h3>

          <div className="flex items-center gap-3">
            {/* Barre de recherche */}
            <div className="relative">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
                fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Rechercher..."
                className="pl-9 pr-4 py-1.5 border border-gray-200 rounded-lg text-sm
                           bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400
                           focus:border-transparent w-48 transition-all"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2
                             text-gray-300 hover:text-gray-500 transition-colors">
                  ✕
                </button>
              )}
            </div>

            <span className="text-xs text-gray-400">
              {filtered.length} / {ALL_INCIDENTS.length}
            </span>
          </div>
        </div>

        {/* Tableau */}
        {filtered.length === 0 ? (
          <div className="py-10 text-center text-sm text-gray-400">
            Aucun incident ne correspond à votre recherche.
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                {["Titre", "Agence", "Priorité", "Statut", "Date"].map((h) => (
                  <th key={h}
                    className="text-left py-3 px-4 text-xs font-semibold
                               text-gray-500 uppercase">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((inc, i) => (
                <tr key={inc.id}
                  className={`border-t border-gray-50 hover:bg-gray-50 transition-colors
                    ${i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}`}>
                  <td className="py-3 px-4 font-medium text-gray-900 max-w-xs truncate">
                    {inc.titre}
                  </td>
                  <td className="py-3 px-4 text-gray-500 text-xs">{inc.agence}</td>
                  <td className="py-3 px-4">
                    <PrioriteBadge value={inc.priorite} />
                  </td>
                  <td className="py-3 px-4">
                    <StatutBadge value={inc.statut} />
                  </td>
                  <td className="py-3 px-4 text-gray-400 text-xs">{inc.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

    </div>
  );
}
