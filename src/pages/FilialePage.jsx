import { useState } from "react";
import { mockFiliales } from "../data/mockData";
import { useAppSettings } from "../contexts/AppSettingsContext";

// ─── TRADUCTIONS ───────────────────────────────────────────────
const T = {
  fr: {
    title: "Filiales", subtitle: "Structure hiérarchique du groupe",
    newBtn: "+ Nouvelle filiale",
    search: "Rechercher une filiale...",
    addSousFiliale: "+ Sous-filiale",
    addAgence: "+ Agence",
    noAgences: "Aucune agence",
    agenceCount: (n) => `${n} agence${n > 1 ? "s" : ""}`,
    subCount: (n) => `${n} sous-filiale${n > 1 ? "s" : ""}`,
    modify: "Modifier", delete: "Supprimer",
    colAgence: "Agence", colLocalisation: "Localisation",
    colType: "Type", colResponsable: "Responsable",
    colStatut: "Statut", colActions: "Actions",
    confirmDelete: (nom) => `Supprimer la filiale "${nom}" ?`,
    confirmDeleteAgence: (nom) => `Supprimer l'agence "${nom}" ?`,
    // Modal filiale
    modalTitleNew: "Nouvelle filiale",
    modalTitleEdit: "Modifier la filiale",
    modalTitleSub: (parent) => `Nouvelle sous-filiale de "${parent}"`,
    nomLbl: "Nom *", nomPlaceholder: "Ex: AFGBank Garoua",
    paysLbl: "Pays", villeLbl: "Ville",
    descLbl: "Description", descPlaceholder: "Description courte...",
    agencesLbl: "Agences rattachées",
    agencesHint: "Sélectionnez les agences à rattacher à cette filiale",
    parentLbl: "Filiale parente", parentVerrouille: "(verrouillée)",
    statutLbl: "Statut",
    cancel: "Annuler", save: "Créer", saveEdit: "Enregistrer",
    PAYS: ["Cameroun", "Côte d'Ivoire", "Sénégal", "Mali", "Burkina Faso", "Guinée", "Gabon", "France"],
    STATUTS: ["Active", "Inactive", "Maintenance"],
  },
  en: {
    title: "Branches", subtitle: "Group hierarchical structure",
    newBtn: "+ New branch",
    search: "Search a branch...",
    addSousFiliale: "+ Sub-branch",
    addAgence: "+ Agency",
    noAgences: "No agencies",
    agenceCount: (n) => `${n} agenc${n > 1 ? "ies" : "y"}`,
    subCount: (n) => `${n} sub-branch${n > 1 ? "es" : ""}`,
    modify: "Edit", delete: "Delete",
    colAgence: "Agency", colLocalisation: "Location",
    colType: "Type", colResponsable: "Manager",
    colStatut: "Status", colActions: "Actions",
    confirmDelete: (nom) => `Delete branch "${nom}"?`,
    confirmDeleteAgence: (nom) => `Delete agency "${nom}"?`,
    modalTitleNew: "New branch",
    modalTitleEdit: "Edit branch",
    modalTitleSub: (parent) => `New sub-branch of "${parent}"`,
    nomLbl: "Name *", nomPlaceholder: "Ex: AFGBank Garoua",
    paysLbl: "Country", villeLbl: "City",
    descLbl: "Description", descPlaceholder: "Short description...",
    agencesLbl: "Linked agencies",
    agencesHint: "Select agencies to link to this branch",
    parentLbl: "Parent branch", parentVerrouille: "(locked)",
    statutLbl: "Status",
    cancel: "Cancel", save: "Create", saveEdit: "Save",
    PAYS: ["Cameroon", "Ivory Coast", "Senegal", "Mali", "Burkina Faso", "Guinea", "Gabon", "France"],
    STATUTS: ["Active", "Inactive", "Maintenance"],
  },
  mg: {
    title: "Filiale", subtitle: "Firafitry ny vondrona",
    newBtn: "+ Filiale vaovao",
    search: "Hikaroka filiale...",
    addSousFiliale: "+ Sous-filiale",
    addAgence: "+ Agence",
    noAgences: "Tsy misy agence",
    agenceCount: (n) => `${n} agence`,
    subCount: (n) => `${n} sous-filiale`,
    modify: "Hanova", delete: "Hamafa",
    colAgence: "Agence", colLocalisation: "Toerana",
    colType: "Karazana", colResponsable: "Tompon'andraikitra",
    colStatut: "Toe-javatra", colActions: "Hetsika",
    confirmDelete: (nom) => `Hamafa ny filiale "${nom}"?`,
    confirmDeleteAgence: (nom) => `Hamafa ny agence "${nom}"?`,
    modalTitleNew: "Filiale vaovao",
    modalTitleEdit: "Hanova filiale",
    modalTitleSub: (parent) => `Sous-filiale vaovao an'"${parent}"`,
    nomLbl: "Anarana *", nomPlaceholder: "Ohatra: AFGBank Garoua",
    paysLbl: "Firenena", villeLbl: "Tanàna",
    descLbl: "Famaritana", descPlaceholder: "Famaritana fohy...",
    agencesLbl: "Agence voakasika",
    agencesHint: "Safidio ny agence hampifandraisina amin'ity filiale ity",
    parentLbl: "Filiale ray aman-dreny", parentVerrouille: "(voaidy)",
    statutLbl: "Toe-javatra",
    cancel: "Hanafoana", save: "Mamorona", saveEdit: "Tehirizo",
    PAYS: ["Cameroun", "Côte d'Ivoire", "Sénégal", "Mali", "Burkina Faso", "Guinée", "Gabon", "France"],
    STATUTS: ["Active", "Inactive", "Maintenance"],
  },
};

// ─── BADGE ─────────────────────────────────────────────────────
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

// ─── COLLECTE TOUTES LES AGENCES de mockFiliales ──────────────
function getAllAgences(filiales) {
  const list = [];
  filiales.forEach(f => {
    f.agences.forEach(a => list.push({ ...a, filiale: f.nom }));
    (f.sousFiliales || []).forEach(sf => {
      sf.agences.forEach(a => list.push({ ...a, filiale: sf.nom }));
    });
  });
  return list;
}

// ─── MODAL FILIALE ─────────────────────────────────────────────
function ModalFiliale({ onClose, onSave, allAgences, t, filialeToEdit, parentFiliale }) {
  const isEdit = Boolean(filialeToEdit?.id);
  const isSub  = Boolean(parentFiliale);

  // IDs des agences déjà rattachées
  const initialAgenceIds = (filialeToEdit?.agences || []).map(a => a.id);

  const [form, setForm] = useState({
    nom:          filialeToEdit?.nom          || "",
    pays:         filialeToEdit?.pays         || "",
    ville:        filialeToEdit?.ville        || "",
    description:  filialeToEdit?.description  || "",
    statut:       filialeToEdit?.statut       || "Active",
    agenceIds:    initialAgenceIds,
  });

  const s = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const toggleAgence = (id) => {
    setForm(p => ({
      ...p,
      agenceIds: p.agenceIds.includes(id)
        ? p.agenceIds.filter(x => x !== id)
        : [...p.agenceIds, id],
    }));
  };

  const inp = "w-full border border-gray-200 dark:border-gray-600 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 dark:bg-gray-700 focus:bg-white dark:focus:bg-gray-600 text-gray-900 dark:text-gray-100 transition-colors";
  const lbl = "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1";

  const getTitle = () => {
    if (isEdit) return t.modalTitleEdit;
    if (isSub)  return t.modalTitleSub(parentFiliale.nom);
    return t.modalTitleNew;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Résoudre les agences sélectionnées
    const agencesSelectionnees = allAgences.filter(a => form.agenceIds.includes(a.id));
    onSave({
      ...(filialeToEdit || {}),
      nom:          form.nom,
      pays:         form.pays,
      ville:        form.ville,
      description:  form.description,
      statut:       form.statut,
      parentId:     parentFiliale?.id || filialeToEdit?.parentId || null,
      agences:      agencesSelectionnees,
      sousFiliales: filialeToEdit?.sousFiliales || [],
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] flex flex-col transition-colors">

        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{getTitle()}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 text-2xl leading-none">×</button>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto">
          <div className="px-6 py-5 space-y-4">

            {/* Filiale parente verrouillée si sous-filiale */}
            {isSub && (
              <div>
                <label className={lbl}>{t.parentLbl} <span className="text-blue-500 text-xs">{t.parentVerrouille}</span></label>
                <div className="w-full border border-blue-200 dark:border-blue-700 rounded-xl px-3 py-2.5 text-sm bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 font-medium">
                  {parentFiliale.nom}
                </div>
              </div>
            )}

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

            {/* Agences rattachées */}
            <div>
              <label className={lbl}>{t.agencesLbl}</label>
              <p className="text-xs text-gray-400 dark:text-gray-500 mb-2">{t.agencesHint}</p>
              <div className="border border-gray-200 dark:border-gray-600 rounded-xl overflow-hidden max-h-44 overflow-y-auto">
                {allAgences.length === 0 ? (
                  <p className="text-xs text-gray-400 dark:text-gray-500 p-3 text-center">{t.noAgences}</p>
                ) : (
                  allAgences.map(a => (
                    <label key={a.id}
                      className={`flex items-center gap-3 px-4 py-2.5 cursor-pointer transition-colors border-b border-gray-50 dark:border-gray-700 last:border-0 ${
                        form.agenceIds.includes(a.id)
                          ? "bg-blue-50 dark:bg-blue-900/20"
                          : "hover:bg-gray-50 dark:hover:bg-gray-700"
                      }`}>
                      <input type="checkbox" checked={form.agenceIds.includes(a.id)}
                        onChange={() => toggleAgence(a.id)}
                        className="w-4 h-4 rounded border-gray-300 text-blue-600 accent-blue-700" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-800 dark:text-gray-100 truncate">{a.nom}</p>
                        <p className="text-xs text-gray-400 dark:text-gray-500 truncate">{a.localisation}</p>
                      </div>
                      <Badge statut={a.statut} />
                    </label>
                  ))
                )}
              </div>
              {form.agenceIds.length > 0 && (
                <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                  {form.agenceIds.length} agence{form.agenceIds.length > 1 ? "s" : ""} sélectionnée{form.agenceIds.length > 1 ? "s" : ""}
                </p>
              )}
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
              <div className="flex gap-4 flex-wrap">
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
          <div className="flex gap-3 px-6 pb-6 flex-shrink-0">
            <button type="button" onClick={onClose}
              className="flex-1 py-2.5 border border-gray-200 dark:border-gray-600 rounded-xl text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              {t.cancel}
            </button>
            <button type="submit"
              className="flex-1 py-2.5 bg-blue-900 text-white rounded-xl text-sm font-medium hover:bg-blue-800 transition-colors">
              {isEdit ? t.saveEdit : t.save}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── TABLEAU AGENCES ───────────────────────────────────────────
function AgencesTable({ agences, onDeleteAgence, t }) {
  if (!agences || agences.length === 0) {
    return <p className="text-xs text-gray-400 dark:text-gray-500 italic py-3 px-2">{t.noAgences}</p>;
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
                <button
                  onClick={() => {
                    if (window.confirm(t.confirmDeleteAgence(a.nom))) onDeleteAgence(a.id);
                  }}
                  className="text-xs text-red-500 hover:underline"
                >
                  {t.delete}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ─── CARTE FILIALE (récursive) ────────────────────────────────
function FilialeCard({ filiale, depth = 0, t, onEdit, onDelete, onAddSousFiliale, allAgences, onDeleteAgence }) {
  const [expanded, setExpanded] = useState(depth === 0);

  const totalAgences = (filiale.agences || []).length;
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
      {/* En-tête */}
      <div
        className={`flex items-center justify-between px-5 py-3.5 cursor-pointer ${headerBg} text-white select-none`}
        onClick={() => setExpanded(v => !v)}
      >
        <div className="flex items-center gap-3">
          <span className="text-xs opacity-60">{expanded ? "▾" : "▸"}</span>
          <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center font-bold text-sm flex-shrink-0">
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

        {/* Actions header */}
        <div className="flex items-center gap-2" onClick={e => e.stopPropagation()}>
          <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${
            filiale.statut === "Active" ? "bg-green-400/20 text-green-100" : "bg-gray-400/20 text-gray-200"
          }`}>
            {filiale.statut}
          </span>
          {/* Bouton sous-filiale */}
          <button
            onClick={() => onAddSousFiliale(filiale)}
            className="text-xs text-white/70 hover:text-white px-2 py-1 rounded-lg hover:bg-white/10 transition-colors whitespace-nowrap"
          >
            {t.addSousFiliale}
          </button>
          {/* Bouton modifier */}
          <button
            onClick={() => onEdit(filiale)}
            className="text-xs text-white/70 hover:text-white px-2 py-1 rounded-lg hover:bg-white/10 transition-colors"
          >
            {t.modify}
          </button>
          {/* Bouton supprimer */}
          <button
            onClick={() => {
              if (window.confirm(t.confirmDelete(filiale.nom))) onDelete(filiale.id);
            }}
            className="text-xs text-red-300 hover:text-red-100 px-2 py-1 rounded-lg hover:bg-red-500/20 transition-colors"
          >
            {t.delete}
          </button>
        </div>
      </div>

      {/* Contenu déplié */}
      {expanded && (
        <div className="bg-white dark:bg-gray-800 transition-colors">

          {/* Sous-filiales */}
          {totalSous > 0 && (
            <div className="px-5 pt-5 pb-3">
              <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-3">
                Sous-filiales
              </p>
              <div className="space-y-3">
                {filiale.sousFiliales.map(sf => (
                  <FilialeCard
                    key={sf.id}
                    filiale={sf}
                    depth={depth + 1}
                    t={t}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    onAddSousFiliale={onAddSousFiliale}
                    allAgences={allAgences}
                    onDeleteAgence={onDeleteAgence}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Agences directes */}
          <div className="px-5 py-4">
            {totalSous > 0 && (
              <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-2">
                Agences directes
              </p>
            )}
            <AgencesTable
              agences={filiale.agences}
              onDeleteAgence={(agenceId) => onDeleteAgence(filiale.id, agenceId)}
              t={t}
            />
          </div>
        </div>
      )}
    </div>
  );
}

// ─── PAGE PRINCIPALE ──────────────────────────────────────────
export default function FilialePage() {
  const { langue } = useAppSettings();
  const t = T[langue] || T.fr;

  const [filiales, setFiliales]     = useState(mockFiliales);
  const [showModal, setShowModal]   = useState(false);
  const [editTarget, setEditTarget] = useState(null);
  const [parentTarget, setParentTarget] = useState(null); // pour sous-filiale
  const [search, setSearch]         = useState("");

  // Toutes les agences de l'app (pour la sélection dans la modal)
  const allAgences = getAllAgences(filiales);

  // ── Utilitaire : mettre à jour une filiale dans l'arbre ──
  const updateInTree = (list, id, updater) =>
    list.map(f => {
      if (f.id === id) return updater(f);
      return { ...f, sousFiliales: updateInTree(f.sousFiliales || [], id, updater) };
    });

  const deleteInTree = (list, id) =>
    list
      .filter(f => f.id !== id)
      .map(f => ({ ...f, sousFiliales: deleteInTree(f.sousFiliales || [], id) }));

  // ── Sauvegarde ──
  const handleSave = (data) => {
    if (data.id) {
      // Édition
      setFiliales(prev => updateInTree(prev, data.id, () => data));
    } else {
      const newF = { id: Date.now(), ...data };
      if (data.parentId) {
        // Sous-filiale → injecter dans la filiale parente
        setFiliales(prev =>
          updateInTree(prev, data.parentId, f => ({
            ...f,
            sousFiliales: [...(f.sousFiliales || []), newF],
          }))
        );
      } else {
        // Filiale principale
        setFiliales(prev => [...prev, newF]);
      }
    }
  };

  // ── Supprimer filiale ──
  const handleDelete = (id) => {
    setFiliales(prev => deleteInTree(prev, id));
  };

  // ── Supprimer agence d'une filiale ──
  const handleDeleteAgence = (filialeId, agenceId) => {
    setFiliales(prev =>
      updateInTree(prev, filialeId, f => ({
        ...f,
        agences: f.agences.filter(a => a.id !== agenceId),
      }))
    );
  };

  const handleEdit = (filiale) => {
    setEditTarget(filiale);
    setParentTarget(null);
    setShowModal(true);
  };

  const handleAddSousFiliale = (parentFiliale) => {
    setEditTarget(null);
    setParentTarget(parentFiliale);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setEditTarget(null);
    setParentTarget(null);
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
            onClick={() => { setEditTarget(null); setParentTarget(null); setShowModal(true); }}
            className="px-4 py-2.5 bg-blue-900 text-white text-sm font-medium rounded-xl hover:bg-blue-800 transition-colors"
          >
            {t.newBtn}
          </button>
        </div>
      </div>

      {/* Recherche */}
      <div className="px-6 py-3 bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700 transition-colors">
        <input
          type="text"
          placeholder={t.search}
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full max-w-sm px-4 py-2 text-sm border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-colors"
        />
      </div>

      {/* Liste */}
      <main className="flex-1 overflow-y-auto p-6">
        <div className="space-y-4 max-w-5xl mx-auto">
          {filtered.map(f => (
            <FilialeCard
              key={f.id}
              filiale={f}
              t={t}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onAddSousFiliale={handleAddSousFiliale}
              allAgences={allAgences}
              onDeleteAgence={handleDeleteAgence}
            />
          ))}
        </div>
      </main>

      {/* Modal */}
      {showModal && (
        <ModalFiliale
          onClose={handleClose}
          onSave={handleSave}
          allAgences={allAgences}
          t={t}
          filialeToEdit={editTarget}
          parentFiliale={parentTarget}
        />
      )}
    </div>
  );
}
