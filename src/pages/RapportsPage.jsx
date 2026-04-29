import { useState } from "react";
import {
  BarChart, Bar, PieChart, Pie, Cell, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from "recharts";
import { mockRapports } from "../data/mockData";
import { useAppSettings } from "../contexts/AppSettingsContext";

const T = {
  fr: {
    title: "Rapports",
    subtitle: "Génération et consultation des rapports",
    newBtn: "+ Générer un rapport",
    kpi1: "Total rapports",
    kpi2: "Générés",
    kpi3: "En attente / En cours",
    chartBar: "Rapports générés par mois",
    chartPie: "Répartition par type",
    chartLine: "Taux de disponibilité (6 mois)",
    searchPlaceholder: "Rechercher un rapport...",
    tableCols: ["Rapport", "Type", "Date", "Filiale", "Incidents", "Dispo", "Statut", "Actions"],
    par: "Par",
    see: "Voir",
    pdf: "PDF",
    filterAll: "Tous",
    export: "Exporter",
    statuts: { Généré: "Généré", "En attente": "En attente", "En cours": "En cours" },
  },
  en: {
    title: "Reports",
    subtitle: "Report generation and consultation",
    newBtn: "+ Generate report",
    kpi1: "Total reports",
    kpi2: "Generated",
    kpi3: "Pending / In progress",
    chartBar: "Reports generated per month",
    chartPie: "Distribution by type",
    chartLine: "Availability rate (6 months)",
    searchPlaceholder: "Search a report...",
    tableCols: ["Report", "Type", "Date", "Branch", "Incidents", "Avail.", "Status", "Actions"],
    par: "By",
    see: "View",
    pdf: "PDF",
    filterAll: "All",
    export: "Export",
    statuts: { Généré: "Generated", "En attente": "Pending", "En cours": "In Progress" },
  },
  mg: {
    title: "Tatitra",
    subtitle: "Famoronana sy fitazomana tatitra",
    newBtn: "+ Mamorona tatitra",
    kpi1: "Tatitra rehetra",
    kpi2: "Novolavolaina",
    kpi3: "Miandry / Eo am-pandehanana",
    chartBar: "Tatitra novolavolaina isam-bolana",
    chartPie: "Fizarana araka ny karazana",
    chartLine: "Tahan'ny fahafahana (6 volana)",
    searchPlaceholder: "Hikaroka tatitra...",
    tableCols: ["Tatitra", "Karazana", "Daty", "Filiale", "Olana", "Fahafahana", "Toe-javatra", "Hetsika"],
    par: "Nataon'i",
    see: "Hijery",
    pdf: "PDF",
    filterAll: "Rehetra",
    export: "Anatontany",
    statuts: { Généré: "Vita", "En attente": "Miandry", "En cours": "Eo am-pandehanana" },
  },
};

const barData = [
  { mois: "Oct", mensuel: 4, hebdo: 12, incidents: 2 },
  { mois: "Nov", mensuel: 4, hebdo: 13, incidents: 1 },
  { mois: "Déc", mensuel: 4, hebdo: 14, incidents: 5 },
  { mois: "Jan", mensuel: 4, hebdo: 13, incidents: 3 },
  { mois: "Fév", mensuel: 4, hebdo: 11, incidents: 2 },
  { mois: "Mar", mensuel: 5, hebdo: 14, incidents: 1 },
];

const pieData = [
  { name: "Mensuel",        value: 35, color: "#1e3a8a" },
  { name: "Hebdomadaire",   value: 40, color: "#3b82f6" },
  { name: "Trimestriel",    value: 10, color: "#60a5fa" },
  { name: "Incident",       value: 8,  color: "#ef4444" },
  { name: "Audit",          value: 4,  color: "#f59e0b" },
  { name: "Annuel",         value: 3,  color: "#8b5cf6" },
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

const STATUT_STYLES = {
  Généré:       "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300",
  "En attente": "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300",
  "En cours":   "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300",
};

const tooltipStyle = {
  fontSize: 12,
  borderRadius: 8,
  backgroundColor: "#1f2937",
  border: "1px solid #374151",
  color: "#f9fafb",
};

export default function RapportsPage() {
  const [typeFiltre, setTypeFiltre] = useState("Tous");
  const [search, setSearch] = useState("");
  const [detail, setDetail] = useState(null);
  const { langue } = useAppSettings();
  const t = T[langue] || T.fr;

  const filtered = mockRapports.filter(r =>
    (typeFiltre === "Tous" || r.type === typeFiltre) &&
    r.titre.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Header */}
      <div className="px-6 py-5 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 transition-colors">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">{t.title}</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{t.subtitle}</p>
          </div>
          <button className="px-4 py-2.5 bg-blue-900 text-white text-sm font-medium rounded-xl hover:bg-blue-800 transition-colors">
            {t.newBtn}
          </button>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* KPI Cards */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: t.kpi1, value: mockRapports.length, color: "text-blue-900 dark:text-blue-400" },
            { label: t.kpi2, value: mockRapports.filter(r => r.statut === "Généré").length, color: "text-green-600 dark:text-green-400" },
            { label: t.kpi3, value: mockRapports.filter(r => r.statut !== "Généré").length, color: "text-yellow-600 dark:text-yellow-400" },
          ].map(({ label, value, color }) => (
            <div key={label} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 transition-colors">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{label}</p>
              <p className={`text-2xl font-bold ${color}`}>{value}</p>
            </div>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 transition-colors">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-3">{t.chartBar}</h3>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="mois" tick={{ fontSize: 12, fill: "#9ca3af" }} />
                <YAxis tick={{ fontSize: 12, fill: "#9ca3af" }} />
                <Tooltip contentStyle={tooltipStyle} />
                <Legend wrapperStyle={{ fontSize: 12, color: "#9ca3af" }} />
                <Bar dataKey="mensuel"  name="Mensuel"   fill="#1e3a8a" radius={[4,4,0,0]} />
                <Bar dataKey="hebdo"    name="Hebdo"     fill="#60a5fa" radius={[4,4,0,0]} />
                <Bar dataKey="incidents" name="Incidents" fill="#ef4444" radius={[4,4,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 transition-colors">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-3">{t.chartPie}</h3>
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" outerRadius={65} dataKey="value">
                  {pieData.map((e, i) => <Cell key={i} fill={e.color} />)}
                </Pie>
                <Tooltip contentStyle={tooltipStyle} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Line Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 transition-colors">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-3">{t.chartLine}</h3>
          <ResponsiveContainer width="100%" height={150}>
            <LineChart data={lineData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="mois" tick={{ fontSize: 12, fill: "#9ca3af" }} />
              <YAxis domain={[90, 100]} tick={{ fontSize: 12, fill: "#9ca3af" }} />
              <Tooltip contentStyle={tooltipStyle} />
              <Line type="monotone" dataKey="dispo" stroke="#3b82f6" strokeWidth={2} dot={{ r: 4 }} name="Disponibilité %" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Table */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden transition-colors">
          <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700 flex items-center gap-3 flex-wrap">
            <input
              type="text"
              placeholder={t.searchPlaceholder}
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="flex-1 max-w-sm px-4 py-2 text-sm border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-colors"
            />
            <div className="flex gap-2 flex-wrap">
              {TYPES.map(tp => (
                <button key={tp} onClick={() => setTypeFiltre(tp)}
                  className={`px-3 py-1.5 rounded-lg text-xs transition-colors ${typeFiltre === tp ? "bg-blue-900 text-white" : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"}`}>
                  {tp}
                </button>
              ))}
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 dark:bg-gray-700/50">
                <tr>
                  {t.tableCols.map(h => (
                    <th key={h} className="text-left py-3 px-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map(r => (
                  <tr key={r.id} className="border-t border-gray-50 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                    <td className="py-3 px-4">
                      <p className="font-medium text-gray-900 dark:text-gray-100">{r.titre}</p>
                      <p className="text-xs text-gray-400 dark:text-gray-500">{t.par} {r.generePar}</p>
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300 text-xs rounded-full">{r.type}</span>
                    </td>
                    <td className="py-3 px-4 text-gray-500 dark:text-gray-400">{r.dateGeneration}</td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-400">{r.filiale}</td>
                    <td className="py-3 px-4 text-gray-700 dark:text-gray-300 font-medium">{r.incidents}</td>
                    <td className="py-3 px-4 font-medium text-blue-900 dark:text-blue-400">{r.disponibilite}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${STATUT_STYLES[r.statut] || "bg-gray-100 text-gray-700"}`}>
                        {t.statuts[r.statut] || r.statut}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <button onClick={() => setDetail(r)} className="text-xs text-blue-600 hover:underline">{t.see}</button>
                        {r.statut === "Généré" && <button className="text-xs text-gray-500 hover:underline">{t.pdf}</button>}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal détail */}
      {detail && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-lg transition-colors">
            <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100 dark:border-gray-700">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100">{detail.titre}</h3>
              <button onClick={() => setDetail(null)} className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 text-xl">×</button>
            </div>
            <div className="p-6 space-y-3">
              {[["Type", detail.type], ["Date", detail.dateGeneration], ["Filiale", detail.filiale], ["Agence", detail.agence], ["Incidents", detail.incidents], ["Disponibilité", detail.disponibilite], ["Statut", t.statuts[detail.statut] || detail.statut], ["Taille", detail.taille]].map(([k, v]) => (
                <div key={k} className="flex justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">{k}</span>
                  <span className="font-medium text-gray-900 dark:text-gray-100">{v}</span>
                </div>
              ))}
            </div>
            <div className="flex gap-3 px-6 pb-6">
              {detail.formats.map(f => (
                <button key={f} className="flex-1 py-2 border border-blue-200 dark:border-blue-700 text-blue-700 dark:text-blue-400 rounded-xl text-sm hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
                  {t.export} {f}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}