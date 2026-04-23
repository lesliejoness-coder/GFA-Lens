import { useState } from "react";
import RolesTable from "./RolesTable";
import RoleModal from "./RoleModal";
import { Plus } from "lucide-react";

const INITIAL_ROLES = [
  {
    id: 1,
    nom: "Super Admin",
    protege: true,
    permissions: {
      dashboard: true,
      users: true,
      incidents: true,
      reports: true,
    },
  },
  {
    id: 2,
    nom: "Employé",
    permissions: {
      dashboard: true,
      users: false,
      incidents: true,
      reports: true,
    },
  },
  {
    id: 3,
    nom: "Client",
    permissions: {
      incidents: true,
    },
  },
];

export default function RolesPage() {
  const [roles, setRoles] = useState(INITIAL_ROLES);
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState(null);

  const filtered = roles.filter((r) =>
    r.nom.toLowerCase().includes(search.toLowerCase())
  );

  const handleSave = (role) => {
    setRoles((prev) =>
      prev.find((r) => r.id === role.id)
        ? prev.map((r) => (r.id === role.id ? role : r))
        : [...prev, role]
    );
    setModal(null);
  };

  const handleDelete = (role) => {
    if (role.protege) return;
    setRoles((prev) => prev.filter((r) => r.id !== role.id));
  };

  return (
  <div className="min-h-screen w-full bg-gray-100 flex flex-col">

    {/* HEADER */}
    <div className="w-full bg-white shadow-sm px-6 py-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-blue-900">
        Gestion des rôles
      </h1>

      <button
        onClick={() => setModal({})}
        className="bg-blue-900 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition flex items-center gap-2"
      >
           <Plus size={18} />
         Ajouter un rôle
      </button>
    </div>

    {/* CONTENU PRINCIPAL */}
    <div className="flex-1 p-6 flex flex-col gap-6">

      {/* TOOLBAR */}
      <div className="bg-white p-4 rounded-xl shadow-sm flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
        
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Rechercher un rôle..."
          className="w-full sm:w-80 px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

      </div>

      {/* TABLE CARD */}
      <div className="flex-1 bg-white rounded-2xl shadow-md p-4 overflow-auto">

        <RolesTable
          roles={filtered}
          onEdit={(role) => setModal({ role })}
          onDelete={handleDelete}
          onOpen={(role) => setModal({ role })}
        />

      </div>

    </div>

    {/* MODAL */}
    {modal && (
      <RoleModal
        role={modal.role}
        onClose={() => setModal(null)}
        onSave={handleSave}
      />
    )}

  </div>
); }