import { PrioriteBadge, StatutBadge, TransfereBadge } from "./Badges";

const T = {
  fr: { cols: ["#", "Titre", "Agence", "Priorité", "Statut", "Date", "Actions"], empty: "Aucun incident trouvé" },
  en: { cols: ["#", "Title", "Agency", "Priority", "Status", "Date",  "Actions"], empty: "No incident found" },
  mg: { cols: ["#", "Lohateny", "Agence", "Laharam-pahamehana", "Satus", "Daty", "Hetsika"], empty: "Tsy misy olana hita" },
};

export default function IncidentsTable({ incidents, onView, onEdit, onDelete, langue = "fr" }) {
  const t = T[langue] || T.fr;

  if (incidents.length === 0) {
    return (
      <div className="text-center py-16 text-gray-400 dark:text-gray-500 bg-white dark:bg-gray-800 rounded-xl border border-blue-100 dark:border-gray-700 transition-colors">
        <p className="text-4xl mb-3">📋</p>
        <p className="text-sm">{t.empty}</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-blue-100 dark:border-gray-700 transition-colors">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-blue-50 dark:bg-gray-700 text-blue-900 dark:text-blue-300">
            {t.cols.map((h) => (
              <th key={h} className="text-left px-4 py-3 font-semibold text-xs uppercase tracking-wide">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {incidents.map((inc, i) => (
            <tr key={inc.id}
              className={`border-t border-blue-50 dark:border-gray-700 hover:bg-blue-50/40 dark:hover:bg-blue-900/10 transition-colors ${i % 2 === 0 ? "bg-white dark:bg-gray-800" : "bg-blue-50/10 dark:bg-gray-800/50"}`}>

              <td className="px-4 py-3 text-gray-400 dark:text-gray-500 font-mono text-xs">{inc.id}</td>

              <td className="px-4 py-3 max-w-xs">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="font-medium text-gray-800 dark:text-gray-100 truncate">{inc.titre}</p>
                  {inc.transfere && <TransfereBadge />}
                </div>
                <p className="text-xs text-gray-400 dark:text-gray-500 truncate mt-0.5">{inc.description}</p>
              </td>

              <td className="px-4 py-3 text-gray-600 dark:text-gray-400 text-xs whitespace-nowrap">{inc.agence}</td>
              <td className="px-4 py-3"><PrioriteBadge value={inc.priorite} /></td>
              <td className="px-4 py-3"><StatutBadge value={inc.statut} /></td>
              <td className="px-4 py-3 text-gray-500 dark:text-gray-400 text-xs whitespace-nowrap">{inc.dateDeclaration}</td>

              <td className="px-4 py-3">
                <div className="flex items-center gap-1">
                  <IconBtn title="Voir" color="text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                    onClick={() => onView(inc)}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  <IconBtn title="Modifier" color="text-teal-600 hover:bg-teal-50 dark:hover:bg-teal-900/20"
                    onClick={() => onEdit(inc)}
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  <IconBtn title="Supprimer" color="text-gray-400 hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-900/20"
                    onClick={() => onDelete(inc.id)}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function IconBtn({ title, color, onClick, d }) {
  return (
    <button onClick={onClick} title={title} className={`p-1.5 rounded-lg transition-colors ${color}`}>
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={d} />
      </svg>
    </button>
  );
}
