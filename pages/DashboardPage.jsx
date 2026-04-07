import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const chartData = [
  { mois: "Oct", transactions: 4200, incidents: 12 },
  { mois: "Nov", transactions: 5800, incidents: 8 },
  { mois: "Déc", transactions: 7200, incidents: 15 },
  { mois: "Jan", transactions: 6100, incidents: 6 },
  { mois: "Fév", transactions: 8900, incidents: 10 },
  { mois: "Mar", transactions: 9400, incidents: 4 },
];

const kpis = [
  { label: "Filiales actives", value: "3", change: "+1", up: true },
  { label: "Agences total", value: "12", change: "+2", up: true },
  { label: "Disponibilité", value: "98.2%", change: "+0.5%", up: true },
  { label: "Incidents (mois)", value: "4", change: "-8", up: false },
];

const agences = [
  { nom: "Agence Plateau", filiale: "AFGBank CI", statut: "Active", dispo: "99.1%" },
  { nom: "Agence Bonapriso", filiale: "AFGBank Douala", statut: "Active", dispo: "98.7%" },
  { nom: "Agence Centre-ville", filiale: "AFGBank Cameroun", statut: "Active", dispo: "97.3%" },
  { nom: "Agence Yopougon", filiale: "AFGBank CI", statut: "Maintenance", dispo: "72.0%" },
];

export default function DashboardPage() {
  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map(k => (
          <div key={k.label} className="bg-white rounded-xl border border-gray-200 p-5">
            <p className="text-sm text-gray-500 mb-1">{k.label}</p>
            <p className="text-2xl font-bold text-blue-900">{k.value}</p>
            <p className={`text-xs mt-1 font-medium ${k.up ? "text-green-600" : "text-red-500"}`}>{k.change} ce mois</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-sm font-semibold text-gray-700 mb-4">Évolution des transactions (6 derniers mois)</h3>
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="mois" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip />
            <Area type="monotone" dataKey="transactions" stroke="#1e3a8a" fill="#dbeafe" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h3 className="text-sm font-semibold text-gray-700">Suivi des agences</h3>
        </div>
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              {["Agence", "Filiale", "Statut", "Disponibilité"].map(h => (
                <th key={h} className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {agences.map((a, i) => (
              <tr key={i} className="border-t border-gray-50 hover:bg-gray-50 transition-colors">
                <td className="py-3 px-4 font-medium text-gray-900">{a.nom}</td>
                <td className="py-3 px-4 text-gray-500">{a.filiale}</td>
                <td className="py-3 px-4">
                  <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${a.statut === "Active" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}>
                    {a.statut}
                  </span>
                </td>
                <td className="py-3 px-4 font-medium text-blue-900">{a.dispo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
