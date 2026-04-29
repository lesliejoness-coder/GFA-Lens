import { useState } from "react";
import { mockFiliales } from "../data/mockData";
import { useAppSettings } from "../contexts/AppSettingsContext";

// ─── TRADUCTIONS ───────────────────────────────────────────────
const T = {
  fr: {
    title: "Filiales", subtitle: "Structure hiérarchique du groupe",
    newBtn: "+ Nouvelle filiale", search: "Rechercher une filiale...",
    subFiliales: "Sous-filiales", agences: "Agences directes",
    colAgence: "Agence", colLocalisation: "Localisation",
    colType: "Type", colResponsable: "Responsable",
    colStatut: "Statut", colActions: "Actions",
    noAgences: "Aucune agence dans cette filiale",
    agenceCount: (n) => `${n} agence${n > 1 ? "s" : ""}`,
    subCount: (n) => `${n} sous-filiale${n > 1 ? "s" : ""}`,
    modify: "Modifier", delete: "Supprimer",
    // Modal
    modalTitle: "Nouvelle filiale", modalEdit: "Modifier la filiale",
    nomLbl: "Nom *", nomPlaceholder: "Ex: AFGBank Garoua",
    paysLbl: "Pays", villeLbl: "Ville",
    descLbl: "Description", descPlaceholder: "Description courte...",
    parentLbl: "Filiale parente", parentDefault: "— Filiale principale (racine)",
    statutLbl: "Statut",
    cancel: "Annuler", save: "Créer la filiale", saveEdit: "Enregistrer",
    PAYS: ["Cameroun", "Côte d'Ivoire", "Sénégal", "Mali", "Burkina Faso", "Guinée", "Gabon", "France"],
    STATUTS: ["Active", "Inactive", "Maintenance"],
  },
  en: {
    title: "Branches", subtitle: "Group hierarchical structure",
    newBtn: "+ New branch", search: "Search a branch...",
    subFiliales: "Sub-branches", agences: "Direct agencies",
    colAgence: "Agency", colLocalisation: "Location",
    colType: "Type", colResponsable: "Manager",
    colStatut: "Status", colActions: "Actions",
    noAgences: "No agency in this branch",
    agenceCount: (n) => `${n} agenc${n > 1 ? "ies" : "y"}`,
    subCount: (n) => `${n} sub-branch${n > 1 ? "es" : ""}`,
    modify: "Edit", delete: "Delete",
    modalTitle: "New branch", modalEdit: "Edit branch",
    nomLbl: "Name *", nomPlaceholder: "Ex: AFGBank Garoua",
    paysLbl: "Country", villeLbl: "City",
    descLbl: "Description", descPlaceholder: "Short description...",
    parentLbl: "Parent branch", parentDefault: "— Main branch (root)",
    statutLbl: "Status",
    cancel: "Cancel", save: "Create branch", saveEdit: "Save",
    PAYS: ["Cameroon", "Ivory Coast", "Senegal", "Mali", "Burkina Faso", "Guinea", "Gabon", "France"],
    STATUTS: ["Active", "Inactive", "Maintenance"],
  },
  mg: {
    title: "Filiale", subtitle: "Firafitry ny vondrona",
    newBtn: "+ Filiale vaovao", search: "Hikaroka filiale...",
    subFiliales: "Sous-filiale", agences: "Agence mivantana",
    colAgence: "Agence", colLocalisation: "Toerana",
    colType: "Karazana", colResponsable: "Tompon'andraikitra",
    colStatut: "Toe-javatra", colActions: "Hetsika",
    noAgences: "Tsy misy agence amin'ity filiale ity",
    agenceCount: (n) => `${n} agence`,
    subCount: (n) => `${n} sous-filiale`,
    modify: "Hanova", delete: "Hamafa",
    modalTitle: "Filiale vaovao", modalEdit: "Hanova filiale",
    nomLbl: "Anarana *", nomPlaceholder: "Ohatra: AFGBank Garoua",
    paysLbl: "Firenena", villeLbl: "Tanàna",
    descLbl: "Famaritana", descPlaceholder: "Famaritana fohy...",
    parentLbl: "Filiale ray aman-dreny", parentDefault: "— Filiale lehibe (fototra)",
    statutLbl: "Toe-javatra",
    cancel: "Hanafoana", save: "Mamorona filiale", saveEdit: "Tehirizo",
    PAYS: ["Cameroun", "Côte d'Ivoire", "Sénégal", "Mali", "Burkina Faso", "Guinée", "Gabon", "France"],
    STATUTS: ["Active", "Inactive", "Maintenance"],
  },
};

// ─── BADGE STATUT ──────────────────────────────────────────────
function Badge({ statut }) {
  const map = {
    Active:      "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300",
    Inactive:    "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400",
    Bloquée:     "bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300",
    Maintenance: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300",
  };
  return (
    <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${map[statut] || "bg-gray-100 text-gray-700"}`}>
      {statut}
    </span>
  );
}

// ─── MODAL CRÉER / MODIFIER FILIALE ───────────────────────────
function ModalFiliale({ onClose, onSave, filiales, t, filialeToEdit }) {
  const [form, setForm] = useState({
    nom:        filialeToEdit?.nom        || "",
    pays:       filialeToEdit?.pays       || "",
    ville:      filialeToEdit?.ville      || "",
    description: filialeToEdit?.description || "",
    parentId:   filialeToEdit?.parentId   != null ? String(filialeToEdit.parentId) : "",
    statut:     filialeToEdit?.statut     || "Active",
  });

  const s = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const inp = "w-full border border-gray-200 dark:border-gray-600 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 dark:bg-gray-700 focus:bg-white dark:focus:bg-gray-600 text-gray-900 dark:text-gray-100 transition-colors";
  const lbl = "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1";

  // Toutes les filiales disponibles comme parente (filiales + leurs sous-filiales)
  const allParents = [
    ...filiales.map(f => ({ id: f.id, nom: f.nom, level: 0 })),
    ...filiales.flatMap(f => (f.sousFiliales || []).map(sf => ({ id: sf.id, nom: sf.nom, level: 1 }))),
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...(filialeToEdit || {}),
      nom:         form.nom,
      pays:        form.pays,
      ville:       form.ville,
      description: form.description,
      parentId:    form.parentId ? parseInt(form.parentId) : null,
      statut:      form.statut,
      agences:     filialeToEdit?.agences     || [],
      sousFiliales: filialeToEdit?.sousFiliales || [],
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md transition-colors">
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            {filialeToEdit ? t.modalEdit : t.modalTitle}
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 text-2xl leading-none">×</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="px-6 py-5 space-y-4">

            {/* Nom */}
            <div>
              <label className={lbl}>{t.nomLbl}</label>
              <input required placeholder={t.nomPlaceholder} value={form.nom}
                onChange={e => s("nom", e.target.value)} className={inp} />
            </div>

            {/* Pays + Ville */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={lbl}>{t.paysLbl}</label>
                <select value={form.pays} onChange={e => s("pays", e.target.value)} className={inp}>
                  <option value="">—</option>
                  {t.PAYS.map(p => <option key={p}>{p}</option>)}
                </select>
              </div>
              <div>
                <label className={lbl}>{t.villeLbl}</label>
                <input placeholder="Ex: Douala" value={form.ville}
                  onChange={e => s("ville", e.target.value)} className={inp} />
              </div>
            </div>

            {/* Filiale parente */}
            <div>
              <label className={lbl}>{t.parentLbl}</label>
              <select value={form.parentId} onChange={e => s("parentId", e.target.value)} className={inp}>
                <option value="">{t.parentDefault}</option>
                {allParents.map(p => (
                  <option key={p.id} value={p.id}>
                    {p.level === 1 ? "↳ " : ""}{p.nom}
                  </option>
                ))}
              </select>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                Laisser vide pour créer une filiale principale
              </p>
            </div>

            {/* Description */}
            <div>
              <label className={lbl}>{t.descLbl}</label>
              <textarea rows={2} placeholder={t.descPlaceholder} value={form.description}
                onChange={e => s("description", e.target.value)}
                className={`${inp} resize-none`} />
            </div>

            {/* Statut */}
            <div>
              <label className={lbl}>{t.statutLbl}</label>
              <div className="flex gap-4">
                {t.STATUTS.map(st => (
                  <label key={st} className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="statut" value={st}
                      checked={form.statut === st} onChange={() => s("statut", st)}
                      className="text-blue-600 accent-blue-700" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">{st}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex gap-3 px-6 pb-6">
            <button type="button" onClick={onClose}
              className="flex-1 py-2.5 border border-gray-200 dark:border-gray-600 rounded-xl text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              {t.cancel}
            </button>
            <button type="submit"
              className="flex-1 py-2.5 bg-blue-900 text-white rounded-xl text-sm hover:bg-blue-800 transition-colors font-medium">
              {filialeToEdit ? t.saveEdit : t.save}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── TABLEAU AGENCES D'UNE FILIALE ────────────────────────────
function AgencesTable({ agences, t }) {
  if (agences.length === 0) {
    return (
      <p className="text-xs text-gray-400 dark:text-gray-500 italic py-3 px-2">{t.noAgences}</p>
    );
  }
  return (
    <div className="overflow-x-auto rounded-xl border border-gray-100 dark:border-gray-700 mt-2">
      <table className="w-full text-sm">
        <thead className="bg-gray-50 dark:bg-gray-700/50">
          <tr>
            {[t.colAgence, t.colLocalisation, t.colType, t.colResponsable, t.colStatut, t.colActions].map(h => (
              <th key={h} className="text-left py-2.5 px-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase whitespace-nowrap">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {agences.map(a => (
            <tr key={a.id} className="border-t border-gray-50 dark:border-gray-700 hover:bg-blue-50/20 dark:hover:bg-blue-900/10 transition-colors">
              <td className="py-2.5 px-4 font-medium text-gray-900 dark:text-gray-100">{a.nom}</td>
              <td className="py-2.5 px-4 text-gray-600 dark:text-gray-400">{a.localisation}</td>
              <td className="py-2.5 px-4 text-gray-500 dark:text-gray-400">{a.type}</td>
              <td className="py-2.5 px-4 text-gray-600 dark:text-gray-400">{a.responsable || "—"}</td>
              <td className="py-2.5 px-4"><Badge statut={a.statut} /></td>
              <td className="py-2.5 px-4">
                <div className="flex gap-2">
                  <button className="text-xs text-blue-600 hover:underline">{t.modify}</button>
                  <button className="text-xs text-red-500 hover:underline">{t.delete}</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ─── CARTE FILIALE (récursive) ────────────────────────────────
function FilialeCard({ filiale, depth = 0, t, onEdit }) {
  const [expanded, setExpanded] = useState(depth === 0);

  const totalAgences = filiale.agences.length;
  const totalSous    = (filiale.sousFiliales || []).length;

  const headerBg = depth === 0
    ? "bg-blue-900 dark:bg-blue-950"
    : "bg-blue-700 dark:bg-blue-800";

  return (
    <div className={`rounded-xl border overflow-hidden shadow-sm ${
      depth === 0
        ? "border-gray-200 dark:border-gray-700"
        : "border-blue-200 dark:border-blue-800"
    }`}>
      {/* En-tête de la carte */}
      <div
        className={`flex items-center justify-between px-5 py-4 cursor-pointer ${headerBg} text-white select-none`}
        onClick={() => setExpanded(v => !v)}
      >
        <div className="flex items-center gap-3">
          <span className="text-xs opacity-60">{expanded ? "▾" : "▸"}</span>
          <div className={`w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center font-bold text-sm`}>
            {filiale.nom.charAt(0)}
          </div>
          <div>
            <h3 className="font-semibold text-sm">{filiale.nom}</h3>
            <p className="text-xs opacity-70 mt-0.5">
              {filiale.ville && `${filiale.ville}, `}{filiale.pays}
              {totalAgences > 0 && ` · ${t.agenceCount(totalAgences)}`}
              {totalSous > 0 && ` · ${t.subCount(totalSous)}`}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${
            filiale.statut === "Active" ? "bg-green-400/20 text-green-100" : "bg-gray-400/20 text-gray-200"
          }`}>
            {filiale.statut}
          </span>
          <button
            onClick={e => { e.stopPropagation(); onEdit(filiale); }}
            className="text-xs text-white/70 hover:text-white transition-colors px-2 py-1 rounded-lg hover:bg-white/10"
          >
            {t.modify}
          </button>
        </div>
      </div>

      {/* Contenu déplié */}
      {expanded && (
        <div className="bg-white dark:bg-gray-800 transition-colors">

          {/* Sous-filiales */}
          {(filiale.sousFiliales || []).length > 0 && (
            <div className="px-5 pt-5 pb-3">
              <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-3">
                {t.subFiliales}
              </p>
              <div className="space-y-3">
                {filiale.sousFiliales.map(sf => (
                  <FilialeCard key={sf.id} filiale={sf} depth={depth + 1} t={t} onEdit={onEdit} />
                ))}
              </div>
            </div>
          )}

          {/* Agences directes */}
          <div className="px-5 py-4">
            {(filiale.sousFiliales || []).length > 0 && (
              <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-2">
                {t.agences}
              </p>
            )}
            <AgencesTable agences={filiale.agences} t={t} />
          </div>
        </div>
      )}
    </div>
  );
}

// ─── PAGE PRINCIPALE ──────────────────────────────────────────
export default function FilialePage() {
  const [filiales, setFiliales] = useState(mockFiliales);
  const [showModal, setShowModal]   = useState(false);
  const [editTarget, setEditTarget] = useState(null);
  const [search, setSearch] = useState("");
  const { langue } = useAppSettings();
  const t = T[langue] || T.fr;

  // Sauvegarde (création ou édition)
  const handleSave = (data) => {
    if (data.id) {
      // Édition — mise à jour récursive
      const update = (list) => list.map(f => {
        if (f.id === data.id) return { ...f, ...data };
        return { ...f, sousFiliales: update(f.sousFiliales || []) };
      });
      setFiliales(prev => update(prev));
    } else {
      // Création
      const newF = { id: Date.now(), ...data };
      if (data.parentId) {
        const inject = (list) => list.map(f => {
          if (f.id === data.parentId) return { ...f, sousFiliales: [...(f.sousFiliales || []), newF] };
          return { ...f, sousFiliales: inject(f.sousFiliales || []) };
        });
        setFiliales(prev => inject(prev));
      } else {
        setFiliales(prev => [...prev, newF]);
      }
    }
  };

  const handleEdit = (filiale) => {
    setEditTarget(filiale);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditTarget(null);
  };

  const filtered = filiales.filter(f =>
    f.nom.toLowerCase().includes(search.toLowerCase()) ||
    (f.pays || "").toLowerCase().includes(search.toLowerCase())
  );

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
            onClick={() => { setEditTarget(null); setShowModal(true); }}
            className="px-4 py-2.5 bg-blue-900 text-white text-sm font-medium rounded-xl hover:bg-blue-800 transition-colors"
          >
            {t.newBtn}
          </button>
        </div>
      </div>

      {/* Barre de recherche */}
      <div className="px-6 py-3 bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700 transition-colors">
        <input
          type="text"
          placeholder={t.search}
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full max-w-sm px-4 py-2 text-sm border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-colors"
        />
      </div>

      {/* Liste des filiales */}
      <main className="flex-1 overflow-y-auto p-6">
        <div className="space-y-4 max-w-5xl mx-auto">
          {filtered.map(f => (
            <FilialeCard key={f.id} filiale={f} t={t} onEdit={handleEdit} />
          ))}
        </div>
      </main>

      {/* Modal */}
      {showModal && (
        <ModalFiliale
          onClose={handleCloseModal}
          onSave={handleSave}
          filiales={filiales}
          t={t}
          filialeToEdit={editTarget}
        />
      )}
    </div>
  );
}
