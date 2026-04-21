import { useState } from "react";
import { USERS, FILIALES, INITIAL_INCIDENTS} from "./incidentsData";

// Réservé à l'administrateur — affiché uniquement si isAdmin = true dans IncidentsPage
const inputCls =
  "w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 " +
  "bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-400 " +
  "focus:border-transparent transition-all";

function Field({ label, children }) {
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      {children}
    </div>
  );
}

const DEST_OPTIONS = [
 // { val: "agence",  label: "Agence" },
  // { val: "filiale", label: "Filiale" },
  { val: "Utilisateur",   label: "Utilisateur" },
];

export default function TransfertModal({ incident, onClose, onConfirm }) {
  const [form, setForm] = useState({
    destination: "Utilisateur",
    // agence:  "",
    // filiale: "",
    Utilisateur: "",
    motif: "",
  });
  
  // Extraction des employés uniquement pour la liste déroulante
  // On filtre par rôle "employé" et on évite d'afficher l'agent déjà sur l'incident
  const listeEmployes = USERS.filter(
    (u) => u.role === "employé" && u.nom !== incident.agent
  );

  const set = (k) => (e) =>
    setForm((prev) => ({ ...prev, [k]: e.target.value }));

  /*const currentDest =
    form.destination === "agence"  ? form.agence  :
    form.destination === "filiale" ? form.filiale : form.agent;*/
    //const currentDest = form.destination === "Utilisateur" ? form.Utilisateur: null;

  const handleConfirm = () => {
    if (!form.Utilisateur && form.destination === "Utilisateur") return;
    onConfirm({ ...form, dest: form.Utilisateur });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center
                    bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">

        {/* ── Header ── */}
        <div className="bg-purple-900 px-6 py-4 flex items-center justify-between">
          <div>
            <p className="text-purple-300 text-xs mb-0.5">Administrateur uniquement</p>
            <h2 className="text-white font-semibold text-base">
              Affecter l'incident
            </h2>
          </div>
          <button onClick={onClose}
            className="text-purple-300 hover:text-white transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Incident concerné 
        <div className="px-6 pt-5 pb-2">
          <div className="bg-purple-50 border border-purple-100 rounded-xl px-4 py-3">
            <p className="text-xs text-purple-400 mb-0.5">Incident concerné</p>
            <p className="text-sm font-semibold text-purple-900 line-clamp-1">
              #{incident.id} — {incident.titre}
            </p>
          </div>
        </div>*/}

        {/* ── Body ── */}
        <div className="px-6 py-4 space-y-4">
          <Field label="Transférer vers">
            <div className="flex gap-2">
              {DEST_OPTIONS.map(({ val, label }) => (
                <button key={val}
                  onClick={() => setForm((p) => ({ ...p, destination: val }))}
                  className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all
                    ${form.destination === val
                      ? "bg-purple-900 text-white border-purple-900"
                      : "bg-white text-gray-600 border-gray-200 "
                      // hover:border-purple-300"
                    }`}>
                  {label}
                </button>
              ))}
            </div>
          </Field>

          {/* Sélection dynamique selon destination */}
          {form.destination === "Utilisateur" && (
            <Field label="Employé de destination">
              <select value={form.Utilisateur} onChange={set("Utilisateur")} className={inputCls}>
                <option value="">— Choisir un employé —</option>
                {/* Ce bloc de code a un rôle de calculateur dynamique. Son but est de transformer une simple
                 liste de noms en un tableau de bord miniature pour l'administrateur. */}
                {listeEmployes.map((emp) => { // <--- Début du bloc avec accolade
                  const nbTaches = INITIAL_INCIDENTS.filter(
                  (inc) => inc.agent === emp.nom && inc.statut !== "Terminé"
                  ).length;

                  return ( // <--- LE RETURN EST OBLIGATOIRE ICI
                 <option key={emp.id} value={emp.nom}>
                  {emp.nom} ({nbTaches} en cours)
                 </option>
                );
                 })}
              </select>
            </Field>
          )}

          {/*{form.destination === "filiale" && (
            <Field label="Filiale de destination">
              <select value={form.filiale} onChange={set("filiale")} className={inputCls}>
                <option value="">— Sélectionner —</option>
                {FILIALES.map((f) => <option key={f}>{f}</option>)}
              </select>
            </Field>
          )}

          {form.destination === "agent" && (
            <Field label="Agent de destination">
              <select value={form.agent} onChange={set("agent")} className={inputCls}>
                <option value="">— Sélectionner —</option>
                {AGENTS.filter((a) => a !== incident.agent).map((a) => (
                  <option key={a}>{a}</option>
                ))}
              </select>
            </Field>
          )}*/}

          <Field label="Motif du transfert">
            <textarea value={form.motif} onChange={set("motif")}
              className={inputCls + " resize-none h-16"}
              placeholder="Expliquez brièvement la raison du transfert..." />
          </Field>
        </div>

        {/* ── Footer ── */}
        <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-3">
          <button onClick={onClose}
            className="px-4 py-2 text-sm text-gray-600">
            Annuler
          </button>
          <button
            onClick={handleConfirm}
            disabled={!form.Utilisateur}
            className="px-5 py-2 rounded-lg bg-purple-900 text-white text-sm font-medium disabled:opacity-50"
          >
            Confirmer l'affectation
          </button>
        </div>
      </div>
    </div>
  );
}
