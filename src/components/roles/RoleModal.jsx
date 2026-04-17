import { useState } from "react";

const AGENCES  = [
  "Agence Plateau", "Agence Bonapriso", "Agence Centre-ville",
  "Agence Yopougon", "Agence Akwa",
];
const FILIALES = [
  "AFGBank CI", "AFGBank Cameroun", "AFGBank Sénégal", "AFGBank Mali",
];

const inputCls =
  "w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 " +
  "bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400 " +
  "focus:border-transparent transition-all";

function Field({ label, children }) {
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      {children}
    </div>
  );
}

export default function RoleModal({ role, onClose, onSave }) {
  const [nom,     setNom]     = useState(role?.nom     || "");
  const [agence,  setAgence]  = useState(role?.agence  || "");
  const [filiale, setFiliale] = useState(role?.filiale || "");

  const isClient = nom.trim().toLowerCase() === "client";

  const handleSubmit = () => {
    if (!nom.trim()) return;
    onSave({
      ...role,
      nom:     nom.trim(),
      agence:  isClient ? agence  : undefined,
      filiale: isClient ? filiale : undefined,
      id:      role?.id ?? Date.now(),
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center
                    bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden">

        {/* ── Header ── */}
        <div className="bg-blue-900 px-6 py-4 flex items-center justify-between">
          <h2 className="text-white font-semibold text-lg">
            {role?.id ? "Modifier le rôle" : "Ajouter un rôle"}
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
        <div className="px-6 py-5 space-y-4">

          <Field label="Nom du rôle">
            <input
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !isClient && handleSubmit()}
              className={inputCls}
              placeholder="ex: CHEF D'AGENCE"
              autoFocus
            />
          </Field>

          {/* ── Champs agence/filiale actifs uniquement si rôle = Client ── */}
          {isClient && (
            <>
              <div className="rounded-xl bg-purple-50 border border-purple-100 px-4 py-2.5">
                <p className="text-xs text-purple-600 font-medium">
                  🔓 Rôle <strong>Client</strong> détecté — renseignez l'agence et la filiale
                </p>
              </div>

              <Field label="Agence du client">
                <input
                  value={agence}
                  onChange={(e) => setAgence(e.target.value)}
                  className={inputCls}
                  placeholder="ex: Agence Plateau"
                  list="agences-list"
                />
                {/* Suggestions optionnelles */}
                <datalist id="agences-list">
                  {AGENCES.map((a) => <option key={a} value={a} />)}
                </datalist>
              </Field>

              <Field label="Filiale du client">
                <input
                  value={filiale}
                  onChange={(e) => setFiliale(e.target.value)}
                  className={inputCls}
                  placeholder="ex: AFGBank CI"
                  list="filiales-list"
                />
                <datalist id="filiales-list">
                  {FILIALES.map((f) => <option key={f} value={f} />)}
                </datalist>
              </Field>
            </>
          )}

          {/* Champs verrouillés si pas Client */}
          {!isClient && (
            <div className="grid grid-cols-2 gap-3 opacity-40 pointer-events-none select-none">
              <Field label="Agence (Client uniquement)">
                <input className={inputCls} disabled placeholder="—" />
              </Field>
              <Field label="Filiale (Client uniquement)">
                <input className={inputCls} disabled placeholder="—" />
              </Field>
            </div>
          )}
        </div>

        {/* ── Footer ── */}
        <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-3">
          <button onClick={onClose}
            className="px-4 py-2 rounded-lg border border-gray-200 text-gray-600
                       hover:bg-gray-50 text-sm transition-colors">
            Annuler
          </button>
          <button onClick={handleSubmit}
            className="px-5 py-2 rounded-lg bg-teal-500 text-white text-sm
                       font-medium hover:bg-teal-600 transition-colors">
            {role?.id ? "Enregistrer" : "Ajouter"}
          </button>
        </div>
      </div>
    </div>
  );
}
