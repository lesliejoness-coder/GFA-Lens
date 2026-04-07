import { useState } from "react";
import { mockFiliales } from "../data/mockData";

function Badge({ statut }) {
  const map = { Active: "bg-green-100 text-green-800", Inactive: "bg-gray-100 text-gray-600", Bloquée: "bg-red-100 text-red-800", Maintenance: "bg-yellow-100 text-yellow-800" };
  return <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${map[statut] || "bg-gray-100 text-gray-700"}`}>{statut}</span>;
}

function ModalCreerAgence({ onClose, filiales }) {
  const [form, setForm] = useState({ nom: "", localisation: "", type: "Secondaire", statut: "Active", telephone: "", email: "", responsable: "", filialeId: "", estGuichet: false });
  const s = (k, v) => setForm(p => ({ ...p, [k]: v }));
  const inp = "w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 focus:bg-white";
  const lbl = "block text-sm font-medium text-gray-700 mb-1";

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100">
          <h3 className="font-semibold text-gray-900">Créer une agence</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-700 text-xl">×</button>
        </div>
        <form onSubmit={e => { e.preventDefault(); alert(`Agence "${form.nom}" créée !`); onClose(); }}>
          <div className="p-6 space-y-4">
            <div><label className={lbl}>Nom de l'agence *</label>
              <input required placeholder="Ex: Agence Bonapriso" value={form.nom} onChange={e => s("nom", e.target.value)} className={inp} />
            </div>
            <div><label className={lbl}>Filiale parente *</label>
              <select required value={form.filialeId} onChange={e => s("filialeId", e.target.value)} className={inp}>
                <option value="">— Sélectionner une filiale</option>
                {filiales.map(f => <option key={f.id} value={f.id}>{f.nom}</option>)}
                {filiales.flatMap(f => f.sousFiliales || []).map(sf => <option key={sf.id} value={sf.id}>↳ {sf.nom}</option>)}
              </select>
            </div>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={form.estGuichet} onChange={e => s("estGuichet", e.target.checked)} className="rounded" />
              <span className="text-sm font-medium text-gray-700">C'est un guichet / sous-agence</span>
            </label>
            <div className="grid grid-cols-2 gap-3">
              <div><label className={lbl}>Localisation</label><input placeholder="Ville - Quartier" value={form.localisation} onChange={e => s("localisation", e.target.value)} className={inp} /></div>
              <div><label className={lbl}>Type</label>
                <select value={form.type} onChange={e => s("type", e.target.value)} className={inp}>
                  {["Principale", "Secondaire", "Mobile"].map(t => <option key={t}>{t}</option>)}
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div><label className={lbl}>Téléphone</label><input type="tel" placeholder="+237..." value={form.telephone} onChange={e => s("telephone", e.target.value)} className={inp} /></div>
              <div><label className={lbl}>Email</label><input type="email" placeholder="agence@afgbank.cm" value={form.email} onChange={e => s("email", e.target.value)} className={inp} /></div>
            </div>
            <div><label className={lbl}>Responsable</label><input placeholder="Nom du responsable" value={form.responsable} onChange={e => s("responsable", e.target.value)} className={inp} /></div>
            <div><label className={lbl}>Statut</label>
              <div className="flex gap-4">
                {["Active", "Inactive", "Maintenance"].map(st => (
                  <label key={st} className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="statut" value={st} checked={form.statut === st} onChange={() => s("statut", st)} className="text-blue-600" />
                    <span className="text-sm text-gray-700">{st}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
          <div className="flex gap-3 px-6 pb-6">
            <button type="button" onClick={onClose} className="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-700 hover:bg-gray-50">Annuler</button>
            <button type="submit" className="flex-1 py-2.5 bg-blue-900 text-white rounded-xl text-sm hover:bg-blue-800">Créer l'agence</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function AgencePage() {
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");
  const [filtreStatut, setFiltreStatut] = useState("Tous");
  const [openAgences, setOpenAgences] = useState({});

  const allAgences = mockFiliales.flatMap(f => [
    ...f.agences.map(a => ({ ...a, filiale: f.nom })),
    ...(f.sousFiliales || []).flatMap(sf => sf.agences.map(a => ({ ...a, filiale: sf.nom }))),
  ]);

  const filtered = allAgences.filter(a =>
    (filtreStatut === "Tous" || a.statut === filtreStatut) &&
    (a.nom.toLowerCase().includes(search.toLowerCase()) || a.localisation.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-gray-50">
      <div className="px-6 py-5 bg-white border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Agences</h1>
            <p className="text-sm text-gray-500 mt-0.5">Gestion des agences et guichets</p>
          </div>
          <button onClick={() => setShowModal(true)} className="px-4 py-2.5 bg-blue-900 text-white text-sm font-medium rounded-xl hover:bg-blue-800 transition-colors">
            + Nouvelle agence
          </button>
        </div>
      </div>

      <div className="px-6 py-3 bg-white border-b border-gray-100 flex items-center gap-3">
        <input type="text" placeholder="Rechercher..." value={search} onChange={e => setSearch(e.target.value)}
          className="flex-1 max-w-sm px-4 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50" />
        <div className="flex gap-2">
          {["Tous", "Active", "Inactive", "Maintenance", "Bloquée"].map(s => (
            <button key={s} onClick={() => setFiltreStatut(s)}
              className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${filtreStatut === s ? "bg-blue-900 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
              {s}
            </button>
          ))}
        </div>
      </div>

      <main className="flex-1 overflow-y-auto p-6">
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>{["Agence", "Filiale", "Localisation", "Type", "Responsable", "Statut", "Actions"].map(h =>
                <th key={h} className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">{h}</th>)}</tr>
            </thead>
            <tbody>
              {filtered.map(a => (
                <>
                  <tr key={a.id} className="border-t border-gray-50 hover:bg-blue-50/20 cursor-pointer"
                    onClick={() => setOpenAgences(p => ({ ...p, [a.id]: !p[a.id] }))}>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        {a.sousAgences?.length > 0 && <span className="text-blue-400 text-xs">{openAgences[a.id] ? "▾" : "▸"}</span>}
                        <div>
                          <p className="font-medium text-gray-900">{a.nom}</p>
                          {a.sousAgences?.length > 0 && <p className="text-xs text-blue-500">{a.sousAgences.length} guichet(s)</p>}
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-gray-500">{a.filiale}</td>
                    <td className="py-3 px-4 text-gray-600">{a.localisation}</td>
                    <td className="py-3 px-4 text-gray-500">{a.type}</td>
                    <td className="py-3 px-4 text-gray-600">{a.responsable || "—"}</td>
                    <td className="py-3 px-4"><Badge statut={a.statut} /></td>
                    <td className="py-3 px-4" onClick={e => e.stopPropagation()}>
                      <div className="flex gap-2">
                        <button className="text-xs text-blue-600 hover:underline">Modifier</button>
                        <button className="text-xs text-red-500 hover:underline">Supprimer</button>
                      </div>
                    </td>
                  </tr>
                  {openAgences[a.id] && a.sousAgences?.map(sa => (
                    <tr key={sa.id} className="border-t border-gray-50 bg-blue-50/10">
                      <td className="py-2.5 px-4 pl-10"><span className="text-blue-300 mr-2">↳</span>{sa.nom}</td>
                      <td className="py-2.5 px-4 text-gray-400">—</td>
                      <td className="py-2.5 px-4 text-gray-500">{sa.localisation}</td>
                      <td className="py-2.5 px-4 text-gray-400">Guichet</td>
                      <td className="py-2.5 px-4 text-gray-400">—</td>
                      <td className="py-2.5 px-4"><Badge statut={sa.statut} /></td>
                      <td className="py-2.5 px-4"><button className="text-xs text-blue-600 hover:underline">Modifier</button></td>
                    </tr>
                  ))}
                </>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      {showModal && <ModalCreerAgence onClose={() => setShowModal(false)} filiales={mockFiliales} />}
    </div>
  );
}
