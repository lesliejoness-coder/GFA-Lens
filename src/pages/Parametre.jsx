import React, { useState } from "react";
import { User, Lock, Globe, Bell, Save } from "lucide-react";
import { useAppSettings } from "../contexts/AppSettingsContext";

// ─────────────────────────────────────────────
// DICTIONNAIRE DES TRADUCTIONS
// ─────────────────────────────────────────────
const TRANSLATIONS = {
  fr: {
    pageTitle:        "Paramètres système",
    pageSubtitle:     "Gérez vos préférences et les informations de votre compte GFALens.",
    sectionProfile:   "Profil personnel",
    sectionSecurity:  "Sécurité",
    sectionRegional:  "Préférences régionales",
    sectionNotif:     "Notifications",
    labelNom:         "Nom",
    labelPrenom:      "Prénom",
    labelEmail:       "Email",
    labelUsername:    "Nom d'utilisateur",
    labelLangue:      "Langue de l'interface",
    labelTheme:       "Mode d'affichage",
    labelNotifEmail:  "Recevoir les alertes par E-mail",
    labelNotifSMS:    "Recevoir les alertes par SMS",
    themeLight:       "Clair",
    themeDark:        "Sombre",
    themeSystem:      "Système",
    langFr:           "Français",
    langEn:           "Anglais",
    langMg:           "Malagache",
    btnSave:          "Sauvegarder",
    saved:            "Paramètres sauvegardés ✓",
  },
  en: {
    pageTitle:        "System Settings",
    pageSubtitle:     "Manage your preferences and your GFALens account information.",
    sectionProfile:   "Personal Profile",
    sectionSecurity:  "Security",
    sectionRegional:  "Regional Preferences",
    sectionNotif:     "Notifications",
    labelNom:         "Last Name",
    labelPrenom:      "First Name",
    labelEmail:       "Email",
    labelUsername:    "Username",
    labelLangue:      "Interface Language",
    labelTheme:       "Display Mode",
    labelNotifEmail:  "Receive alerts by Email",
    labelNotifSMS:    "Receive alerts by SMS",
    themeLight:       "Light",
    themeDark:        "Dark",
    themeSystem:      "System",
    langFr:           "French",
    langEn:           "English",
    langMg:           "Malagasy",
    btnSave:          "Save Changes",
    saved:            "Settings saved ✓",
  },
  mg: {
    pageTitle:        "Fametrahana rindrambaiko",
    pageSubtitle:     "Amboary ny safidinao sy ny mombamomba ny kaontinao GFALens.",
    sectionProfile:   "Mombamomba ny tena",
    sectionSecurity:  "Fiarovana",
    sectionRegional:  "Safidin'ny faritra",
    sectionNotif:     "Fampandrenesana",
    labelNom:         "Anarana",
    labelPrenom:      "Fanampiny",
    labelEmail:       "Imailaka",
    labelUsername:    "Anarana mpampiasa",
    labelLangue:      "Fiteny ampiasaina",
    labelTheme:       "Fomba fisehoan-javatra",
    labelNotifEmail:  "Mahazo fampandrenesana amin'ny imailaka",
    labelNotifSMS:    "Mahazo fampandrenesana amin'ny SMS",
    themeLight:       "Mazava",
    themeDark:        "Maizina",
    themeSystem:      "Rindrambaiko",
    langFr:           "Frantsay",
    langEn:           "Anglisy",
    langMg:           "Malagasy",
    btnSave:          "Tehirizo",
    saved:            "Voatahiry ✓",
  },
};

export default function Parametre() {
  const { langue, changeLangue, theme, changeTheme } = useAppSettings();
  const t = TRANSLATIONS[langue] || TRANSLATIONS.fr;

  const [profile, setProfile] = useState({
    nom:        "Jones",
    prenom:     "Leslie",
    email:      "lesliejoness319@gmail.com",
    username:   "joness",
    notifEmail: true,
    notifSMS:   false,
  });

  const [savedMsg, setSavedMsg] = useState(false);

  const handleProfile = (e) => {
    const { name, value, type, checked } = e.target;
    setProfile((p) => ({ ...p, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSave = () => {
    setSavedMsg(true);
    setTimeout(() => setSavedMsg(false), 2500);
  };

  const card  = "bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 transition-colors duration-300";
  const input = "w-full mt-1 p-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all text-gray-900 dark:text-gray-100 text-sm";
  const lbl   = "text-xs font-bold text-gray-500 dark:text-gray-400 uppercase";

  const SectionTitle = ({ icon: Icon, title }) => (
    <div className="flex items-center gap-2 mb-5 pb-2 border-b border-gray-100 dark:border-gray-700">
      <Icon className="w-5 h-5 text-blue-700 dark:text-blue-400" />
      <h3 className="text-base font-semibold text-gray-800 dark:text-gray-100">{title}</h3>
    </div>
  );

  const ToggleBtn = ({ value, current, onChange, label }) => (
    <button
      type="button"
      onClick={() => onChange(value)}
      className={`flex-1 py-2 rounded-lg border text-sm font-medium transition-all ${
        current === value
          ? "bg-blue-700 text-white border-blue-700 shadow-md"
          : "bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600"
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="h-full w-full overflow-y-auto bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-4xl mx-auto p-8">

        <header className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{t.pageTitle}</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">{t.pageSubtitle}</p>
        </header>

        <div className="space-y-6">

          {/* ── PROFIL & SÉCURITÉ ── */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className={card}>
              <SectionTitle icon={User} title={t.sectionProfile} />
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={lbl}>{t.labelNom}</label>
                  <input name="nom" value={profile.nom} onChange={handleProfile} className={input} />
                </div>
                <div>
                  <label className={lbl}>{t.labelPrenom}</label>
                  <input name="prenom" value={profile.prenom} onChange={handleProfile} className={input} />
                </div>
              </div>
            </div>

            <div className={card}>
              <SectionTitle icon={Lock} title={t.sectionSecurity} />
              <div className="space-y-3">
                <div>
                  <label className={lbl}>{t.labelEmail}</label>
                  <input name="email" type="email" value={profile.email} onChange={handleProfile} className={input} />
                </div>
                <div>
                  <label className={lbl}>{t.labelUsername}</label>
                  <input name="username" value={profile.username} onChange={handleProfile} className={input} />
                </div>
              </div>
            </div>
          </div>

          {/* ── LANGUE & THÈME ── */}
          <div className={card}>
            <SectionTitle icon={Globe} title={t.sectionRegional} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

              {/* LANGUE */}
              <div>
                <label className={`${lbl} block mb-2`}>{t.labelLangue}</label>
                <div className="flex gap-2">
                  <ToggleBtn value="fr" current={langue} onChange={changeLangue} label={t.langFr} />
                  <ToggleBtn value="en" current={langue} onChange={changeLangue} label={t.langEn} />
                  <ToggleBtn value="mg" current={langue} onChange={changeLangue} label={t.langMg} />
                </div>
              </div>

              {/* THÈME */}
              <div>
                <label className={`${lbl} block mb-2`}>{t.labelTheme}</label>
                <div className="flex gap-2">
                  <ToggleBtn value="light"  current={theme} onChange={changeTheme} label={t.themeLight} />
                  <ToggleBtn value="dark"   current={theme} onChange={changeTheme} label={t.themeDark} />
                  <ToggleBtn value="system" current={theme} onChange={changeTheme} label={t.themeSystem} />
                </div>
                <p className="mt-2 text-xs text-gray-400 dark:text-gray-500">
                  {theme === "light"  && `☀️ ${t.themeLight}`}
                  {theme === "dark"   && `🌙 ${t.themeDark}`}
                  {theme === "system" && `🖥️ ${t.themeSystem}`}
                </p>
              </div>
            </div>
          </div>

          {/* ── NOTIFICATIONS ── */}
          <div className={card}>
            <SectionTitle icon={Bell} title={t.sectionNotif} />
            <div className="flex flex-col gap-4">
              {[
                { name: "notifEmail", label: t.labelNotifEmail },
                { name: "notifSMS",   label: t.labelNotifSMS   },
              ].map(({ name, label }) => (
                <label key={name} className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    name={name}
                    checked={profile[name]}
                    onChange={handleProfile}
                    className="w-5 h-5 rounded border-gray-300 text-blue-700 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors">
                    {label}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* SAUVEGARDER */}
        <div className="mt-8 flex items-center justify-end gap-4">
          {savedMsg && (
            <span className="text-sm text-green-600 dark:text-green-400 font-medium animate-pulse">
              {t.saved}
            </span>
          )}
          <button
            onClick={handleSave}
            className="flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white px-6 py-2.5 rounded-lg font-medium transition-all shadow-lg active:scale-95"
          >
            <Save className="w-4 h-4" />
            {t.btnSave}
          </button>
        </div>

      </div>
    </div>
  );
}
