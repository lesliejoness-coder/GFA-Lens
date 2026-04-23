import { useState } from "react";
import UsersTable from "./UsersTable";
import UserModal from "./UserModal";

const INITIAL_USERS = [
  {
    id: 1,
    prenom: "Jean",
    nom: "Dupont",
    email: "jean@mail.com",
    role: "Admin",
    agence: "Plateau",
    filiale: "CI",
    actif: true,
  },
];

export default function UtilisateursPage() {
  const [users, setUsers] = useState(INITIAL_USERS);
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState(null);

  const filtered = users.filter((u) =>
    (u.nom + " " + u.prenom + " " + u.email + " " + u.role)
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
  <div className="min-h-screen w-full bg-gray-100 flex flex-col">

    {/* HEADER */}
    <div className="w-full bg-white shadow-sm px-6 py-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-blue-900">
        Gestion des utilisateurs
      </h1>

      <button
        onClick={() => setModal({})}
        className="bg-blue-900 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition"
      >
        + Ajouter utilisateur
      </button>
    </div>

    {/* CONTENU */}
    <div className="flex-1 p-6 flex flex-col gap-6">

      {/* TOOLBAR */}
      <div className="bg-white p-4 rounded-xl shadow-sm flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">

        <input
          className="w-full sm:w-80 px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Rechercher un utilisateur..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

      </div>

      {/* TABLE */}
      <div className="flex-1 bg-white rounded-2xl shadow-md p-4 overflow-auto">

        <UsersTable
          users={filtered}
          onEdit={(u) => setModal({ user: u })}
          onDelete={(id) => setUsers(users.filter((u) => u.id !== id))}
          onToggle={(id) =>
            setUsers(users.map((u) =>
              u.id === id ? { ...u, actif: !u.actif } : u
            ))
          }
        />

      </div>

    </div>

    {/* MODAL */}
    {modal && (
      <UserModal
        user={modal.user}
        onClose={() => setModal(null)}
        onSave={(u) => {
          setUsers((prev) =>
            prev.find((x) => x.id === u.id)
              ? prev.map((x) => (x.id === u.id ? u : x))
              : [...prev, u]
          );
          setModal(null);
        }}
      />
    )}

  </div>
);   }