import { useState, useMemo } from "react";
import { INITIAL_INCIDENTS } from "./incidentsData";
import IncidentsStats   from "./IncidentsStats";
import IncidentsFilters from "./IncidentsFilters";
import IncidentsTable   from "./IncidentsTable";
import IncidentModal    from "./IncidentModal";
import IncidentDetail   from "./IncidentDetail";
import TransfertModal   from "./TransfertModal";
import { useAppSettings } from "../../contexts/AppSettingsContext";

export const T_INCIDENTS = {
  fr: {
    breadcrumbHome: "Accueil",
    breadcrumbPage: "Suivi des incidents",
    title:          "Suivi des incidents",
    declareBtn:     "Déclarer un incident",
    counter:        (n, total) => `${n} incident${n > 1 ? "s" : ""}${n !== total ? ` sur ${total}` : ""}`,
  },
  en: {
    breadcrumbHome: "Home",
    breadcrumbPage: "Incident Tracking",
    title:          "Incident Tracking",
    declareBtn:     "Report an incident",
    counter:        (n, total) => `${n} incident${n > 1 ? "s" : ""}${n !== total ? ` of ${total}` : ""}`,
  },
  mg: {
    breadcrumbHome: "Fandraisana",
    breadcrumbPage: "Fanaraha-maso ny olana",
    title:          "Fanaraha-maso ny olana",
    declareBtn:     "Milaza olana",
    counter:        (n, total) => `${n} olana${n !== total ? ` amin'ny ${total}` : ""}`,
  },
};

const IS_ADMIN = true;
const EMPTY_FILTERS = { search: "", priorite: "", statut: "", agence: "" };

export default function IncidentsPage() {
  const { langue } = useAppSettings();
  const t = T_INCIDENTS[langue] || T_INCIDENTS.fr;

  const [incidents, setIncidents] = useState(INITIAL_INCIDENTS);
  const [filters,   setFilters]   = useState(EMPTY_FILTERS);
  const [modal,     setModal]     = useState(null);
  const [detail,    setDetail]    = useState(null);
  const [transfert, setTransfert] = useState(null);

  const filtered = useMemo(() => {
    const q = filters.search.toLowerCase();
    return incidents.filter((inc) => {
      if (filters.priorite && inc.priorite !== filters.priorite) return false;
      if (filters.statut   && inc.statut   !== filters.statut)   return false;
      if (filters.agence   && inc.agence   !== filters.agence)   return false;
      if (q &&
        !inc.titre.toLowerCase().includes(q) &&
        !inc.description.toLowerCase().includes(q) &&
        !inc.agence.toLowerCase().includes(q)
      ) return false;
      return true;
    });
  }, [incidents, filters]);

  const handleSave = (data) => {
    setIncidents((prev) =>
      prev.find((i) => i.id === data.id)
        ? prev.map((i) => (i.id === data.id ? data : i))
        : [data, ...prev]
    );
    setModal(null);
    if (detail?.id === data.id) setDetail(data);
  };

  const handleDelete = (id) => {
    if (!window.confirm("Supprimer cet incident ?")) return;
    setIncidents((prev) => prev.filter((i) => i.id !== id));
    if (detail?.id === id) setDetail(null);
  };

  const handleEdit = (inc) => { setDetail(null); setModal({ incident: inc }); };
  const handleTransferer = (inc) => { setDetail(null); setTransfert(inc); };

  const handleConfirmTransfert = (formData) => {
    const dateStr = new Date().toISOString().replace("T", " ").slice(0, 16);
    setIncidents((prev) =>
      prev.map((i) => {
        if (i.id !== transfert.id) return i;
        return {
          ...i, transfere: true,
          historique: [...i.historique, {
            date: dateStr,
            action: `Transféré vers ${formData.dest}${formData.motif ? ` — ${formData.motif}` : ""}`,
            ancienStatut: i.statut, nouveauStatut: i.statut,
          }],
        };
      })
    );
    setTransfert(null);
  };

  return (
    <div className="flex-1 overflow-auto bg-gray-50 dark:bg-gray-900 p-6 transition-colors duration-300">

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-5">
        <span className="text-blue-900 dark:text-blue-400">🏠 {t.breadcrumbHome}</span>
        <span>›</span>
        <span className="font-medium text-gray-700 dark:text-gray-300">{t.breadcrumbPage}</span>
      </div>

      {/* Titre + bouton */}
      <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
        <h1 className="text-2xl font-bold text-blue-900 dark:text-blue-400">{t.title}</h1>
        <button onClick={() => setModal({})}
          className="px-5 py-2.5 bg-teal-500 hover:bg-teal-600 text-white rounded-lg text-sm font-semibold transition-colors shadow-sm flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          {t.declareBtn}
        </button>
      </div>

      <IncidentsStats incidents={incidents} langue={langue} />
      <IncidentsFilters filters={filters} onChange={setFilters} langue={langue} />
      <IncidentsTable incidents={filtered} onView={setDetail} onEdit={handleEdit} onDelete={handleDelete} langue={langue} />

      <p className="mt-3 text-xs text-gray-400 dark:text-gray-500">
        {t.counter(filtered.length, incidents.length)}
      </p>

      {modal !== null && (
        <IncidentModal incident={modal.incident} onClose={() => setModal(null)} onSave={handleSave} langue={langue} />
      )}
      {detail && (
        <IncidentDetail incident={detail} onClose={() => setDetail(null)} onEdit={handleEdit} onTransferer={handleTransferer} isAdmin={IS_ADMIN} langue={langue} />
      )}
      {transfert && (
        <TransfertModal incident={transfert} onClose={() => setTransfert(null)} onConfirm={handleConfirmTransfert} langue={langue} />
      )}
    </div>
  );
}
