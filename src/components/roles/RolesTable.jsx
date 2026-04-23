import { Pencil, Trash2 } from "lucide-react";

export default function RolesTable({ roles, onEdit, onDelete, onOpen }) {
  return (
    <div className="overflow-x-auto bg-white rounded-xl border">

      <table className="w-full text-sm">

        <thead className="bg-blue-50 text-blue-900">
          <tr>
            <th className="text-left p-3">Rôle</th>
            <th className="text-left p-3">Permissions</th>
            <th className="text-left p-3">Actions</th>
          </tr>
        </thead>

        <tbody>
          {roles.map((role) => (
            <tr
              key={role.id}
              className="border-t hover:bg-blue-50 cursor-pointer"
              onDoubleClick={() => onOpen(role)}
            >

              <td className="p-3 font-medium">
                {role.nom}
              </td>

              <td className="p-3 text-xs text-gray-600">
                {Object.keys(role.permissions || {})
                  .filter((k) => role.permissions[k])
                  .join(", ") || "Aucune"}
              </td>

              <td className="p-3 flex gap-3">

                {/* MODIFIER */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit(role);
                  }}
                  className="text-teal-600 hover:bg-teal-100 p-2 rounded-lg transition"
                  title="Modifier"
                >
                  <Pencil size={16} />
                </button>

                {/* SUPPRIMER */}
                {!role.protege && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(role);
                    }}
                    className="text-red-500 hover:bg-red-100 p-2 rounded-lg transition"
                    title="Supprimer"
                  >
                    <Trash2 size={16} />
                  </button>
                )}

              </td>

            </tr>
          ))}
        </tbody>

      </table>

    </div>
  );
}