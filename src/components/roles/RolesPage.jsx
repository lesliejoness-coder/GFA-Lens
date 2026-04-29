import { useState } from "react";
import RolesTable from "./RolesTable";
import RoleModal  from "./RoleModal";
import { Plus }   from "lucide-react";
import { useAppSettings } from "../../contexts/AppSettingsContext";

const T = {
  fr: {
    title:             "Rôles & Permissions",
    subtitle:          "Gestion des rôles et droits d'accès",
    newBtn:            "Ajouter un rôle",
    searchPlaceholder: "Rechercher un rôle...",
    stats:             ["Total rôles", "Protégés", "Personnalisés"],
  },
  en: {
    title:             "Roles & Permissions",
    subtitle:          "Role and access rights management",
    newBtn:            "Add role",
    searchPlaceholder: "Search a role...",
    stats:             ["Total roles", "Protected", "Custom"],
  },
  mg: {
    title:             "Andraikitra & Fahazoan-dàlana",
    subtitle:          "Fitantanana andraikitra sy zo fidirana",
    newBtn:            "Manampy andraikitra",
    searchPlaceholder: "Hikaroka andraikitra...",
    stats:             ["Andraikitra rehetra", "Voaaro", "Manokana"],
  },
};

const INITIAL_ROLES = [
  { id: 1, nom: "Super Admin", protege: true,  permissions: { dashboard: true,  utilisateurs: true,  incidents: true,  rapports: true,  paramètres: true  } },
  { id: 2, nom: "Admin",       protege: false, permissions: { dashboard: true,  utilisateurs: true,  incidents: true,  rapports: true,  paramètres: false } },
  { id: 3, nom: "Employé",     protege: false, permissions: { dashboard: true,  utilisateurs: false, incidents: true,  rapports: true,  paramètres: false } },
  { id: 4, nom: "Client",      protege: false, permissions: { dashboard: false, utilisateurs: false, incidents: true,  rapports: false, paramètres: false } },
];

export default function RolesPage() {
  const [roles, setRoles] = useState(INITIAL_ROLES);
  const [search, setSearch] = useState("");
  const [modal, setModal]   = useState(null);
  const { langue }          = useAppSettings();
  const t                   = T[langue] || T.fr;

  const filtered = roles.filter(r =>
    r.nom.toLowerCase().includes(search.toLowerCase())
  );

  const handleSave = role => {
    setRoles(prev =>
      prev.find(r => r.id === role.id)
        ? prev.map(r => r.id === role.id ? role : r)
        : [...prev, role]
    );
    setModal(null);
  };

  const handleDelete = role => {
    if (role.protege) return;
    setRoles(prev => prev.filter(r => r.id !== role.id));
  };

  const stats = [
    roles.length,
    roles.filter(r => r.protege).length,
    roles.filter(r => !r.protege).length,
  ];

  const statColors = [
    "text-blue-900 dark:text-blue-400",
    "text-red-500 dark:text-red-400",
    "text-teal-600 dark:text-teal-400",
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
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-900 text-white text-sm font-medium rounded-xl hover:bg-blue-800 transition-colors"
          >
            <Plus size={16} />
            {t.newBtn}
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-5">

        {/* KPI Cards */}
        <div className="grid grid-cols-3 gap-4">
          {t.stats.map((label, i) => (
            <div key={label} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 transition-colors">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1 uppercase tracking-wide">{label}</p>
              <p className={`text-2xl font-bold ${statColors[i]}`}>{stats[i]}</p>
            </div>
          ))}
        </div>

        {/* Toolbar */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 px-4 py-3 transition-colors">
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder={t.searchPlaceholder}
            className="w-full max-w-sm px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-colors"
          />
        </div>

        {/* Table */}
        <RolesTable
          roles={filtered}
          onEdit={role => setModal({ role })}
          onDelete={handleDelete}
          onOpen={role => setModal({ role })}
        />
      </div>

      {modal && (
        <RoleModal
          role={modal.role}
          onClose={() => setModal(null)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
