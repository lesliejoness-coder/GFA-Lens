import { useState } from "react";
import UsersTable from "./UsersTable";
import UserModal from "./UserModal";
import { useAppSettings } from "../../contexts/AppSettingsContext";

const T = {
  fr: {
    title: "Utilisateurs",
    subtitle: "Gestion des comptes et accès",
    newBtn: "+ Ajouter utilisateur",
    searchPlaceholder: "Rechercher un utilisateur...",
    filterAll: "Tous",
    filterActive: "Actifs",
    filterInactive: "Inactifs",
    stats: ["Total", "Actifs", "Inactifs", "Clients"],
  },
  en: {
    title: "Users",
    subtitle: "Account and access management",
    newBtn: "+ Add user",
    searchPlaceholder: "Search a user...",
    filterAll: "All",
    filterActive: "Active",
    filterInactive: "Inactive",
    stats: ["Total", "Active", "Inactive", "Clients"],
  },
  mg: {
    title: "Mpampiasa",
    subtitle: "Fitantanana kaonty sy fidirana",
    newBtn: "+ Manampy mpampiasa",
    searchPlaceholder: "Hikaroka mpampiasa...",
    filterAll: "Rehetra",
    filterActive: "Mavitrika",
    filterInactive: "Tsy mavitrika",
    stats: ["Rehetra", "Mavitrika", "Tsy mavitrika", "Mpanjifa"],
  },
};

const INITIAL_USERS = [
  { id: 1, prenom: "Jean",    nom: "Dupont",  email: "jean@mail.com",    role: "Admin",       agence: "Agence Plateau",    filiale: "AFGBank CI",       actif: true  },
  { id: 2, prenom: "Marie",   nom: "Kouassi", email: "marie@mail.com",   role: "Employé",     agence: "Agence Bonapriso",  filiale: "AFGBank Cameroun", actif: true  },
  { id: 3, prenom: "Paul",    nom: "Traoré",  email: "paul@mail.com",    role: "Client",      agence: "Agence Yopougon",   filiale: "AFGBank CI",       actif: false },
  { id: 4, prenom: "Sophie",  nom: "Martin",  email: "sophie@mail.com",  role: "Super Admin", agence: "",                  filiale: "",                 actif: true  },
];

export default function UtilisateursPage() {
  const [users, setUsers]   = useState(INITIAL_USERS);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [modal, setModal]   = useState(null);
  const { langue }          = useAppSettings();
  const t                   = T[langue] || T.fr;

  const filtered = users.filter(u => {
    const matchSearch = (u.nom + " " + u.prenom + " " + u.email + " " + u.role)
      .toLowerCase().includes(search.toLowerCase());
    const matchFilter =
      filter === "all"      ? true :
      filter === "active"   ? u.actif :
      filter === "inactive" ? !u.actif :
      filter === "client"   ? u.role === "Client" : true;
    return matchSearch && matchFilter;
  });

  const stats = [
    users.length,
    users.filter(u => u.actif).length,
    users.filter(u => !u.actif).length,
    users.filter(u => u.role === "Client").length,
  ];

  const statColors = [
    "text-blue-900 dark:text-blue-400",
    "text-green-600 dark:text-green-400",
    "text-red-500 dark:text-red-400",
    "text-purple-600 dark:text-purple-400",
  ];

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-gray-50 dark:bg-gray-900 transition-colors duration-300">

      {/* Header */}
      <div className="px-6 py-5 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 transition-colors">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">{t.title}</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{t.subtitle}</p>
          </div>
          <button
            onClick={() => setModal({})}
            className="px-4 py-2.5 bg-blue-900 text-white text-sm font-medium rounded-xl hover:bg-blue-800 transition-colors"
          >
            {t.newBtn}
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-5">

        {/* KPI Cards */}
        <div className="grid grid-cols-4 gap-4">
          {t.stats.map((label, i) => (
            <div key={label} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 transition-colors">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1 uppercase tracking-wide">{label}</p>
              <p className={`text-2xl font-bold ${statColors[i]}`}>{stats[i]}</p>
            </div>
          ))}
        </div>

        {/* Toolbar */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 px-4 py-3 flex items-center gap-3 flex-wrap transition-colors">
          <input
            className="flex-1 min-w-[200px] max-w-sm px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-colors"
            placeholder={t.searchPlaceholder}
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <div className="flex gap-2">
            {[
              { key: "all",      label: t.filterAll      },
              { key: "active",   label: t.filterActive   },
              { key: "inactive", label: t.filterInactive },
              { key: "client",   label: "Client"         },
            ].map(({ key, label }) => (
              <button key={key} onClick={() => setFilter(key)}
                className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${filter === key ? "bg-blue-900 text-white" : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"}`}>
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <UsersTable
          users={filtered}
          onEdit={u => setModal({ user: u })}
          onDelete={id => setUsers(users.filter(u => u.id !== id))}
          onToggle={id => setUsers(users.map(u => u.id === id ? { ...u, actif: !u.actif } : u))}
        />
      </div>

      {modal && (
        <UserModal
          user={modal.user}
          onClose={() => setModal(null)}
          onSave={u => {
            setUsers(prev =>
              prev.find(x => x.id === u.id)
                ? prev.map(x => x.id === u.id ? u : x)
                : [...prev, u]
            );
            setModal(null);
          }}
        />
      )}
    </div>
  );
}
