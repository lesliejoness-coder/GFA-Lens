export default function UsersTable({ users, onToggle, onEdit, onDelete }) {
  if (!users || users.length === 0) {
    return (
      <div className="text-center py-12 text-gray-400 bg-white rounded-xl border border-blue-100">
        <p className="text-3xl mb-2">👤</p>
        <p className="text-sm">Aucun utilisateur trouvé.</p>
      </div>
    );
  }

  const handleDelete = (user) => {
    const confirm = window.confirm(
      "Êtes-vous sûr de vouloir supprimer cet utilisateur ?"
    );
    if (confirm) onDelete(user.id);
  };

  return (
    <div className="overflow-x-auto rounded-xl border border-blue-100 bg-white shadow-sm">

      <table className="w-full text-sm">

        {/* HEADER */}
        <thead>
          <tr className="bg-blue-50 text-blue-900">
            {[
              "Nom",
              "Prénom",
              "Email",
              "Agence",
              "Filiale",
              "Statut",
              "Rôle",
              "Actions",
            ].map((h) => (
              <th
                key={h}
                className="text-left px-4 py-3 font-semibold text-xs uppercase tracking-wide"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>

        {/* BODY */}
        <tbody>
          {users.map((user, i) => (
            <tr
              key={user.id || i}
              className={`border-t border-blue-50 hover:bg-blue-50/40 transition-colors
                ${i % 2 === 0 ? "bg-white" : "bg-blue-50/10"}`}
            >

              {/* NOM */}
              <td className="px-4 py-3 font-medium text-gray-800">
                {user.nom || "—"}
              </td>
              
              {/* PRENOM */}
              <td className="px-4 py-3 font-medium text-gray-800">
                {user.prenom || "—"}
              </td>

              {/* EMAIL */}
              <td className="px-4 py-3 text-gray-600 text-xs">
                {user.email || "—"}
              </td>

              {/* AGENCE */}
              <td className="px-4 py-3 text-gray-600 text-xs">
                {user.agence ? (
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                    {user.agence}
                  </span>
                ) : (
                  "—"
                )}
              </td>

              {/* FILIALE */}
              <td className="px-4 py-3 text-gray-600 text-xs">
                {user.filiale ? (
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
                    {user.filiale}
                  </span>
                ) : (
                  "—"
                )}
              </td>

              {/* STATUT */}
              <td className="px-4 py-3">

                <button
                  onClick={() => onToggle(user.id)}
                  disabled={user.role === "Super Admin"}
                  className={`
                    relative inline-flex h-6 w-11 items-center rounded-full transition
                    ${user.actif ? "bg-teal-500" : "bg-gray-300"}
                    ${user.role === "Super Admin" ? "opacity-50 cursor-not-allowed" : ""}
                  `}
                >
                  <span
                    className={`
                      inline-block h-4 w-4 rounded-full bg-white shadow transition-transform
                      ${user.actif ? "translate-x-6" : "translate-x-1"}
                    `}
                  />
                </button>

              </td>

              {/* ROLE */}
              <td className="px-4 py-3">

                <span
                  className={`px-2.5 py-1 rounded-md text-xs font-medium
                    ${
                      user.role === "Client"
                        ? "bg-purple-100 text-purple-800"
                        : user.role === "Super Admin"
                        ? "bg-red-100 text-red-700"
                        : "bg-blue-100 text-blue-800"
                    }`}
                >
                  {user.role || "—"}
                </span>

              </td>

              {/* ACTIONS */}
              <td className="px-4 py-3">

                <div className="flex items-center gap-1.5">

                  {/* EDIT */}
                  <IconBtn
                    title="Modifier"
                    color="text-teal-600 hover:bg-teal-50"
                    onClick={() => onEdit(user)}
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />

                  {/* DELETE */}
                  {user.role !== "Super Admin" && (
                    <IconBtn
                      title="Supprimer"
                      color="text-gray-400 hover:bg-red-50 hover:text-red-500"
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

/*  ICON BUTTON  */

function IconBtn({ title, color, onClick, d }) {
  return (
    <button
      onClick={onClick}
      title={title}
      className={`p-1.5 rounded-lg transition ${color}`}
    >
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={d} />
      </svg>
    </button>
  );
}