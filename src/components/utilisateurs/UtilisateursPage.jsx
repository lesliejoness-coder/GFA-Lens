import { useState } from "react";
import UsersTable from "./UsersTable";
import UserModal  from "./UserModal";

const INITIAL_USERS = [
  { id: 1, prenom: "Organization", nom: "User",
    email: "organizationuser@mail.com",
    agence: "", filiale: "", role: "Super Admin", actif: true },
  { id: 2, prenom: "Jean", nom: "Manager",
    email: "ethicalkev+pentest@gmail.com",
    agence: "", filiale: "AFGBank CI", role: "manager", actif: true },
  { id: 3, prenom: "Fabrice", nom: "FABO",
    email: "contact@carebusinessconsulting.com",
    agence: "Agence Plateau", filiale: "AFGBank CI", role: "CHEF D'AGENCE", actif: true },
  { id: 4, prenom: "Assika", nom: "Kone",
    email: "assikai38@gmail.com",
    agence: "Agence Bonapriso", filiale: "AFGBank Cameroun", role: "MANAGER G", actif: true },
  { id: 5, prenom: "Fabrice", nom: "Kouomou",
    email: "fabrice.kouomou@carebusinessconsulting.com",
    agence: "Agence Centre-ville", filiale: "AFGBank CI", role: "manager", actif: true },
  { id: 6, prenom: "Paul", nom: "ASSALE",
    email: "assikai3@gmail.com",
    agence: "Agence Yopougon", filiale: "AFGBank CI", role: "MANAGER G", actif: true },
  { id: 7, prenom: "Loïs", nom: "LOES",
    email: "assikai8@gmail.com",
    agence: "Agence Akwa", filiale: "AFGBank Cameroun", role: "CHEF D'AGENCE", actif: true },
  { id: 8, prenom: "Ange", nom: "BILE",
    email: "assikai2@gmail.com",
    agence: "", filiale: "AFGBank Sénégal", role: "DCM", actif: true },
  { id: 9, prenom: "Marc", nom: "CLIENT",
    email: "client@afgbank.com",
    agence: "Mon agence propre", filiale: "Ma filiale", role: "Client", actif: true },
];

export default function UtilisateursPage() {
  const [users,  setUsers]  = useState(INITIAL_USERS);
  const [search, setSearch] = useState("");
  const [modal,  setModal]  = useState(null); // null | { user? }

  const filtered = users.filter((u) => {
    const q = search.toLowerCase();
    return (
      (u.prenom || "").toLowerCase().includes(q) ||
      (u.nom    || "").toLowerCase().includes(q) ||
      u.email.toLowerCase().includes(q)           ||
      u.role.toLowerCase().includes(q)
    );
  });

  const handleToggle = (id) =>
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, actif: !u.actif } : u))
    );

  const handleDelete = (id) =>
    setUsers((prev) => prev.filter((u) => u.id !== id));

  const handleSave = (data) => {
    setUsers((prev) =>
      prev.find((u) => u.id === data.id)
        ? prev.map((u) => (u.id === data.id ? data : u))
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
        <span className="font-medium text-gray-700">Utilisateurs</span>
      </div>

      <h1 className="text-2xl font-bold text-blue-900 mb-6">Utilisateurs</h1>

      {/* Toolbar */}
      <div className="flex items-center justify-between mb-5 gap-4 flex-wrap">
        <SearchInput value={search} onChange={setSearch} />
        <button onClick={() => setModal({})}
          className="px-5 py-2.5 bg-teal-500 hover:bg-teal-600 text-white
                     rounded-lg text-sm font-semibold transition-colors shadow-sm">
          + Ajouter
        </button>
      </div>

      <UsersTable
        users={filtered}
        onToggle={handleToggle}
        onEdit={(u) => setModal({ user: u })}
        onDelete={handleDelete}
      />

      <p className="mt-3 text-xs text-gray-400">
        {filtered.length} utilisateur{filtered.length > 1 ? "s" : ""}
      </p>

      {modal !== null && (
        <UserModal
          user={modal.user}
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
      <input type="text" value={value} onChange={(e) => onChange(e.target.value)}
        placeholder="Recherche par mot-clé..."
        className="pl-9 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm
                   bg-white focus:outline-none focus:ring-2 focus:ring-blue-400
                   focus:border-transparent w-64 transition-all" />
    </div>
  );
}
