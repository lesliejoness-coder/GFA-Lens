import { useState } from "react";
import { useAppSettings } from "../../contexts/AppSettingsContext";

const T = {
  fr: {
    titleAdd:     "Ajouter un rôle",
    titleEdit:    "Modifier le rôle",
    namePlaceholder: "Nom du rôle",
    nameError:    "Le nom du rôle est obligatoire",
    permTitle:    "Permissions",
    cancel:       "Annuler",
    save:         "Enregistrer",
    permissions: {
      dashboard:     "Tableau de bord",
      utilisateurs:  "Utilisateurs",
      incidents:     "Incidents",
      rapports:      "Rapports",
      "paramètres":  "Paramètres",
    },
  },
  en: {
    titleAdd:     "Add role",
    titleEdit:    "Edit role",
    namePlaceholder: "Role name",
    nameError:    "Role name is required",
    permTitle:    "Permissions",
    cancel:       "Cancel",
    save:         "Save",
    permissions: {
      dashboard:     "Dashboard",
      utilisateurs:  "Users",
      incidents:     "Incidents",
      rapports:      "Reports",
      "paramètres":  "Settings",
    },
  },
  mg: {
    titleAdd:     "Manampy andraikitra",
    titleEdit:    "Hanova andraikitra",
    namePlaceholder: "Anaran'ny andraikitra",
    nameError:    "Tsy maintsy ampidirana ny anarana",
    permTitle:    "Fahazoan-dàlana",
    cancel:       "Hanafoana",
    save:         "Tehirizo",
    permissions: {
      dashboard:     "Tableau de bord",
      utilisateurs:  "Mpampiasa",
      incidents:     "Olana",
      rapports:      "Tatitra",
      "paramètres":  "Fametrahana",
    },
  },
};

const PERMISSIONS = ["dashboard", "utilisateurs", "incidents", "rapports", "paramètres"];

const PERM_ICONS = {
  dashboard:    "📊",
  utilisateurs: "👤",
  incidents:    "⚠️",
  rapports:     "📄",
  "paramètres": "⚙️",
};

export default function RoleModal({ role, onClose, onSave }) {
  const { langue } = useAppSettings();
  const t = T[langue] || T.fr;

  const [nom, setNom]               = useState(role?.nom         || "");
  const [permissions, setPermissions] = useState(role?.permissions || {});
  const [error, setError]           = useState("");

  const toggle = key => setPermissions(p => ({ ...p, [key]: !p[key] }));

  const submit = () => {
    if (!nom.trim()) { setError(t.nameError); return; }
    onSave({ ...role, id: role?.id || Date.now(), nom: nom.trim(), permissions });
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden transition-colors">

        {/* Header */}
        <div className="bg-blue-900 px-5 py-4 flex justify-between items-center">
          <h2 className="font-semibold text-white">
            {role?.id ? t.titleEdit : t.titleAdd}
          </h2>
          <button onClick={onClose} className="text-blue-200 hover:text-white text-xl leading-none transition-colors">✕</button>
        </div>

        {/* Body */}
        <div className="p-5 space-y-4">

          {/* Nom */}
          <div>
            <input
              value={nom}
              onChange={e => { setNom(e.target.value); setError(""); }}
              placeholder={t.namePlaceholder}
              className="w-full border border-gray-200 dark:border-gray-600 rounded-xl px-3 py-2.5 text-sm bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:bg-white dark:focus:bg-gray-600 outline-none transition-colors"
            />
            {error && <p className="text-red-500 dark:text-red-400 text-xs mt-1">{error}</p>}
          </div>

          {/* Permissions */}
          <div>
            <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3">{t.permTitle}</p>
            <div className="grid grid-cols-1 gap-2">
              {PERMISSIONS.map(p => (
                <label key={p} className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer transition-colors group">
                  <div className={`relative w-10 h-5 rounded-full transition-colors ${permissions[p] ? "bg-blue-600" : "bg-gray-300 dark:bg-gray-600"}`}
                    onClick={() => toggle(p)}>
                    <span className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${permissions[p] ? "translate-x-5" : ""}`} />
                  </div>
                  <span className="text-lg">{PERM_ICONS[p]}</span>
                  <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-gray-100 transition-colors">
                    {t.permissions[p] || p}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-4 flex justify-end gap-2 border-t border-gray-100 dark:border-gray-700 transition-colors">
          <button onClick={onClose} className="px-4 py-2 rounded-xl text-sm text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            {t.cancel}
          </button>
          <button
            onClick={submit}
            disabled={!nom.trim()}
            className={`px-4 py-2 rounded-xl text-sm text-white transition-colors ${!nom.trim() ? "bg-gray-400 cursor-not-allowed" : "bg-blue-900 hover:bg-blue-800"}`}
          >
            {t.save}
          </button>
        </div>

      </div>
    </div>
  );
}
