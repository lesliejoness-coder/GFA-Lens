import React, { useState } from "react";
import { User, Lock, Globe, Bell, Moon, Save } from "lucide-react";

export default function Settings() {
  const [settings, setSettings] = useState({
    nom: "Jones",
    prenom: "Leslie",
    email: "lesliejoness319@gmail.com",
    username: "joness",
    langue: "fr",
    theme: "system",
    notifEmail: true,
    notifSMS: false,
    // timezone: "UTC+1",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const SectionTitle = ({ icon: Icon, title }) => (
    <div className="flex items-center gap-2 mb-6 pb-2 border-b border-gray-100">
      <Icon className="w-5 h-5 text-blue-700" />
      <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
    </div>
  );

  return (
    /*<div className="p-8 bg-gray-50 min-h-full">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Paramètres système</h1>
          <p className="text-gray-500">Gérez vos préférences et les informations de votre compte GFALens.</p>
        </header>*/

  /* h-screen fixe la hauteur à celle de l'écran, overflow-y-auto ajoute le scroll si besoin */
      <div className="h-full w-full overflow-y-auto bg-gray-50 custom-scrollbar">
      <div className="max-w-4xl mx-auto p-8">
        <header className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Paramètres système</h1>
          <p className="text-gray-500">Gérez vos préférences et les informations de votre comptes GFALens.</p>
        </header>
        <div className="space-y-6">
          {/* PROFIL & IDENTIFIANTS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <SectionTitle icon={User} title="Profil personnel" />
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase">Nom</label>
                    <input name="nom" value={settings.nom} onChange={handleChange} className="w-full mt-1 p-2 bg-gray-50 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase">Prénom</label>
                    <input name="prenom" value={settings.prenom} onChange={handleChange} className="w-full mt-1 p-2 bg-gray-50 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                  </div>
                </div>
                <div>
                  {/*<label className="text-xs font-bold text-gray-500 uppercase">Fuseau Horaire</label>

                 <select name="timezone" value={settings.timezone} onChange={handleChange} className="w-full mt-1 p-2 bg-gray-50 border rounded-lg outline-none">
                    <option value="UTC+3">Antananarivo (UTC+3)</option>
                    <option value="UTC+1">Afrique de l'ouest (UTC+1)</option>
                  </select>*/}
                  
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <SectionTitle icon={Lock} title="Sécurité" />
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase">Email</label>
                  <input name="email" type="email" value={settings.email} onChange={handleChange} className="w-full mt-1 p-2 bg-gray-50 border rounded-lg outline-none" />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase">Nom d'utilisateur</label>
                  <input name="username" value={settings.username} onChange={handleChange} className="w-full mt-1 p-2 bg-gray-50 border rounded-lg outline-none" />
                </div>
              </div>
            </div>
          </div>

          {/* PRÉFÉRENCES (LANGUE & THÈME) */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <SectionTitle icon={Globe} title="Préférences régionales" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase block mb-2">Langue de l'interface</label>
                <div className="flex gap-2">
                  {['fr', 'an', 'mg'].map((lang) => (
                    <button key={lang} onClick={() => setSettings({...settings, langue: lang})} 
                      className={`flex-1 py-2 rounded-lg border text-sm font-medium transition-all ${settings.langue === lang ? "bg-blue-700 text-white border-blue-700 shadow-md" : "bg-white text-gray-600 hover:bg-gray-50"}`}>
                      {lang === 'fr' ? 'Français' : lang === 'an' ? 'Anglais' : 'Malagache'}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase block mb-2">Mode d'affichage</label>
                <select name="theme" value={settings.theme} onChange={handleChange} className="w-full p-2 bg-gray-50 border rounded-lg outline-none">
                  <option value="light">Clair</option>
                  <option value="dark">Sombre</option>
                  <option value="system">Adaptation système</option>
                </select>
              </div>
            </div>
          </div>

          {/* NOTIFICATIONS */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <SectionTitle icon={Bell} title="Notifications" />
            <div className="flex flex-col gap-4">
              <label className="flex items-center gap-3 cursor-pointer group">
                <input type="checkbox" name="notifEmail" checked={settings.notifEmail} onChange={handleChange} className="w-5 h-5 rounded border-gray-300 text-blue-700 focus:ring-blue-500" />
                <span className="text-sm text-gray-700 group-hover:text-blue-700 transition-colors">Recevoir les alertes par E-mail</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer group">
                <input type="checkbox" name="notifSMS" checked={settings.notifSMS} onChange={handleChange} className="w-5 h-5 rounded border-gray-300 text-blue-700 focus:ring-blue-500" />
                <span className="text-sm text-gray-700 group-hover:text-blue-700 transition-colors">Recevoir les alertes par SMS</span>
              </label>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <button className="flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white px-6 py-2.5 rounded-lg font-medium transition-all shadow-lg active:scale-95">
            <Save className="w-4 h-4" />
            Sauvegarder les changements
          </button>
        </div>
      </div>
    </div>
  );
}