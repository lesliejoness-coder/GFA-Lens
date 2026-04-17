import { useState } from "react";
import { PRIORITES, STATUTS, AGENCES } from "./incidentsData";

// Champs supprimés : "Affecter à un agent" et "Date de déclaration"
// Statuts : En attente | En cours | Terminé

const inputCls =
  "w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 " +
  "bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400 " +
  "focus:border-transparent transition-all";

function Field({ label, required, children }) {
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-400 ml-0.5">*</span>}
      </label>
      {children}
    </div>
  );
}

const IMAGE_REGEX = /\.(png|jpe?g|gif|webp|bmp|svg)$/i;

export default function IncidentModal({ incident, onClose, onSave }) {
  const isEdit = Boolean(incident?.id);

  const [form, setForm] = useState({
    titre:          incident?.titre          || "",
    description:    incident?.description    || "",
    agence:         incident?.agence         || "",
    priorite:       incident?.priorite       || "Moyen",
    statut:         incident?.statut         || "En attente",
    pieceJointe:    incident?.pieceJointe    || null,
    pieceJointeUrl: incident?.pieceJointeUrl || null,
  });
  const [error, setError] = useState("");

  const set = (k) => (e) =>
    setForm((prev) => ({ ...prev, [k]: e.target.value }));

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setForm((prev) => ({ ...prev, pieceJointe: file.name, pieceJointeUrl: url }));
  };

  const handleSubmit = () => {
    if (!form.titre.trim() || !form.agence || !form.priorite) {
      setError("Titre, agence et priorité sont obligatoires.");
      return;
    }
    setError("");

    const now    = new Date();
    const dateStr = now.toISOString().replace("T", " ").slice(0, 16);
    const today   = now.toISOString().split("T")[0];

    const newStatutEntry =
      isEdit && form.statut !== incident.statut
        ? { date: dateStr, action: "Statut modifié",
            ancienStatut: incident.statut, nouveauStatut: form.statut }
        : null;

    const historiqueBase = incident?.historique || [
      { date: dateStr, action: "Incident déclaré",
        ancienStatut: null, nouveauStatut: form.statut },
    ];

    onSave({
      ...incident,
      ...form,
      id:              incident?.id              ?? Date.now(),
      agent:           incident?.agent           ?? null,
      dateDeclaration: incident?.dateDeclaration ?? today,
      transfere:       incident?.transfere        ?? false,
      historique: [
        ...historiqueBase,
        ...(newStatutEntry ? [newStatutEntry] : []),
      ],
      dateResolution:
        form.statut === "Terminé" && !incident?.dateResolution
          ? today
          : (incident?.dateResolution || null),
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center
                    bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg
                      overflow-hidden flex flex-col max-h-[90vh]">

        {/* ── Header ── */}
        <div className="bg-blue-900 px-6 py-4 flex items-center justify-between flex-shrink-0">
          <h2 className="text-white font-semibold text-base">
            {isEdit ? "Modifier l'incident" : "Déclarer un incident"}
          </h2>
          <button onClick={onClose}
            className="text-blue-300 hover:text-white transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* ── Body ── */}
        <div className="px-6 py-5 space-y-4 overflow-y-auto flex-1">

          {error && (
            <p className="text-xs text-red-600 bg-red-50 border border-red-200
                          rounded-lg px-3 py-2">
              {error}
            </p>
          )}

          <Field label="Titre" required>
            <input value={form.titre} onChange={set("titre")}
              className={inputCls} placeholder="ex: Connexion impossible à GFA" />
          </Field>

          <Field label="Description">
            <textarea value={form.description} onChange={set("description")}
              className={inputCls + " resize-none h-20"}
              placeholder="Décrivez précisément le problème..." />
          </Field>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Agence" required>
              <select value={form.agence} onChange={set("agence")} className={inputCls}>
                <option value="">— Sélectionner —</option>
                {AGENCES.map((a) => <option key={a}>{a}</option>)}
              </select>
            </Field>

            <Field label="Priorité" required>
              <select value={form.priorite} onChange={set("priorite")} className={inputCls}>
                {PRIORITES.map((p) => <option key={p}>{p}</option>)}
              </select>
            </Field>
          </div>

          <Field label="Statut">
            <select value={form.statut} onChange={set("statut")} className={inputCls}>
              {STATUTS.map((s) => <option key={s}>{s}</option>)}
            </select>
          </Field>

          {/* ── Pièce jointe ── */}
          <Field label="Pièce jointe (capture d'écran / document)">
            <label className="flex items-center gap-3 cursor-pointer border border-dashed
                              border-blue-200 rounded-lg px-4 py-3 bg-blue-50/50
                              hover:bg-blue-50 transition-colors">
              <svg className="w-5 h-5 text-blue-400 flex-shrink-0" fill="none"
                stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586
                     a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
              </svg>
              <span className="text-sm text-gray-500 truncate flex-1">
                {form.pieceJointe || "Cliquer pour joindre un fichier"}
              </span>
              <input type="file" className="hidden" onChange={handleFile}
                accept="image/*,.pdf,.doc,.docx" />
            </label>

            {/* Aperçu image */}
            {form.pieceJointeUrl && IMAGE_REGEX.test(form.pieceJointe) && (
              <div className="mt-2 rounded-lg overflow-hidden border border-blue-100">
                <img src={form.pieceJointeUrl} alt="Aperçu"
                  className="w-full max-h-40 object-contain bg-gray-50" />
              </div>
            )}
          </Field>
        </div>

        {/* ── Footer ── */}
        <div className="px-6 py-4 border-t border-gray-100 flex justify-end
                        gap-3 flex-shrink-0">
          <button onClick={onClose}
            className="px-4 py-2 rounded-lg border border-gray-200 text-gray-600
                       hover:bg-gray-50 text-sm transition-colors">
            Annuler
          </button>
          <button onClick={handleSubmit}
            className="px-5 py-2 rounded-lg bg-blue-900 text-white text-sm
                       font-medium hover:bg-blue-800 transition-colors">
            {isEdit ? "Enregistrer" : "Déclarer l'incident"}
          </button>
        </div>
      </div>
    </div>
  );
}
