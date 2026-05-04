import { useState, useRef, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useAppSettings } from "../../contexts/AppSettingsContext";

const TRANSLATIONS = {
  fr: {
    monProfil:       "Mon profil",
    deconnexion:     "Déconnexion",
    admin:           "Administrateur",
    notifications:   "Notifications",
    markAllRead:     "Tout marquer lu",
    noNotif:         "Aucune notification",
    notifSubtitle:   "Vous êtes à jour !",
    voirTout:        "Voir toutes les notifications",
    il:              "il y a",
  },
  en: {
    monProfil:       "My profile",
    deconnexion:     "Logout",
    admin:           "Administrator",
    notifications:   "Notifications",
    markAllRead:     "Mark all as read",
    noNotif:         "No notifications",
    notifSubtitle:   "You're all caught up!",
    voirTout:        "View all notifications",
    il:              "",
  },
  mg: {
    monProfil:       "Ny momba ahy",
    deconnexion:     "Hiala",
    admin:           "Administratora",
    notifications:   "Fampandrenesana",
    markAllRead:     "Marihina ho voavaky rehetra",
    noNotif:         "Tsy misy fampandrenesana",
    notifSubtitle:   "Efa vita daholo!",
    voirTout:        "Hijery fampandrenesana rehetra",
    il:              "taloha",
  },
};

// Notifications mock
const INITIAL_NOTIFS = [
  { id: 1, type: "incident",  title: "Incident critique détecté",     body: "Agence Plateau — Connexion impossible à GFA",  time: "2 min",  read: false },
  { id: 2, type: "rapport",   title: "Rapport mensuel disponible",    body: "Rapport Mars 2025 généré avec succès",          time: "1 h",    read: false },
  { id: 3, type: "agence",    title: "Agence mise en maintenance",    body: "Agence Yopougon — Maintenance planifiée",       time: "3 h",    read: false },
  { id: 4, type: "user",      title: "Nouvel utilisateur ajouté",     body: "M. Kamdem a rejoint l'équipe Douala",           time: "1 j",    read: true  },
  { id: 5, type: "rapport",   title: "Rapport hebdomadaire prêt",     body: "Semaine 13 — AFGBank Douala",                   time: "2 j",    read: true  },
];

const NOTIF_ICONS = {
  incident: { bg: "bg-red-100 dark:bg-red-900/40",    icon: "⚠️" },
  rapport:  { bg: "bg-blue-100 dark:bg-blue-900/40",  icon: "📄" },
  agence:   { bg: "bg-yellow-100 dark:bg-yellow-900/40", icon: "🏦" },
  user:     { bg: "bg-green-100 dark:bg-green-900/40", icon: "👤" },
};

export default function Header({ title, onNavigate }) {
  const { user, logout } = useAuth();
  const { langue } = useAppSettings();
  const t = TRANSLATIONS[langue] || TRANSLATIONS.fr;

  const [openUser,  setOpenUser]  = useState(false);
  const [openNotif, setOpenNotif] = useState(false);
  const [notifs, setNotifs] = useState(INITIAL_NOTIFS);

  const notifRef = useRef(null);
  const userRef  = useRef(null);

  const unread = notifs.filter(n => !n.read).length;

  // Fermer les panneaux en cliquant ailleurs
  useEffect(() => {
    const handler = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) setOpenNotif(false);
      if (userRef.current  && !userRef.current.contains(e.target))  setOpenUser(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const markAllRead = () => setNotifs(prev => prev.map(n => ({ ...n, read: true })));
  const markRead    = (id) => setNotifs(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));

  return (
    <div className="h-14 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-6 flex-shrink-0 transition-colors duration-300">

      {/* Titre */}
      <h2 className="text-sm font-semibold text-gray-800 dark:text-gray-100">{title}</h2>

      <div className="flex items-center gap-2">

        {/* ── CLOCHE NOTIFICATION ── */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => { setOpenNotif(v => !v); setOpenUser(false); }}
            className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <svg className="w-5 h-5 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            {unread > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center leading-none">
                {unread}
              </span>
            )}
          </button>

          {/* Panneau notifications */}
          {openNotif && (
            <div className="absolute right-0 top-12 w-80 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-2xl z-50 overflow-hidden">

              {/* Header panneau */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-gray-700">
                <div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">{t.notifications}</p>
                  {unread > 0 && (
                    <p className="text-xs text-gray-400 dark:text-gray-500">{unread} non lue{unread > 1 ? "s" : ""}</p>
                  )}
                </div>
                {unread > 0 && (
                  <button
                    onClick={markAllRead}
                    className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    {t.markAllRead}
                  </button>
                )}
              </div>

              {/* Liste */}
              <div className="max-h-72 overflow-y-auto divide-y divide-gray-50 dark:divide-gray-700">
                {notifs.length === 0 ? (
                  <div className="py-10 text-center">
                    <p className="text-2xl mb-1">🔔</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{t.noNotif}</p>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{t.notifSubtitle}</p>
                  </div>
                ) : (
                  notifs.map(n => {
                    const icon = NOTIF_ICONS[n.type] || NOTIF_ICONS.user;
                    return (
                      <div
                        key={n.id}
                        onClick={() => markRead(n.id)}
                        className={`flex items-start gap-3 px-4 py-3 cursor-pointer transition-colors ${
                          n.read
                            ? "hover:bg-gray-50 dark:hover:bg-gray-700/40"
                            : "bg-blue-50/60 dark:bg-blue-900/10 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                        }`}
                      >
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-sm ${icon.bg}`}>
                          {icon.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className={`text-sm leading-tight ${n.read ? "text-gray-700 dark:text-gray-300" : "font-semibold text-gray-900 dark:text-gray-100"}`}>
                            {n.title}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 truncate">{n.body}</p>
                          <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                            {t.il} {n.time}
                          </p>
                        </div>
                        {!n.read && (
                          <span className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0 mt-1.5" />
                        )}
                      </div>
                    );
                  })
                )}
              </div>

              {/* Footer */}
              <div className="border-t border-gray-100 dark:border-gray-700 px-4 py-2.5">
                <button className="w-full text-center text-xs text-blue-600 dark:text-blue-400 hover:underline py-1">
                  {t.voirTout}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ── MENU UTILISATEUR ── */}
        <div className="relative" ref={userRef}>
          <button
            onClick={() => { setOpenUser(v => !v); setOpenNotif(false); }}
            className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <img
              src={user?.avatar || "https://i.pravatar.cc/40?u=admin"}
              alt="avatar"
              className="w-8 h-8 rounded-full object-cover border-2 border-blue-200"
            />
            <div className="hidden sm:block text-left">
              <p className="text-sm font-semibold text-gray-800 dark:text-gray-100 leading-tight">
                {user?.name || "Admin"}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {user?.role || t.admin}
              </p>
            </div>
            <svg className="w-4 h-4 text-gray-400 hidden sm:block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {openUser && (
            <div className="absolute right-0 top-12 w-52 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg z-50 py-1">
              <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
                <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">{user?.name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{user?.email}</p>
              </div>
              <button
                onClick={() => { onNavigate("parametres"); setOpenUser(false); }}
                className="w-full text-left px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                {t.monProfil}
              </button>
              <button
                onClick={() => { logout(); setOpenUser(false); }}
                className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
              >
                {t.deconnexion}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
