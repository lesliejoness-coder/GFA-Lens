import { useState } from "react";
import RolesTable from "./RolesTable";
import RoleModal  from "./RoleModal";

const INITIAL_ROLES = [
  { id: 1, nom: "Super Admin", protege: true },
  { id: 2, nom: "manager" },
  { id: 3, nom: "DCM" },
  { id: 4, nom: "CHEF D'AGENCE" },
  { id: 5, nom: "MANAGER G" },
  { id: 6, nom: "CONSEILLER CLIENT" },
  { id: 7, nom: "Client", agence: "", filiale: "" },
];

export default function RolesPage() {
  const [roles,  setRoles]  = useState(INITIAL_ROLES);
  const [search, setSearch] = useState("");
  const [modal,  setModal]  = useState(null);

  const filtered = roles.filter((r) =>
    r.nom.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id) =>
    setRoles((prev) => prev.filter((r) => r.id !== id));

  const handleSave = (data) => {
    setRoles((prev) =>
      prev.find((r) => r.id === data.id)
        ? prev.map((r) => (r.id === data.id ? data : r))
        : [...prev, data]
    );
    setModal(null);
  };

  return (
    <div className="flex-1 overflow-auto bg-gray-50 p-6">

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-5">
        <span className="text-blue-900">🏠 Accueil</span>
        <span>›</span>
        <span className="font-medium text-gray-700">Rôles</span>
      </div>

      <h1 className="text-2xl font-bold text-blue-900 mb-6">Rôles & Permissions</h1>

      {/* Toolbar */}
      <div className="flex items-center justify-between mb-5 gap-4 flex-wrap">
        <SearchInput value={search} onChange={setSearch} />
        <button onClick={() => setModal({})}
          className="px-5 py-2.5 bg-teal-500 hover:bg-teal-600 text-white
                     rounded-lg text-sm font-semibold transition-colors shadow-sm">
          + Ajouter un rôle
        </button>
      </div>

      <RolesTable
        roles={filtered}
        onEdit={(r) => setModal({ role: r })}
        onDelete={handleDelete}
      />

      <p className="mt-3 text-xs text-gray-400">
        {filtered.length} rôle{filtered.length > 1 ? "s" : ""}
      </p>

      {modal !== null && (
        <RoleModal
          role={modal.role}
          onClose={() => setModal(null)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}

function SearchInput({ value, onChange }) {
  return (
    <div className="relative">
      <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
        fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
      <input type="text" value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Rechercher un rôle..."
        className="pl-9 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm
                   bg-white focus:outline-none focus:ring-2 focus:ring-blue-400
                   focus:border-transparent w-64 transition-all" />
    </div>
  );
}
