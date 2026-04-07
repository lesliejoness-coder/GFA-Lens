import { useState } from "react";
import { BarChart, Bar, PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { mockRapports } from "../data/mockData";

const barData = [
  { mois: "Oct", mensuel: 4, hebdo: 12, incidents: 2 },
  { mois: "Nov", mensuel: 4, hebdo: 13, incidents: 1 },
  { mois: "Déc", mensuel: 4, hebdo: 14, incidents: 5 },
  { mois: "Jan", mensuel: 4, hebdo: 13, incidents: 3 },
  { mois: "Fév", mensuel: 4, hebdo: 11, incidents: 2 },
  { mois: "Mar", mensuel: 5, hebdo: 14, incidents: 1 },
];

const pieData = [
  { name: "Mensuel", value: 35, color: "#1e3a8a" },
  { name: "Hebdomadaire", value: 40, color: "#3b82f6" },
  { name: "Trimestriel", value: 10, color: "#60a5fa" },
  { name: "Incident", value: 8, color: "#ef4444" },
  { name: "Audit", value: 4, color: "#f59e0b" },
  { name: "Annuel", value: 3, color: "#8b5cf6" },
];

const lineData = [
  { mois: "Oct", dispo: 96.2 },
  { mois: "Nov", dispo: 97.8 },
  { mois: "Déc", dispo: 95.1 },
  { mois: "Jan", dispo: 98.3 },
  { mois: "Fév", dispo: 97.9 },
  { mois: "Mar", dispo: 98.2 },
];

const TYPES = ["Tous", "Mensuel", "Hebdomadaire", "Trimestriel", "Annuel", "Incident", "Audit"];
const STATUTS = { Généré: "bg-green-100 text-green-800", "En attente": "bg-yellow-100 text-yellow-800", "En cours": "bg-blue-100 text-blue-800" };

export default function RapportsPage() {
  const [typeFiltre, setTypeFiltre] = useState("Tous");
  const [search, setSearch] = useState("");
  const [detail, setDetail] = useState(null);

  const filtered = mockRapports.filter(r =>
    (typeFiltre === "Tous" || r.type === typeFiltre) &&
    r.titre.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50">
      <div className="px-6 py-5 bg-white border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Rapports</h1>
            <p className="text-sm text-gray-500 mt-0.5">Génération et consultation des rapports</p>
          </div>
          <button className="px-4 py-2.5 bg-blue-900 text-white text-sm font-medium rounded-xl hover:bg-blue-800 transition-colors">
            + Générer un rapport
          </button>
        </div>
      </div>

      <div className="p-6 space-y-6">
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <p className="text-sm text-gray-500 mb-1">Total rapports</p>
            <p className="text-2xl font-bold text-blue-900">{mockRapports.length}</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <p className="text-sm text-gray-500 mb-1">Générés</p>
            <p className="text-2xl font-bold text-green-600">{mockRapports.filter(r => r.statut === "Généré").length}</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <p className="text-sm text-gray-500 mb-1">En attente / En cours</p>
            <p className="text-2xl font-bold text-yellow-600">{mockRapports.filter(r => r.statut !== "Généré").length}</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2 bg-white rounded-xl border border-gray-200 p-5">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Rapports générés par mois</h3>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="mois" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Legend />
                <Bar dataKey="mensuel" name="Mensuel" fill="#1e3a8a" radius={[4,4,0,0]} />
                <Bar dataKey="hebdo" name="Hebdo" fill="#60a5fa" radius={[4,4,0,0]} />
                <Bar dataKey="incidents" name="Incidents" fill="#ef4444" radius={[4,4,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Répartition par type</h3>
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" outerRadius={65} dataKey="value">
                  {pieData.map((e, i) => <Cell key={i} fill={e.color} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Taux de disponibilité (6 mois)</h3>
          <ResponsiveContainer width="100%" height={150}>
            <LineChart data={lineData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="mois" tick={{ fontSize: 12 }} />
              <YAxis domain={[90, 100]} tick={{ fontSize: 12 }} />
              <Tooltip />
              <Line type="monotone" dataKey="dispo" stroke="#1e3a8a" strokeWidth={2} dot={{ r: 4 }} name="Disponibilité %" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-3">
            <input type="text" placeholder="Rechercher un rapport..." value={search} onChange={e => setSearch(e.target.value)}
              className="flex-1 max-w-sm px-4 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50" />
            <div className="flex gap-2 flex-wrap">
              {TYPES.map(t => (
                <button key={t} onClick={() => setTypeFiltre(t)}
                  className={`px-3 py-1.5 rounded-lg text-xs transition-colors ${typeFiltre === t ? "bg-blue-900 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
                  {t}
                </button>
              ))}
            </div>
          </div>
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>{["Rapport", "Type", "Date", "Filiale", "Incidents", "Dispo", "Statut", "Actions"].map(h =>
                <th key={h} className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">{h}</th>)}</tr>
            </thead>
            <tbody>
              {filtered.map(r => (
                <tr key={r.id} className="border-t border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="py-3 px-4">
                    <p className="font-medium text-gray-900">{r.titre}</p>
                    <p className="text-xs text-gray-400">Par {r.generePar}</p>
                  </td>
                  <td className="py-3 px-4"><span className="px-2 py-0.5 bg-blue-100 text-blue-800 text-xs rounded-full">{r.type}</span></td>
                  <td className="py-3 px-4 text-gray-500">{r.dateGeneration}</td>
                  <td className="py-3 px-4 text-gray-600">{r.filiale}</td>
                  <td className="py-3 px-4 text-gray-700 font-medium">{r.incidents}</td>
                  <td className="py-3 px-4 font-medium text-blue-900">{r.disponibilite}</td>
                  <td className="py-3 px-4"><span className={`px-2 py-0.5 rounded-full text-xs font-medium ${STATUTS[r.statut] || "bg-gray-100 text-gray-700"}`}>{r.statut}</span></td>
                  <td className="py-3 px-4">
                    <div className="flex gap-2">
                      <button onClick={() => setDetail(r)} className="text-xs text-blue-600 hover:underline">Voir</button>
                      {r.statut === "Généré" && <button className="text-xs text-gray-500 hover:underline">PDF</button>}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {detail && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg">
            <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100">
              <h3 className="font-semibold text-gray-900">{detail.titre}</h3>
              <button onClick={() => setDetail(null)} className="text-gray-400 hover:text-gray-700 text-xl">×</button>
            </div>
            <div className="p-6 space-y-3">
              {[["Type", detail.type], ["Date", detail.dateGeneration], ["Filiale", detail.filiale], ["Agence", detail.agence], ["Incidents", detail.incidents], ["Disponibilité", detail.disponibilite], ["Statut", detail.statut], ["Taille", detail.taille]].map(([k, v]) => (
                <div key={k} className="flex justify-between text-sm">
                  <span className="text-gray-500">{k}</span>
                  <span className="font-medium text-gray-900">{v}</span>
                </div>
              ))}
            </div>
            <div className="flex gap-3 px-6 pb-6">
              {detail.formats.map(f => (
                <button key={f} className="flex-1 py-2 border border-blue-200 text-blue-700 rounded-xl text-sm hover:bg-blue-50">Exporter {f}</button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
