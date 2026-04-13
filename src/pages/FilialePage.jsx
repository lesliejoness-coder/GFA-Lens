import { useState } from "react";
import { mockFiliales } from "../data/mockData";

function Badge({ statut }) {
  const map = { Active: "bg-green-100 text-green-800", Inactive: "bg-gray-100 text-gray-600", Bloquée: "bg-red-100 text-red-800", Maintenance: "bg-yellow-100 text-yellow-800" };
  return <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${map[statut] || "bg-gray-100 text-gray-700"}`}>{statut}</span>;
}

function Toggle({ checked, onChange }) {
  return (
    <button type="button" onClick={onChange}
      className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${checked ? "bg-blue-600" : "bg-gray-300"}`}>
      <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow transition-transform ${checked ? "translate-x-4" : "translate-x-1"}`} />
    </button>
  );
}

function ModalCreerFiliale({ onClose, onSave, parentFiliales }) {
  const [form, setForm] = useState({
    nom: "", localisation: "", type: "Normal", pays: "", phone: "", email: "",
    timezone: "", dateFormat: "", timeFormat: "", callingType: "Time Based",
    defaultLanguage: "", logoFile: null, parentId: "",
    sms: false, whatsapp: false, mobileApp: false,
    userName: "", userEmail: "", userPassword: "",
    locationType: "Using Map", searchLieu: "",
  });
  const s = (k, v) => setForm(p => ({ ...p, [k]: v }));
  const inp = "w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white";
  const sel = "w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white";
  const lbl = "block text-sm font-medium text-gray-700 mb-1";

  const PAYS = ["Cameroun", "Côte d'Ivoire", "Sénégal", "Mali", "Burkina Faso", "Guinée", "Gabon", "France"];
  const TIMEZONES = ["Africa/Douala", "Africa/Abidjan", "Africa/Dakar", "Europe/Paris", "UTC"];
  const LANGUAGES = ["Français", "English", "Arabic", "Español"];

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ nom: form.nom, pays: form.pays, ville: form.localisation, parentId: form.parentId ? parseInt(form.parentId) : null, statut: "Active", agences: [], sousFiliales: [] });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Create Branch</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-700 text-2xl leading-none">×</button>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto">
          <div className="px-6 py-5 space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div><label className={lbl}>Name *</label><input required placeholder="Name" value={form.nom} onChange={e => s("nom", e.target.value)} className={inp} /></div>
              <div><label className={lbl}>Location</label><input placeholder="Location" value={form.localisation} onChange={e => s("localisation", e.target.value)} className={inp} /></div>
              <div><label className={lbl}>Type</label>
                <select value={form.type} onChange={e => s("type", e.target.value)} className={sel}>
                  {["Normal", "Principal", "Secondaire"].map(o => <option key={o}>{o}</option>)}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div><label className={lbl}>Country</label>
                <select value={form.pays} onChange={e => s("pays", e.target.value)} className={sel}>
                  <option value="">Select option</option>
                  {PAYS.map(p => <option key={p}>{p}</option>)}
                </select>
              </div>
              <div><label className={lbl}>Phone</label><input type="tel" placeholder="Phone" value={form.phone} onChange={e => s("phone", e.target.value)} className={inp} /></div>
              <div><label className={lbl}>Email</label><input type="email" placeholder="Email" value={form.email} onChange={e => s("email", e.target.value)} className={inp} /></div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div><label className={lbl}>Timezone</label>
                <select value={form.timezone} onChange={e => s("timezone", e.target.value)} className={sel}>
                  <option value="">Select option</option>
                  {TIMEZONES.map(t => <option key={t}>{t}</option>)}
                </select>
              </div>
              <div><label className={lbl}>Date Format</label>
                <select value={form.dateFormat} onChange={e => s("dateFormat", e.target.value)} className={sel}>
                  <option value="">Select</option>
                  {["DD/MM/YYYY", "MM/DD/YYYY", "YYYY-MM-DD"].map(d => <option key={d}>{d}</option>)}
                </select>
              </div>
              <div><label className={lbl}>Time Format</label>
                <select value={form.timeFormat} onChange={e => s("timeFormat", e.target.value)} className={sel}>
                  <option value="">Select</option>
                  {["HH:mm", "hh:mm A"].map(t => <option key={t}>{t}</option>)}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div><label className={lbl}>Calling Type</label>
                <select value={form.callingType} onChange={e => s("callingType", e.target.value)} className={sel}>
                  {["Time Based", "Round Robin", "Fixed"].map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div><label className={lbl}>Default Language</label>
                <select value={form.defaultLanguage} onChange={e => s("defaultLanguage", e.target.value)} className={sel}>
                  <option value="">Select</option>
                  {LANGUAGES.map(l => <option key={l}>{l}</option>)}
                </select>
              </div>
              <div><label className={lbl}>Logo</label>
                <div className="flex items-center gap-2">
                  <label className="cursor-pointer">
                    <span className="inline-flex items-center px-3 py-2 bg-gray-800 text-white text-sm rounded-lg hover:bg-gray-700 transition-colors">Choisir un fichier</span>
                    <input type="file" accept="image/*" className="hidden" onChange={e => s("logoFile", e.target.files?.[0] || null)} />
                  </label>
                  <span className="text-xs text-gray-400">{form.logoFile ? form.logoFile.name : "Aucun fichier"}</span>
                </div>
              </div>
            </div>

            <div>
              <label className={lbl}>Filiale parente</label>
              <select value={form.parentId} onChange={e => s("parentId", e.target.value)} className={sel}>
                <option value="">— Filiale principale</option>
                {parentFiliales.map(f => <option key={f.id} value={f.id}>{f.nom}</option>)}
                {parentFiliales.flatMap(f => f.sousFiliales || []).map(sf => <option key={sf.id} value={sf.id}>↳ {sf.nom}</option>)}
              </select>
            </div>

            <div className="flex items-center gap-6 pt-1">
              {[["sms", "SMS"], ["whatsapp", "Whatsapp Notification"], ["mobileApp", "Mobile App Notification"]].map(([k, label]) => (
                <label key={k} className="flex items-center gap-2 cursor-pointer">
                  <Toggle checked={form[k]} onChange={() => s(k, !form[k])} />
                  <span className="text-sm text-gray-700">{label}</span>
                </label>
              ))}
            </div>

            <div className="pt-2">
              <h4 className="text-sm font-bold text-gray-800 mb-3 uppercase tracking-wide">User</h4>
              <div className="grid grid-cols-3 gap-4">
                <div><label className={lbl}>Name</label><input placeholder="Name" value={form.userName} onChange={e => s("userName", e.target.value)} className={inp} /></div>
                <div><label className={lbl}>Email</label><input type="email" placeholder="Email" value={form.userEmail} onChange={e => s("userEmail", e.target.value)} className={inp} /></div>
                <div><label className={lbl}>Password</label><input type="password" placeholder="Password" value={form.userPassword} onChange={e => s("userPassword", e.target.value)} className={inp} /></div>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div><label className={lbl}>Location Type</label>
                  <select value={form.locationType} onChange={e => s("locationType", e.target.value)} className={sel}>
                    {["Using Map", "Manual Entry", "GPS"].map(l => <option key={l}>{l}</option>)}
                  </select>
                </div>
                <div><label className={lbl}>Search</label>
                  <input placeholder="Indiquez un lieu" value={form.searchLieu} onChange={e => s("searchLieu", e.target.value)} className={inp} />
                </div>
              </div>
              <div className="mt-4 rounded-xl h-32 bg-gradient-to-br from-green-100 to-teal-200 flex items-center justify-center border border-gray-200">
                <p className="text-xs text-teal-700 font-medium">📍 Carte — For development purposes only</p>
              </div>
            </div>
          </div>

          <div className="flex gap-3 px-6 py-4 border-t border-gray-100 bg-white">
            <button type="button" onClick={onClose} className="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-700 hover:bg-gray-50 font-medium">Annuler</button>
            <button type="submit" className="flex-1 py-2.5 bg-blue-900 text-white rounded-xl text-sm hover:bg-blue-800 font-medium">Créer la filiale</button>
          </div>
        </form>
      </div>
    </div>
  );
}

function FilialeCard({ filiale, depth = 0 }) {
  const [expanded, setExpanded] = useState(depth === 0);
  const [openAgences, setOpenAgences] = useState({});

  return (
    <div className={`rounded-xl border overflow-hidden ${depth > 0 ? "border-blue-200" : "border-gray-200"} shadow-sm`}>
      <div className={`flex items-center justify-between px-5 py-4 cursor-pointer ${depth === 0 ? "bg-blue-900" : "bg-blue-700"} text-white`}
        onClick={() => setExpanded(!expanded)}>
        <div className="flex items-center gap-3">
          <span className="text-sm opacity-70">{expanded ? "▾" : "▸"}</span>
          <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center font-bold">{filiale.nom.charAt(0)}</div>
          <div>
            <h3 className="font-semibold">{filiale.nom}</h3>
            <p className="text-xs opacity-70">{filiale.ville && `${filiale.ville}, `}{filiale.pays} · {filiale.agences.length} agence(s)</p>
          </div>
        </div>
        <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${filiale.statut === "Active" ? "bg-green-400/20 text-green-100" : "bg-gray-400/20 text-gray-200"}`}>{filiale.statut}</span>
      </div>

      {expanded && (
        <div className="bg-white">
          {filiale.sousFiliales?.length > 0 && (
            <div className="px-5 pt-4 pb-2">
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-3">Sous-filiales</p>
              <div className="space-y-3">
                {filiale.sousFiliales.map(sf => <FilialeCard key={sf.id} filiale={sf} depth={depth + 1} />)}
              </div>
            </div>
          )}
          {filiale.agences.length > 0 && (
            <div className="px-5 py-4">
              <div className="overflow-x-auto rounded-xl border border-gray-100">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>{["Agence", "Localisation", "Type", "Responsable", "Statut", "Actions"].map(h =>
                      <th key={h} className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">{h}</th>)}</tr>
                  </thead>
                  <tbody>
                    {filiale.agences.map(a => (
                      <>
                        <tr key={a.id} className="border-t border-gray-50 hover:bg-blue-50/30 cursor-pointer" onClick={() => setOpenAgences(p => ({ ...p, [a.id]: !p[a.id] }))}>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              {a.sousAgences.length > 0 && <span className="text-blue-400 text-xs">{openAgences[a.id] ? "▾" : "▸"}</span>}
                              <div>
                                <p className="font-medium text-gray-900">{a.nom}</p>
                                {a.sousAgences.length > 0 && <p className="text-xs text-blue-500">{a.sousAgences.length} guichet(s)</p>}
                              </div>
                            </div>
                          </td>
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
                        {openAgences[a.id] && a.sousAgences.map(sa => (
                          <tr key={sa.id} className="border-t border-gray-50 bg-blue-50/20">
                            <td className="py-2.5 px-4 pl-10"><span className="text-blue-300 mr-2">↳</span>{sa.nom}</td>
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
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function FilialePage() {
  const [filiales, setFiliales] = useState(mockFiliales);
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");

  const handleSave = (data) => {
    const newF = { id: Date.now(), ...data };
    if (data.parentId) {
      setFiliales(prev => prev.map(f => {
        if (f.id === data.parentId) return { ...f, sousFiliales: [...(f.sousFiliales || []), newF] };
        return f;
      }));
    } else {
      setFiliales(prev => [...prev, newF]);
    }
  };

  const filtered = filiales.filter(f => f.nom.toLowerCase().includes(search.toLowerCase()) || f.pays.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-gray-50">
      <div className="px-6 py-5 bg-white border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Filiales</h1>
            <p className="text-sm text-gray-500 mt-0.5">Structure hiérarchique AFGLens</p>
          </div>
          <button onClick={() => setShowModal(true)} className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-900 text-white text-sm font-medium rounded-xl hover:bg-blue-800 transition-colors">
            + Nouvelle filiale
          </button>
        </div>
      </div>

      <div className="px-6 py-3 bg-white border-b border-gray-100">
        <input type="text" placeholder="Rechercher une filiale..." value={search} onChange={e => setSearch(e.target.value)}
          className="w-full max-w-sm pl-4 pr-4 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50" />
      </div>

      <main className="flex-1 overflow-y-auto p-6">
        <div className="space-y-4 max-w-5xl">
          {filtered.map(f => <FilialeCard key={f.id} filiale={f} />)}
        </div>
      </main>

      {showModal && <ModalCreerFiliale onClose={() => setShowModal(false)} onSave={handleSave} parentFiliales={filiales} />}
    </div>
  );
}
