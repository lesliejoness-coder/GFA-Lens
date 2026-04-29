import { useAppSettings } from "../../contexts/AppSettingsContext";

const T = {
  fr: {
    cols: ["Nom", "Prénom", "Email", "Agence", "Filiale", "Statut", "Rôle", "Actions"],
    empty: "Aucun utilisateur trouvé.",
    confirmDelete: "Êtes-vous sûr de vouloir supprimer cet utilisateur ?",
    modify: "Modifier",
    delete: "Supprimer",
  },
  en: {
    cols: ["Last Name", "First Name", "Email", "Agency", "Branch", "Status", "Role", "Actions"],
    empty: "No users found.",
    confirmDelete: "Are you sure you want to delete this user?",
    modify: "Edit",
    delete: "Delete",
  },
  mg: {
    cols: ["Anarana", "Fanampiny", "Imailaka", "Agence", "Filiale", "Toe-javatra", "Andraikitra", "Hetsika"],
    empty: "Tsy misy mpampiasa hita.",
    confirmDelete: "Tena hamafa ity mpampiasa ity ve ianao?",
    modify: "Hanova",
    delete: "Hamafa",
  },
};

const ROLE_STYLES = {
  "Client":      "bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300",
  "Super Admin": "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300",
  "Admin":       "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300",
  "Employé":     "bg-teal-100 text-teal-800 dark:bg-teal-900/40 dark:text-teal-300",
};

function IconBtn({ title, color, onClick, d }) {
  return (
    <button onClick={onClick} title={title} className={`p-1.5 rounded-lg transition ${color}`}>
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={d} />
      </svg>
    </button>
  );
}

export default function UsersTable({ users, onToggle, onEdit, onDelete }) {
  const { langue } = useAppSettings();
  const t = T[langue] || T.fr;

  if (!users || users.length === 0) {
    return (
      <div className="text-center py-12 text-gray-400 dark:text-gray-500 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 transition-colors">
        <p className="text-3xl mb-2">👤</p>
        <p className="text-sm">{t.empty}</p>
      </div>
    );
  }

  const handleDelete = user => {
    if (window.confirm(t.confirmDelete)) onDelete(user.id);
  };

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm transition-colors">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-gray-50 dark:bg-gray-700/50">
            {t.cols.map(h => (
              <th key={h} className="text-left px-4 py-3 font-semibold text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {users.map((user, i) => (
            <tr key={user.id || i}
              className={`border-t border-gray-50 dark:border-gray-700 hover:bg-blue-50/30 dark:hover:bg-blue-900/10 transition-colors ${i % 2 === 0 ? "bg-white dark:bg-gray-800" : "bg-gray-50/30 dark:bg-gray-750"}`}>

              {/* NOM */}
              <td className="px-4 py-3 font-medium text-gray-800 dark:text-gray-200">
                {user.nom || "—"}
              </td>

              {/* PRÉNOM */}
              <td className="px-4 py-3 font-medium text-gray-800 dark:text-gray-200">
                {user.prenom || "—"}
              </td>

              {/* EMAIL */}
              <td className="px-4 py-3 text-gray-600 dark:text-gray-400 text-xs">
                {user.email || "—"}
              </td>

              {/* AGENCE */}
              <td className="px-4 py-3 text-gray-600 dark:text-gray-400 text-xs">
                {user.agence ? (
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                    {user.agence}
                  </span>
                ) : "—"}
              </td>

              {/* FILIALE */}
              <td className="px-4 py-3 text-gray-600 dark:text-gray-400 text-xs">
                {user.filiale ? (
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
                    {user.filiale}
                  </span>
                ) : "—"}
              </td>

              {/* STATUT toggle */}
              <td className="px-4 py-3">
                <button
                  onClick={() => onToggle(user.id)}
                  disabled={user.role === "Super Admin"}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${user.actif ? "bg-teal-500" : "bg-gray-300 dark:bg-gray-600"} ${user.role === "Super Admin" ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                >
                  <span className={`inline-block h-4 w-4 rounded-full bg-white shadow transition-transform ${user.actif ? "translate-x-6" : "translate-x-1"}`} />
                </button>
              </td>

              {/* RÔLE */}
              <td className="px-4 py-3">
                <span className={`px-2.5 py-1 rounded-md text-xs font-medium ${ROLE_STYLES[user.role] || "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300"}`}>
                  {user.role || "—"}
                </span>
              </td>

              {/* ACTIONS */}
              <td className="px-4 py-3">
                <div className="flex items-center gap-1.5">
                  <IconBtn
                    title={t.modify}
                    color="text-teal-600 hover:bg-teal-50 dark:hover:bg-teal-900/30"
                    onClick={() => onEdit(user)}
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                  {user.role !== "Super Admin" && (
                    <IconBtn
                      title={t.delete}
                      color="text-gray-400 hover:bg-red-50 dark:hover:bg-red-900/30 hover:text-red-500 dark:hover:text-red-400"
                      onClick={() => handleDelete(user)}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
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
