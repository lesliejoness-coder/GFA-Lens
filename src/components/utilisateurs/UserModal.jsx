import { useState } from "react";

const ROLES = [
  "Super Admin", "manager", "DCM",
  "CHEF D'AGENCE", "MANAGER G", "CONSEILLER CLIENT", "Client",
];

const AGENCES  = [
  "Agence Plateau", "Agence Bonapriso", "Agence Centre-ville",
  "Agence Yopougon", "Agence Akwa",
];

const FILIALES = [
  "AFGBank CI", "AFGBank Cameroun", "AFGBank Sénégal", "AFGBank Mali",
];

const inputCls =
  "w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 " +
  "focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent " +
  "bg-gray-50 transition-all";

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

export default function UserModal({ user, onClose, onSave }) {
  const [form, setForm] = useState({
    prenom:  user?.prenom  || "",
    nom:     user?.nom     || "",
    email:   user?.email   || "",
    agence:  user?.agence  || "",
    filiale: user?.filiale || "",
    role:    user?.role    || "",
    actif:   user?.actif   ?? true,
  });

  const set = (k) => (e) =>
    setForm((prev) => ({ ...prev, [k]: e.target.value }));

  // Quand le rôle est "Client", agence/filiale deviennent librement saisissables
  const isClient = form.role === "Client";

  const handleSubmit = () => {
    if (!form.nom.trim() || !form.prenom.trim() || !form.email || !form.role) return;
    onSave({ ...user, ...form, id: user?.id ?? Date.now() });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center
                    bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">

        {/* ── Header ── */}
        <div className="bg-blue-900 px-6 py-4 flex items-center justify-between">
          <h2 className="text-white font-semibold text-lg">
            {user?.id ? "Modifier l'utilisateur" : "Ajouter un utilisateur"}
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

          {/* Prénom + Nom séparés */}
          <div className="grid grid-cols-2 gap-3">
            <Field label="Prénom" required>
              <input value={form.prenom} onChange={set("prenom")}
                className={inputCls} placeholder="ex: Jean" />
            </Field>
            <Field label="Nom" required>
              <input value={form.nom} onChange={set("nom")}
                className={inputCls} placeholder="ex: Dupont" />
            </Field>
          </div>

          <Field label="Email" required>
            <input type="email" value={form.email} onChange={set("email")}
              className={inputCls} placeholder="ex: jean@afgbank.com" />
          </Field>

          {/* Rôle — à renseigner AVANT agence/filiale pour activer le mode Client */}
          <Field label="Rôle" required>
            <select value={form.role} onChange={set("role")} className={inputCls}>
              <option value="">— Sélectionner —</option>
              {ROLES.map((r) => <option key={r}>{r}</option>)}
            </select>
          </Field>

          {/* Agence + Filiale séparées */}
          {/* Si rôle = Client → champs texte libres ; sinon → listes déroulantes */}
          <div className="grid grid-cols-2 gap-3">
            <Field label="Agence">
              {isClient ? (
                <input
                  value={form.agence}
                  onChange={set("agence")}
                  className={inputCls}
                  placeholder="Saisir l'agence..."
                />
              ) : (
                <select value={form.agence} onChange={set("agence")} className={inputCls}>
                  <option value="">— Aucune —</option>
                  {AGENCES.map((a) => <option key={a}>{a}</option>)}
                </select>
              )}
            </Field>

            <Field label="Filiale">
              {isClient ? (
                <input
                  value={form.filiale}
                  onChange={set("filiale")}
                  className={inputCls}
                  placeholder="Saisir la filiale..."
                />
              ) : (
                <select value={form.filiale} onChange={set("filiale")} className={inputCls}>
                  <option value="">— Aucune —</option>
                  {FILIALES.map((f) => <option key={f}>{f}</option>)}
                </select>
              )}
            </Field>
          </div>

          {/* Indicateur visuel si mode Client */}
          {isClient && (
            <p className="text-xs text-blue-600 bg-blue-50 border border-blue-100
                          rounded-lg px-3 py-2">
              💡 Mode <strong>Client</strong> : saisissez librement l'agence et la filiale.
            </p>
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
            className="px-5 py-2 rounded-lg bg-blue-900 text-white text-sm
                       font-medium hover:bg-blue-800 transition-colors">
            {user?.id ? "Enregistrer" : "Ajouter"}
          </button>
        </div>
      </div>
    </div>
  );
}
