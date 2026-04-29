import React, { useState, useRef } from 'react';
import { PaperClipIcon, XMarkIcon, ArrowLeftOnRectangleIcon } from '@heroicons/react/24/outline';
import { useAuth } from "../contexts/AuthContext";
import { useLocation } from "wouter";

// Traductions
const T = {
  fr: {
    title:         "Signaler un Incident",
    logout:        "Déconnexion",
    titleLbl:      "Titre *",
    titlePh:       "Panne réseau, Problème matériel...",
    agenceLbl:     "Agence *",
    agenceDefault: "Sélectionner une agence",
    typeLbl:       "Type *",
    typeDefault:   "Sélectionner un type",
    types: [
      "Autre",
      "Problème Display",
      "Problème prise de ticket",
      "Problème Counter",
      "Mauvaise configuration de l'interface organisation/agence",
      "Problème d'appel",
    ],
    prioriteLbl:     "Priorité *",
    prioriteDefault: "Sélectionner une priorité",
    priorites:       ["Faible", "Moyenne", "Critique"],
    descLbl:         "Description *",
    attachFile:      "Joindre un fichier",
    changeFile:      "Changer le fichier",
    cancel:          "Annuler",
    submit:          "Signaler",
    successMsg:      "Incident signalé avec succès !",
  },
  en: {
    title:         "Report an Incident",
    logout:        "Log out",
    titleLbl:      "Title *",
    titlePh:       "Network failure, Hardware issue...",
    agenceLbl:     "Agency *",
    agenceDefault: "Select an agency",
    typeLbl:       "Type *",
    typeDefault:   "Select a type",
    types: [
      "Other",
      "Display Issue",
      "Ticket Printing Issue",
      "Counter Issue",
      "Bad organisation/agency interface configuration",
      "Call Issue",
    ],
    prioriteLbl:     "Priority *",
    prioriteDefault: "Select a priority",
    priorites:       ["Low", "Medium", "Critical"],
    descLbl:         "Description *",
    attachFile:      "Attach a file",
    changeFile:      "Change file",
    cancel:          "Cancel",
    submit:          "Report",
    successMsg:      "Incident reported successfully!",
  },
  mg: {
    title:         "Mampahafantatra olana",
    logout:        "Hivoaka",
    titleLbl:      "Lohateny *",
    titlePh:       "Olana tambazotran'...",
    agenceLbl:     "Agence *",
    agenceDefault: "Misafidy agence",
    typeLbl:       "Karazana *",
    typeDefault:   "Misafidy karazana",
    types: [
      "Hafa",
      "Olana Display",
      "Olana fitapahana takelaka",
      "Olana Counter",
      "Fametrahana diso ny interface",
      "Olana fiantsoana",
    ],
    prioriteLbl:     "Laharam-pahamehan' *",
    prioriteDefault: "Misafidy laharam-pahamehan'",
    priorites:       ["Ambany", "Antonony", "Maika"],
    descLbl:         "Famaritana *",
    attachFile:      "Mampifamatotra rakitra",
    changeFile:      "Hanova rakitra",
    cancel:          "Hanafoana",
    submit:          "Mampahafantatra",
    successMsg:      "Efa nampahafantarina ny olana!",
  },
};

const LANG_LABELS = { fr: "FR", en: "EN", mg: "MG" };

const AGENCES = [
  { value: "plateau",   label: "Agence Plateau"   },
  { value: "yopougon",  label: "Agence Yopougon"  },
  { value: "bonapriso", label: "Agence Bonapriso"  },
  { value: "akwa",      label: "Agence Akwa"       },
];

const ClientIncidentForm = () => {
  const { logout } = useAuth();
  const [, navigate] = useLocation();

  const [formData, setFormData] = useState({
    type: "", agence: "", categorie: "", priorite: "", description: "",
  });
  const [file, setFile]         = useState(null);
  const fileInputRef            = useRef(null);

  // Langue lue depuis localStorage (même clé que le reste de l'app)
  const [langue, setLangue] = useState(
    () => localStorage.getItem("gfalens_lang") || "fr"
  );
  const t = T[langue] || T.fr;

  const handleLangChange = (lang) => {
    setLangue(lang);
    localStorage.setItem("gfalens_lang", lang);
  };

  const handleLogout = () => { logout(); navigate("/"); };
  const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleFileChange = e => { if (e.target.files[0]) setFile(e.target.files[0]); };
  const removeFile = () => { setFile(null); fileInputRef.current.value = ""; };

  const handleSubmit = e => {
    e.preventDefault();
    const data = new FormData();
    data.append("type",        formData.type);
    data.append("agence",      formData.agence);
    data.append("description", formData.description);
    if (file) data.append("file", file);
    console.log("Données prêtes:", Object.fromEntries(data));
    alert(t.successMsg);
  };

  const inp = "w-full p-2.5 border border-gray-200 dark:border-gray-600 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-colors";
  const lbl = "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1";

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-start justify-center pt-10 pb-10 px-4 transition-colors duration-300">

      <div className="w-full max-w-2xl bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden transition-colors">

        {/* Header */}
        <div className="bg-blue-900 px-6 py-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            ⚠️ {t.title}
          </h2>
          <div className="flex items-center gap-3">
            {/* Sélecteur de langue */}
            <div className="flex gap-1">
              {Object.entries(LANG_LABELS).map(([key, label]) => (
                <button key={key} onClick={() => handleLangChange(key)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${langue === key ? "bg-white text-blue-900" : "bg-white/20 text-white hover:bg-white/30"}`}>
                  {label}
                </button>
              ))}
            </div>
            {/* Déconnexion */}
            <button onClick={handleLogout}
              className="flex items-center gap-1.5 text-sm text-blue-200 hover:text-white transition-colors">
              <ArrowLeftOnRectangleIcon className="w-5 h-5" />
              {t.logout}
            </button>
          </div>
        </div>

        {/* Formulaire */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={lbl}>{t.titleLbl}</label>
              <input type="text" name="type" required placeholder={t.titlePh} onChange={handleChange} className={inp} />
            </div>
            <div>
              <label className={lbl}>{t.agenceLbl}</label>
              <select name="agence" required onChange={handleChange} className={inp}>
                <option value="">{t.agenceDefault}</option>
                {AGENCES.map(a => <option key={a.value} value={a.value}>{a.label}</option>)}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={lbl}>{t.typeLbl}</label>
              <select name="categorie" onChange={handleChange} className={inp}>
                <option value="">{t.typeDefault}</option>
                {t.types.map((tp, i) => <option key={i} value={tp}>{tp}</option>)}
              </select>
            </div>
            <div>
              <label className={lbl}>{t.prioriteLbl}</label>
              <select name="priorite" onChange={handleChange} className={inp}>
                <option value="">{t.prioriteDefault}</option>
                {t.priorites.map((p, i) => <option key={i} value={p}>{p}</option>)}
              </select>
            </div>
          </div>

          <div className="relative">
            <label className={lbl}>{t.descLbl}</label>
            <textarea
              name="description"
              required
              rows="5"
              onChange={handleChange}
              className={`${inp} pb-12 resize-none`}
            />
            {/* Zone fichier en bas du textarea */}
            <div className="absolute bottom-2 left-2 flex items-center gap-2">
              <input type="file" ref={fileInputRef} onChange={handleFileChange}
                accept=".jpg,.png,.pdf,.doc,.docx" className="hidden" />
              <button type="button" onClick={() => fileInputRef.current.click()}
                className="flex items-center gap-1.5 text-xs bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-300 px-3 py-1.5 rounded-full transition-colors">
                <PaperClipIcon className="w-4 h-4" />
                {file ? t.changeFile : t.attachFile}
              </button>
              {file && (
                <span className="text-xs text-blue-600 dark:text-blue-400 flex items-center gap-1 bg-blue-50 dark:bg-blue-900/30 px-2 py-1 rounded-full">
                  {file.name}
                  <XMarkIcon className="w-3 h-3 cursor-pointer" onClick={removeFile} />
                </span>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button type="button"
              className="px-6 py-2.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl text-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
              {t.cancel}
            </button>
            <button type="submit"
              className="px-6 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-xl text-sm font-semibold transition-colors flex items-center gap-2">
              🔴 {t.submit}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default ClientIncidentForm;
