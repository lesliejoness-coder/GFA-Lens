import { PrioriteBadge, StatutBadge, TransfereBadge } from "./Badges";

const T = {
  fr: {
    incident:       "Incident #",
    description:    "Description",
    noDesc:         "Aucune description fournie.",
    pj:             "Pièce jointe",
    historique:     "Historique",
    actions:        "actions",
    agence:         "Agence",
    agent:          "Employé assigné",
    noAgent:        "Aucun employé",
    dateDecl:       "Date déclaration",
    dateResol:      "Date résolution",
    affecter:       "Affecter à",
    modifier:       "Modifier",
  },
  en: {
    incident:       "Incident #",
    description:    "Description",
    noDesc:         "No description provided.",
    pj:             "Attachment",
    historique:     "History",
    actions:        "actions",
    agence:         "Agency",
    agent:          "Assigned employee",
    noAgent:        "No employee",
    dateDecl:       "Declaration date",
    dateResol:      "Resolution date",
    affecter:       "Assign to",
    modifier:       "Edit",
  },
  mg: {
    incident:       "Olana #",
    description:    "Famaritana",
    noDesc:         "Tsy nomen'ny famaritana.",
    pj:             "Rakitra mampiseho",
    historique:     "Tantara",
    actions:        "hetsika",
    agence:         "Agence",
    agent:          "Mpiasa voatendry",
    noAgent:        "Tsy misy mpiasa",
    dateDecl:       "Datin'ny fanambarana",
    dateResol:      "Datin'ny vahaolana",
    affecter:       "Mampiantra",
    modifier:       "Hanova",
  },
};

const IMAGE_REGEX = /\.(png|jpe?g|gif|webp|bmp|svg)$/i;

export default function IncidentDetail({ incident, onClose, onEdit, onTransferer, isAdmin, langue = "fr" }) {
  const t = T[langue] || T.fr;
  if (!incident) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/40 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-800 h-full w-full max-w-md shadow-2xl flex flex-col overflow-hidden transition-colors duration-300">

        {/* Header */}
        <div className="bg-blue-900 dark:bg-blue-950 px-6 py-4 flex items-start justify-between flex-shrink-0">
          <div className="flex-1 min-w-0 pr-4">
            <p className="text-blue-300 text-xs mb-1">{t.incident}{incident.id}</p>
            <h2 className="text-white font-semibold text-base leading-tight line-clamp-2">{incident.titre}</h2>
          </div>
          <button onClick={onClose} className="text-blue-300 hover:text-white transition-colors mt-0.5">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">

          {/* Badges */}
          <div className="flex items-center gap-2 flex-wrap">
            <PrioriteBadge value={incident.priorite} />
            <StatutBadge   value={incident.statut} />
            {incident.transfere && <TransfereBadge />}
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: t.agence,    value: incident.agence },
              { label: t.agent,     value: incident.agent || t.noAgent },
              { label: t.dateDecl,  value: incident.dateDeclaration },
              { label: t.dateResol, value: incident.dateResolution || "—" },
            ].map(({ label, value }) => (
              <div key={label} className="bg-gray-50 dark:bg-gray-700 rounded-xl p-3 border border-gray-100 dark:border-gray-600">
                <p className="text-xs text-gray-400 dark:text-gray-500 mb-1">{label}</p>
                <p className="text-sm font-medium text-gray-800 dark:text-gray-100">{value}</p>
              </div>
            ))}
          </div>

          {/* Description */}
          <Section title={t.description}>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              {incident.description || t.noDesc}
            </p>
          </Section>

          {/* Pièce jointe */}
          {incident.pieceJointe && (
            <Section title={t.pj}>
              {incident.pieceJointeUrl && IMAGE_REGEX.test(incident.pieceJointe) ? (
                <div className="space-y-2">
                  <div className="rounded-xl overflow-hidden border border-blue-100 dark:border-blue-800 bg-gray-50 dark:bg-gray-700">
                    <img src={incident.pieceJointeUrl} alt={incident.pieceJointe} className="w-full max-h-60 object-contain" />
                  </div>
                  <p className="text-xs text-center text-gray-400 dark:text-gray-500">{incident.pieceJointe}</p>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-sm text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-lg px-3 py-2">
                  <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                  </svg>
                  <span className="truncate">{incident.pieceJointe}</span>
                </div>
              )}
            </Section>
          )}

          {/* Historique */}
          <Section title={`${t.historique} (${incident.historique?.length || 0} ${t.actions})`}>
            <div className="space-y-0">
              {(incident.historique || []).map((h, i) => (
                <div key={i} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-blue-700 dark:bg-blue-500 ring-2 ring-blue-200 dark:ring-blue-800 flex-shrink-0 mt-0.5" />
                    {i < incident.historique.length - 1 && <div className="w-px flex-1 bg-blue-100 dark:bg-blue-800 mt-1 min-h-4" />}
                  </div>
                  <div className="pb-4 flex-1 min-w-0">
                    <p className="text-xs text-gray-400 dark:text-gray-500">{h.date}</p>
                    <p className="text-sm text-gray-700 dark:text-gray-300 font-medium mt-0.5">{h.action}</p>
                    {h.ancienStatut && (
                      <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                        {h.ancienStatut} → {h.nouveauStatut}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Section>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between gap-3 flex-shrink-0">
          {isAdmin ? (
            <button onClick={() => onTransferer(incident)}
              className="px-4 py-2 rounded-lg bg-purple-100 dark:bg-purple-900/40 text-purple-800 dark:text-purple-300 text-sm font-medium hover:bg-purple-200 dark:hover:bg-purple-900/60 transition-colors flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
              {t.affecter}
            </button>
          ) : <span />}
          <button onClick={() => onEdit(incident)}
            className="px-5 py-2 rounded-lg bg-blue-900 text-white text-sm font-medium hover:bg-blue-800 transition-colors">
            {t.modifier}
          </button>
        </div>
      </div>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div>
      <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-3">{title}</p>
      {children}
    </div>
  );
}
