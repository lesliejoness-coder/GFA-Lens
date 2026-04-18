export default function RolesTable({ roles, onEdit, onDelete }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-blue-100">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-blue-50 text-blue-900">
            <th className="text-left px-5 py-3 font-semibold w-16">#</th>
            <th className="text-left px-5 py-3 font-semibold">Nom du rôle</th>
            <th className="text-left px-5 py-3 font-semibold">Agence / Filiale</th>
            <th className="text-left px-5 py-3 font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {roles.map((role, i) => (
            <tr key={role.id}
              className={`border-t border-blue-50 hover:bg-blue-50/40 transition-colors
                ${i % 2 === 0 ? "bg-white" : "bg-blue-50/10"}`}>

              <td className="px-5 py-3 text-gray-500 font-mono">{i + 1}</td>

              <td className="px-5 py-3 font-medium text-gray-800">
                <div className="flex items-center gap-2">
                  {role.nom}
                  {role.nom.toLowerCase() === "client" && (
                    <span className="px-2 py-0.5 rounded-full text-xs
                                     bg-purple-100 text-purple-700 font-semibold">
                      Client
                    </span>
                  )}
                </div>
              </td>

              {/* Agence / Filiale — visible uniquement pour Client */}
              <td className="px-5 py-3 text-xs text-gray-500">
                {role.nom.toLowerCase() === "client" ? (
                  <div className="space-y-0.5">
                    {role.agence  && <p>🏢 {role.agence}</p>}
                    {role.filiale && <p>🏦 {role.filiale}</p>}
                    {!role.agence && !role.filiale && (
                      <span className="text-gray-300 italic">Non renseigné</span>
                    )}
                  </div>
                ) : (
                  <span className="text-gray-300">—</span>
                )}
              </td>

              <td className="px-5 py-3">
                {role.protege ? (
                  <span className="text-xs text-gray-400 italic">Protégé</span>
                ) : (
                  <RoleActions
                    onEdit={() => onEdit(role)}
                    onDelete={() => onDelete(role.id)}
                  />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function RoleActions({ onEdit, onDelete }) {
  return (
    <div className="flex items-center gap-2">
      <IconBtn title="Modifier" color="text-teal-600 hover:bg-teal-50"
        onClick={onEdit}
        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
      />
      <IconBtn title="Supprimer"
        color="text-gray-400 hover:bg-red-50 hover:text-red-500"
        onClick={onDelete}
        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
      />
    </div>
  );
}

function IconBtn({ title, color, onClick, d }) {
  return (
    <button onClick={onClick} title={title}
      className={`p-1.5 rounded-lg transition-colors ${color}`}>
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={d} />
      </svg>
    </button>
  );
}
