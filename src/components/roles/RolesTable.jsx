import { Pencil, Trash2, ShieldCheck } from "lucide-react";
import { useAppSettings } from "../../contexts/AppSettingsContext";

const T = {
  fr: {
    cols:    ["Rôle", "Permissions", "Actions"],
    none:    "Aucune",
    empty:   "Aucun rôle trouvé.",
    modify:  "Modifier",
    delete:  "Supprimer",
    protected: "Protégé",
  },
  en: {
    cols:    ["Role", "Permissions", "Actions"],
    none:    "None",
    empty:   "No roles found.",
    modify:  "Edit",
    delete:  "Delete",
    protected: "Protected",
  },
  mg: {
    cols:    ["Andraikitra", "Fahazoan-dàlana", "Hetsika"],
    none:    "Tsy misy",
    empty:   "Tsy misy andraikitra hita.",
    modify:  "Hanova",
    delete:  "Hamafa",
    protected: "Voaaro",
  },
};

export default function RolesTable({ roles, onEdit, onDelete, onOpen }) {
  const { langue } = useAppSettings();
  const t = T[langue] || T.fr;

  if (!roles || roles.length === 0) {
    return (
      <div className="text-center py-12 text-gray-400 dark:text-gray-500 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 transition-colors">
        <p className="text-3xl mb-2">🔐</p>
        <p className="text-sm">{t.empty}</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm transition-colors">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-gray-50 dark:bg-gray-700/50">
            {t.cols.map(h => (
              <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {roles.map((role, i) => (
            <tr key={role.id}
              className={`border-t border-gray-50 dark:border-gray-700 hover:bg-blue-50/30 dark:hover:bg-blue-900/10 cursor-pointer transition-colors ${i % 2 === 0 ? "bg-white dark:bg-gray-800" : "bg-gray-50/30 dark:bg-gray-750"}`}
              onDoubleClick={() => onOpen(role)}>

              {/* NOM DU RÔLE */}
              <td className="px-4 py-3">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-gray-900 dark:text-gray-100">{role.nom}</span>
                  {role.protege && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-300">
                      <ShieldCheck size={10} />
                      {t.protected}
                    </span>
                  )}
                </div>
              </td>

              {/* PERMISSIONS */}
              <td className="px-4 py-3">
                <div className="flex flex-wrap gap-1.5">
                  {Object.keys(role.permissions || {})
                    .filter(k => role.permissions[k])
                    .length === 0
                    ? <span className="text-xs text-gray-400 dark:text-gray-500">{t.none}</span>
                    : Object.keys(role.permissions || {})
                        .filter(k => role.permissions[k])
                        .map(k => (
                          <span key={k} className="px-2 py-0.5 rounded-md text-xs bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 font-medium">
                            {k}
                          </span>
                        ))
                  }
                </div>
              </td>

              {/* ACTIONS */}
              <td className="px-4 py-3">
                <div className="flex items-center gap-2">
                  <button
                    onClick={e => { e.stopPropagation(); onEdit(role); }}
                    title={t.modify}
                    className="p-1.5 rounded-lg text-teal-600 hover:bg-teal-50 dark:hover:bg-teal-900/30 transition-colors"
                  >
                    <Pencil size={16} />
                  </button>
                  {!role.protege && (
                    <button
                      onClick={e => { e.stopPropagation(); onDelete(role); }}
                      title={t.delete}
                      className="p-1.5 rounded-lg text-gray-400 hover:bg-red-50 dark:hover:bg-red-900/30 hover:text-red-500 dark:hover:text-red-400 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
              </td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
