import { useState } from "react";
import { mockFiliales } from "../data/mockData";
import { useAppSettings } from "../contexts/AppSettingsContext";

// ─── TRADUCTIONS ───────────────────────────────────────────────
const T = {
  fr: {
    title: "Agences", subtitle: "Gestion de toutes les agences",
    newBtn: "+ Nouvelle agence", search: "Rechercher une agence...",
    filterAll: "Tous",
    cols: ["Agence", "Filiale parente", "Localisation", "Type", "Responsable", "Statut", "Actions"],
    noResult: "Aucune agence ne correspond à votre recherche.",
    modify: "Modifier", delete: "Supprimer",
    // Modal
    modalTitle: "Créer une agence",
    nomLbl: "Nom", emplacementLbl: "Emplacement", typeLbl: "Type",
    paysLbl: "Pays", phoneLbl: "Téléphone", emailLbl: "Email",
    fuseauLbl: "Fuseau horaire", dateFmtLbl: "Format de date", timeFmtLbl: "Format de l'heure",
    callTypeLbl: "Type d'appel", langLbl: "Langue par défaut", logoLbl: "Logo",
    chooseFile: "Choisir un fichier", noFile: "Aucun fichier choisi",
    smsLbl: "SMS", whatsappLbl: "Notification WhatsApp", mobileAppLbl: "Notification de l'application mobile",
    userSection: "Utilisateur",
    userNomLbl: "Nom", userEmailLbl: "Email", userPassLbl: "Mot de passe",
    deplTypeLbl: "Type de déplacement", rechercheLbl: "Recherche", recherchePlaceholder: "Indiquez un lieu",
    filialeLbl: "Filiale parente *", filialeDefault: "— Sélectionner une filiale",
    cancel: "Annuler", save: "Créer l'agence",
    selectOption: "Sélectionner",
    PAYS: ["Cameroun", "Côte d'Ivoire", "Sénégal", "Mali", "Burkina Faso", "Guinée", "Gabon", "France"],
    TYPES: ["Normal", "Principal", "Secondaire", "Mobile"],
    FUSEAUX: ["Africa/Douala (UTC+1)", "Africa/Abidjan (UTC+0)", "Africa/Dakar (UTC+0)", "Europe/Paris (UTC+2)", "UTC"],
    DATE_FMTS: ["DD/MM/YYYY", "MM/DD/YYYY", "YYYY-MM-DD"],
    TIME_FMTS: ["12h (AM/PM)", "24h"],
    CALL_TYPES: ["Time Based", "Sequential", "Random"],
    LANGUAGES: ["Français", "English", "Arabic", "Español"],
    DEPL_TYPES: ["Using Map", "Manual Address"],
    STATUTS: ["Active", "Inactive", "Maintenance"],
  },
  en: {
    title: "Agencies", subtitle: "All agencies management",
    newBtn: "+ New agency", search: "Search an agency...",
    filterAll: "All",
    cols: ["Agency", "Parent branch", "Location", "Type", "Manager", "Status", "Actions"],
    noResult: "No agency matches your search.",
    modify: "Edit", delete: "Delete",
    modalTitle: "Create an agency",
    nomLbl: "Name", emplacementLbl: "Location", typeLbl: "Type",
    paysLbl: "Country", phoneLbl: "Phone", emailLbl: "Email",
    fuseauLbl: "Timezone", dateFmtLbl: "Date Format", timeFmtLbl: "Time Format",
    callTypeLbl: "Call Type", langLbl: "Default Language", logoLbl: "Logo",
    chooseFile: "Choose file", noFile: "No file chosen",
    smsLbl: "SMS", whatsappLbl: "WhatsApp Notification", mobileAppLbl: "Mobile App Notification",
    userSection: "User",
    userNomLbl: "Name", userEmailLbl: "Email", userPassLbl: "Password",
    deplTypeLbl: "Location Type", rechercheLbl: "Search", recherchePlaceholder: "Enter a location",
    filialeLbl: "Parent branch *", filialeDefault: "— Select a branch",
    cancel: "Cancel", save: "Create agency",
    selectOption: "Select",
    PAYS: ["Cameroon", "Ivory Coast", "Senegal", "Mali", "Burkina Faso", "Guinea", "Gabon", "France"],
    TYPES: ["Normal", "Main", "Secondary", "Mobile"],
    FUSEAUX: ["Africa/Douala (UTC+1)", "Africa/Abidjan (UTC+0)", "Africa/Dakar (UTC+0)", "Europe/Paris (UTC+2)", "UTC"],
    DATE_FMTS: ["DD/MM/YYYY", "MM/DD/YYYY", "YYYY-MM-DD"],
    TIME_FMTS: ["12h (AM/PM)", "24h"],
    CALL_TYPES: ["Time Based", "Sequential", "Random"],
    LANGUAGES: ["French", "English", "Arabic", "Spanish"],
    DEPL_TYPES: ["Using Map", "Manual Address"],
    STATUTS: ["Active", "Inactive", "Maintenance"],
  },
  mg: {
    title: "Agence", subtitle: "Fitantanana ny agence rehetra",
    newBtn: "+ Agence vaovao", search: "Hikaroka agence...",
    filterAll: "Rehetra",
    cols: ["Agence", "Filiale ray aman-dreny", "Toerana", "Karazana", "Tompon'andraikitra", "Toe-javatra", "Hetsika"],
    noResult: "Tsy misy agence mifanaraka amin'ny fikarohana.",
    modify: "Hanova", delete: "Hamafa",
    modalTitle: "Mamorona agence",
    nomLbl: "Anarana", emplacementLbl: "Toerana", typeLbl: "Karazana",
    paysLbl: "Firenena", phoneLbl: "Telefaona", emailLbl: "Imailaka",
    fuseauLbl: "Faritra fotoana", dateFmtLbl: "Endrika daty", timeFmtLbl: "Endrika ora",
    callTypeLbl: "Karazana fiantsoana", langLbl: "Fiteny default", logoLbl: "Logo",
    chooseFile: "Misafidy rakitra", noFile: "Tsy misy rakitra",
    smsLbl: "SMS", whatsappLbl: "Fampandrenesana WhatsApp", mobileAppLbl: "Fampandrenesana app mobile",
    userSection: "Mpampiasa",
    userNomLbl: "Anarana", userEmailLbl: "Imailaka", userPassLbl: "Teny miafina",
    deplTypeLbl: "Karazana toerana", rechercheLbl: "Fikarohana", recherchePlaceholder: "Ampidiro ny toerana",
    filialeLbl: "Filiale ray aman-dreny *", filialeDefault: "— Misafidy filiale",
    cancel: "Hanafoana", save: "Mamorona agence",
    selectOption: "Misafidy",
    PAYS: ["Cameroun", "Côte d'Ivoire", "Sénégal", "Mali", "Burkina Faso", "Guinée", "Gabon", "France"],
    TYPES: ["Normal", "Principale", "Secondaire", "Mobile"],
    FUSEAUX: ["Africa/Douala (UTC+1)", "Africa/Abidjan (UTC+0)", "Africa/Dakar (UTC+0)", "Europe/Paris (UTC+2)", "UTC"],
    DATE_FMTS: ["DD/MM/YYYY", "MM/DD/YYYY", "YYYY-MM-DD"],
    TIME_FMTS: ["12h (AM/PM)", "24h"],
    CALL_TYPES: ["Time Based", "Sequential", "Random"],
    LANGUAGES: ["Frantsay", "Anglisy", "Arabo", "Espaniola"],
    DEPL_TYPES: ["Using Map", "Adiresy amin-tanana"],
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

// ─── TOGGLE SWITCH ─────────────────────────────────────────────
function Toggle({ checked, onChange, label }) {
  return (
    <label className="flex items-center gap-2 cursor-pointer select-none">
      <button
        type="button"
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors duration-200 ${checked ? "bg-blue-600" : "bg-gray-300 dark:bg-gray-600"}`}
      >
        <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow transition-transform duration-200 ${checked ? "translate-x-4" : "translate-x-1"}`} />
      </button>
      <span className="text-sm text-gray-700 dark:text-gray-300">{label}</span>
    </label>
  );
}

// ─── MODAL CRÉER AGENCE ────────────────────────────────────────
function ModalCreerAgence({ onClose, filiales, t }) {
  const [form, setForm] = useState({
    // Infos de base
    nom: "", emplacement: "", type: "Normal",
    pays: "", telephone: "", email: "",
    fuseau: "", dateFormat: "", timeFormat: "",
    callType: "Time Based", langue: "", logoFile: null,
    // Toggles notifications
    sms: false, whatsapp: false, mobileApp: false,
    // Utilisateur
    userNom: "", userEmail: "", userPassword: "",
    // Localisation
    deplType: "Using Map", recherche: "",
    // Filiale parente
    filialeId: "",
    // Statut
    statut: "Active",
  });

  const s = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const inp = "w-full border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-colors";
  const lbl = "block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1";
  const sel = inp;

  // Toutes les filiales + sous-filiales
  const allFiliales = [
    ...filiales.map(f => ({ id: f.id, nom: f.nom, level: 0 })),
    ...filiales.flatMap(f => (f.sousFiliales || []).map(sf => ({ id: sf.id, nom: sf.nom, level: 1 }))),
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Agence "${form.nom}" créée avec succès !`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[92vh] flex flex-col transition-colors">

        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{t.modalTitle}</h3>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 dark:border-gray-600 text-gray-500 hover:text-gray-900 dark:hover:text-gray-100 text-xl leading-none transition-colors">×</button>
        </div>

        {/* Corps scrollable */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto">
          <div className="px-6 py-5 space-y-5">

            {/* ── Ligne 1 : Nom / Emplacement / Type ── */}
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className={lbl}>{t.nomLbl}</label>
                <input placeholder="Name" value={form.nom} onChange={e => s("nom", e.target.value)} className={inp} required />
              </div>
              <div>
                <label className={lbl}>{t.emplacementLbl}</label>
                <input placeholder="Location" value={form.emplacement} onChange={e => s("emplacement", e.target.value)} className={inp} />
              </div>
              <div>
                <label className={lbl}>{t.typeLbl}</label>
                <select value={form.type} onChange={e => s("type", e.target.value)} className={sel}>
                  {t.TYPES.map(o => <option key={o}>{o}</option>)}
                </select>
              </div>
            </div>

            {/* ── Filiale parente ── */}
            <div>
              <label className={lbl}>{t.filialeLbl}</label>
              <select required value={form.filialeId} onChange={e => s("filialeId", e.target.value)} className={sel}>
                <option value="">{t.filialeDefault}</option>
                {allFiliales.map(f => (
                  <option key={f.id} value={f.id}>{f.level === 1 ? "↳ " : ""}{f.nom}</option>
                ))}
              </select>
            </div>

            {/* ── Ligne 2 : Pays / Téléphone / Email ── */}
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className={lbl}>{t.paysLbl}</label>
                <select value={form.pays} onChange={e => s("pays", e.target.value)} className={sel}>
                  <option value="">Select option</option>
                  {t.PAYS.map(p => <option key={p}>{p}</option>)}
                </select>
              </div>
              <div>
                <label className={lbl}>{t.phoneLbl}</label>
                <div className="flex gap-2">
                  <select className="w-20 border border-gray-200 dark:border-gray-600 rounded-lg px-2 py-2 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100">
                    <option>🇨🇲</option><option>🇨🇮</option><option>🇸🇳</option><option>🇫🇷</option>
                  </select>
                  <input type="tel" placeholder="Phone" value={form.telephone} onChange={e => s("telephone", e.target.value)} className={inp} />
                </div>
              </div>
              <div>
                <label className={lbl}>{t.emailLbl}</label>
                <input type="email" placeholder="Email" value={form.email} onChange={e => s("email", e.target.value)} className={inp} />
              </div>
            </div>

            {/* ── Ligne 3 : Fuseau / Format date / Format heure ── */}
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className={lbl}>{t.fuseauLbl}</label>
                <select value={form.fuseau} onChange={e => s("fuseau", e.target.value)} className={sel}>
                  <option value="">Select option</option>
                  {t.FUSEAUX.map(f => <option key={f}>{f}</option>)}
                </select>
              </div>
              <div>
                <label className={lbl}>{t.dateFmtLbl}</label>
                <select value={form.dateFormat} onChange={e => s("dateFormat", e.target.value)} className={sel}>
                  <option value="">{t.selectOption}</option>
                  {t.DATE_FMTS.map(f => <option key={f}>{f}</option>)}
                </select>
              </div>
              <div>
                <label className={lbl}>{t.timeFmtLbl}</label>
                <select value={form.timeFormat} onChange={e => s("timeFormat", e.target.value)} className={sel}>
                  <option value="">{t.selectOption}</option>
                  {t.TIME_FMTS.map(f => <option key={f}>{f}</option>)}
                </select>
              </div>
            </div>

            {/* ── Ligne 4 : Type d'appel / Langue / Logo ── */}
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className={lbl}>{t.callTypeLbl}</label>
                <select value={form.callType} onChange={e => s("callType", e.target.value)} className={sel}>
                  {t.CALL_TYPES.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className={lbl}>{t.langLbl}</label>
                <select value={form.langue} onChange={e => s("langue", e.target.value)} className={sel}>
                  <option value="">{t.selectOption}</option>
                  {t.LANGUAGES.map(l => <option key={l}>{l}</option>)}
                </select>
              </div>
              <div>
                <label className={lbl}>{t.logoLbl}</label>
                <div className="flex items-center gap-0 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-600">
                  <label className="flex-shrink-0 px-4 py-2 bg-gray-900 dark:bg-gray-950 text-white text-sm cursor-pointer hover:bg-gray-800 transition-colors">
                    {t.chooseFile}
                    <input type="file" accept="image/*" className="hidden" onChange={e => s("logoFile", e.target.files[0])} />
                  </label>
                  <span className="flex-1 px-3 py-2 text-sm text-gray-400 dark:text-gray-500 truncate bg-white dark:bg-gray-700">
                    {form.logoFile ? form.logoFile.name : t.noFile}
                  </span>
                </div>
              </div>
            </div>

            {/* ── Toggles notifications ── */}
            <div className="flex items-center gap-8 flex-wrap py-1">
              <Toggle checked={form.sms}       onChange={v => s("sms", v)}       label={t.smsLbl} />
              <Toggle checked={form.whatsapp}  onChange={v => s("whatsapp", v)}  label={t.whatsappLbl} />
              <Toggle checked={form.mobileApp} onChange={v => s("mobileApp", v)} label={t.mobileAppLbl} />
            </div>

            {/* ── Section Utilisateur ── */}
            <div>
              <h4 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3">{t.userSection}</h4>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className={lbl}>{t.userNomLbl}</label>
                  <input placeholder="Name" value={form.userNom} onChange={e => s("userNom", e.target.value)} className={inp} />
                </div>
                <div>
                  <label className={lbl}>{t.userEmailLbl}</label>
                  <input type="email" placeholder="Email" value={form.userEmail} onChange={e => s("userEmail", e.target.value)} className={inp} />
                </div>
                <div>
                  <label className={lbl}>{t.userPassLbl}</label>
                  <input type="password" placeholder="Password" value={form.userPassword} onChange={e => s("userPassword", e.target.value)} className={inp} />
                </div>
              </div>
            </div>

            {/* ── Type de déplacement + Recherche lieu ── */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={lbl}>{t.deplTypeLbl}</label>
                <select value={form.deplType} onChange={e => s("deplType", e.target.value)} className={sel}>
                  {t.DEPL_TYPES.map(d => <option key={d}>{d}</option>)}
                </select>
              </div>
              <div>
                <label className={lbl}>{t.rechercheLbl}</label>
                <input placeholder={t.recherchePlaceholder} value={form.recherche} onChange={e => s("recherche", e.target.value)} className={inp} />
              </div>
            </div>

            {/* ── Carte simulée ── */}
            {form.deplType === "Using Map" && (
              <div className="w-full h-40 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-600 bg-blue-50 dark:bg-gray-700 flex items-center justify-center">
                <div className="text-center text-gray-400 dark:text-gray-500">
                  <svg className="w-8 h-8 mx-auto mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <p className="text-xs">Carte interactive</p>
                </div>
              </div>
            )}

          </div>

          {/* Footer */}
          <div className="flex gap-3 px-6 pb-6 pt-2 flex-shrink-0">
            <button type="button" onClick={onClose}
              className="flex-1 py-2.5 border border-gray-200 dark:border-gray-600 rounded-xl text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              {t.cancel}
            </button>
            <button type="submit"
              className="flex-1 py-2.5 bg-blue-900 text-white rounded-xl text-sm font-medium hover:bg-blue-800 transition-colors">
              {t.save}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── PAGE PRINCIPALE ──────────────────────────────────────────
export default function AgencePage() {
  const { langue } = useAppSettings();
  const t = T[langue] || T.fr;

  const buildAllAgences = () => {
    const list = [];
    mockFiliales.forEach(f => {
      f.agences.forEach(a => list.push({ ...a, filiale: f.nom, filialeId: f.id }));
      (f.sousFiliales || []).forEach(sf => {
        sf.agences.forEach(a => list.push({ ...a, filiale: sf.nom, filialeId: sf.id }));
      });
    });
    return list;
  };

  const [agences, setAgences]           = useState(buildAllAgences);
  const [showModal, setShowModal]       = useState(false);
  const [search, setSearch]             = useState("");
  const [filtreStatut, setFiltreStatut] = useState("all");

  const filterOptions = [
    { val: "all",         label: t.filterAll },
    { val: "Active",      label: "Active" },
    { val: "Inactive",    label: "Inactive" },
    { val: "Maintenance", label: "Maintenance" },
    { val: "Bloquée",     label: "Bloquée" },
  ];

  const filtered = agences.filter(a => {
    const matchStatut = filtreStatut === "all" || a.statut === filtreStatut;
    const q = search.toLowerCase();
    const matchSearch =
      a.nom.toLowerCase().includes(q) ||
      a.localisation.toLowerCase().includes(q) ||
      a.filiale.toLowerCase().includes(q);
    return matchStatut && matchSearch;
  });

  const handleDelete = (id) => {
    if (!window.confirm("Supprimer cette agence ?")) return;
    setAgences(prev => prev.filter(a => a.id !== id));
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-gray-50 dark:bg-gray-900 transition-colors duration-300">

      {/* Header */}
      <div className="px-6 py-5 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 transition-colors">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">{t.title}</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{t.subtitle}</p>
          </div>
          <button onClick={() => setShowModal(true)}
            className="px-4 py-2.5 bg-blue-900 text-white text-sm font-medium rounded-xl hover:bg-blue-800 transition-colors">
            {t.newBtn}
          </button>
        </div>
      </div>

      {/* Filtres */}
      <div className="px-6 py-3 bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700 flex flex-wrap items-center gap-3 transition-colors">
        <input type="text" placeholder={t.search} value={search} onChange={e => setSearch(e.target.value)}
          className="flex-1 min-w-[200px] max-w-sm px-4 py-2 text-sm border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-colors" />
        <div className="flex gap-2 flex-wrap">
          {filterOptions.map(({ val, label }) => (
            <button key={val} onClick={() => setFiltreStatut(val)}
              className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                filtreStatut === val
                  ? "bg-blue-900 text-white"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
              }`}>
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Tableau */}
      <main className="flex-1 overflow-y-auto p-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden transition-colors">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 dark:bg-gray-700/50">
              <tr>
                {t.cols.map(h => (
                  <th key={h} className="text-left py-3 px-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={t.cols.length} className="py-12 text-center text-sm text-gray-400 dark:text-gray-500">
                    {t.noResult}
                  </td>
                </tr>
              ) : (
                filtered.map(a => (
                  <tr key={a.id} className="border-t border-gray-50 dark:border-gray-700 hover:bg-blue-50/20 dark:hover:bg-blue-900/10 transition-colors">
                    <td className="py-3 px-4 font-medium text-gray-900 dark:text-gray-100">{a.nom}</td>
                    <td className="py-3 px-4 text-gray-500 dark:text-gray-400">{a.filiale}</td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-400">{a.localisation}</td>
                    <td className="py-3 px-4 text-gray-500 dark:text-gray-400">{a.type}</td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-400">{a.responsable || "—"}</td>
                    <td className="py-3 px-4"><Badge statut={a.statut} /></td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <button className="text-xs text-blue-600 hover:underline">{t.modify}</button>
                        <button onClick={() => handleDelete(a.id)} className="text-xs text-red-500 hover:underline">{t.delete}</button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs text-gray-400 dark:text-gray-500">
          {filtered.length} agence{filtered.length > 1 ? "s" : ""}
          {filtered.length !== agences.length && ` sur ${agences.length}`}
        </p>
      </main>

      {showModal && (
        <ModalCreerAgence onClose={() => setShowModal(false)} filiales={mockFiliales} t={t} />
      )}
    </div>
  );
}
