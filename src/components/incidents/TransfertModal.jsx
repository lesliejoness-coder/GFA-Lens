import { useState } from "react";
import { USERS, INITIAL_INCIDENTS } from "./incidentsData";

const T = {
  fr: {
    adminOnly:    "Administrateur uniquement",
    title:        "Affecter l'incident",
    transferTo:   "Transférer vers",
    destLabel:    "Employé de destination",
    destDefault:  "— Choisir un employé —",
    motifLabel:   "Motif du transfert",
    motifPlaceholder: "Expliquez brièvement la raison du transfert...",
    cancel:       "Annuler",
    confirm:      "Confirmer l'affectation",
    enCours:      "en cours",
  },
  en: {
    adminOnly:    "Administrator only",
    title:        "Assign incident",
    transferTo:   "Transfer to",
    destLabel:    "Destination employee",
    destDefault:  "— Choose an employee —",
    motifLabel:   "Transfer reason",
    motifPlaceholder: "Briefly explain the reason for the transfer...",
    cancel:       "Cancel",
    confirm:      "Confirm assignment",
    enCours:      "in progress",
  },
  mg: {
    adminOnly:    "Administratora ihany",
    title:        "Mampianatra olana",
    transferTo:   "Avereno amin'ny",
    destLabel:    "Mpiasa tafiditra",
    destDefault:  "— Misafidy mpiasa —",
    motifLabel:   "Antony ny fanovana",
    motifPlaceholder: "Hazavao fohy ny antony...",
    cancel:       "Hanafoana",
    confirm:      "Hamafiso ny fampiantriana",
    enCours:      "eo am-pandehanana",
  },
};

const inputCls = "w-full border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-2 text-sm text-gray-800 dark:text-gray-100 bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all";

function Field({ label, children }) {
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>
      {children}
    </div>
  );
}

export default function TransfertModal({ incident, onClose, onConfirm, langue = "fr" }) {
  const t = T[langue] || T.fr;

  const [form, setForm] = useState({ destination: "Utilisateur", Utilisateur: "", motif: "" });

  const listeEmployes = USERS.filter((u) => u.role === "employé" && u.nom !== incident.agent);
  const set = (k) => (e) => setForm((prev) => ({ ...prev, [k]: e.target.value }));

  const handleConfirm = () => {
    if (!form.Utilisateur) return;
    onConfirm({ ...form, dest: form.Utilisateur });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden transition-colors">

        {/* Header */}
        <div className="bg-purple-900 dark:bg-purple-950 px-6 py-4 flex items-center justify-between">
          <div>
            <p className="text-purple-300 text-xs mb-0.5">{t.adminOnly}</p>
            <h2 className="text-white font-semibold text-base">{t.title}</h2>
          </div>
          <button onClick={onClose} className="text-purple-300 hover:text-white transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-4">

          {/* Incident concerné */}
          <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-100 dark:border-purple-800 rounded-xl px-4 py-3">
            <p className="text-xs text-purple-400 dark:text-purple-300 mb-0.5">Incident</p>
            <p className="text-sm font-semibold text-purple-900 dark:text-purple-200 line-clamp-1">
              #{incident.id} — {incident.titre}
            </p>
          </div>

          <Field label={t.transferTo}>
            <div className="flex gap-2">
              <button
                onClick={() => setForm((p) => ({ ...p, destination: "Utilisateur" }))}
                className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all ${
                  form.destination === "Utilisateur"
                    ? "bg-purple-900 text-white border-purple-900"
                    : "bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-600"
                }`}>
                Utilisateur
              </button>
            </div>
          </Field>

          <Field label={t.destLabel}>
            <select value={form.Utilisateur} onChange={set("Utilisateur")} className={inputCls}>
              <option value="">{t.destDefault}</option>
              {listeEmployes.map((emp) => {
                const nbTaches = INITIAL_INCIDENTS.filter(
                  (inc) => inc.agent === emp.nom && inc.statut !== "Terminé"
                ).length;
                return (
                  <option key={emp.id} value={emp.nom}>
                    {emp.nom} ({nbTaches} {t.enCours})
                  </option>
                );
              })}
            </select>
          </Field>

          <Field label={t.motifLabel}>
            <textarea value={form.motif} onChange={set("motif")}
              className={inputCls + " resize-none h-20"}
              placeholder={t.motifPlaceholder} />
          </Field>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-100 dark:border-gray-700 flex justify-end gap-3">
          <button onClick={onClose}
            className="px-4 py-2 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors">
            {t.cancel}
          </button>
          <button onClick={handleConfirm} disabled={!form.Utilisateur}
            className="px-5 py-2 rounded-lg bg-purple-900 text-white text-sm font-medium hover:bg-purple-800 disabled:opacity-50 transition-colors">
            {t.confirm}
          </button>
        </div>
      </div>
    </div>
  );
}
