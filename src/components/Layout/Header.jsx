import { useState, useRef, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useAppSettings } from "../../contexts/AppSettingsContext";

const TRANSLATIONS = {
  fr: {
    monProfil:"Mon profil", deconnexion:"Déconnexion", admin:"Administrateur",
    notifications:"Notifications", markAllRead:"Tout marquer lu", noNotif:"Aucune notification",
    notifItems:[
      { id:1,type:"incident",title:"Nouvel incident critique",      desc:"Agence Plateau — Connexion GFA impossible",    time:"Il y a 5 min",  read:false },
      { id:2,type:"rapport", title:"Rapport mensuel disponible",    desc:"Rapport Mars 2025 généré avec succès",         time:"Il y a 1h",    read:false },
      { id:3,type:"user",    title:"Nouvel utilisateur ajouté",     desc:"Jean Dupont — Rôle Employé assigné",           time:"Il y a 3h",    read:true  },
      { id:4,type:"incident",title:"Incident résolu",               desc:"Agence Bonapriso — Lenteur corrigée",          time:"Hier",         read:true  },
      { id:5,type:"system",  title:"Mise à jour système",           desc:"GFALens v2.1.0 déployée avec succès",          time:"Il y a 2j",   read:true  },
    ],
  },
  en: {
    monProfil:"My profile", deconnexion:"Logout", admin:"Administrator",
    notifications:"Notifications", markAllRead:"Mark all as read", noNotif:"No notifications",
    notifItems:[
      { id:1,type:"incident",title:"New critical incident",         desc:"Agency Plateau — GFA connection failed",       time:"5 min ago",    read:false },
      { id:2,type:"rapport", title:"Monthly report available",      desc:"March 2025 report generated successfully",     time:"1h ago",       read:false },
      { id:3,type:"user",    title:"New user added",                desc:"Jean Dupont — Employee role assigned",         time:"3h ago",       read:true  },
      { id:4,type:"incident",title:"Incident resolved",             desc:"Agency Bonapriso — Slowness fixed",            time:"Yesterday",    read:true  },
      { id:5,type:"system",  title:"System update",                 desc:"GFALens v2.1.0 deployed successfully",         time:"2d ago",       read:true  },
    ],
  },
  mg: {
    monProfil:"Ny momba ahy", deconnexion:"Hiala", admin:"Administratora",
    notifications:"Fampandrenesana", markAllRead:"Marihina ho voavaky rehetra", noNotif:"Tsy misy fampandrenesana",
    notifItems:[
      { id:1,type:"incident",title:"Olana maika vaovao",            desc:"Agence Plateau — Tsy mety ny GFA",             time:"5 min lasa",   read:false },
      { id:2,type:"rapport", title:"Tatitra volana azo",            desc:"Tatitra Martsa 2025 vita soa aman-tsara",      time:"1h lasa",      read:false },
      { id:3,type:"user",    title:"Mpampiasa vaovao nampiana",     desc:"Jean Dupont — Andraikitra Employé",            time:"3h lasa",      read:true  },
      { id:4,type:"incident",title:"Olana voavaha",                 desc:"Agence Bonapriso — Haingana indray",           time:"Omaly",        read:true  },
      { id:5,type:"system",  title:"Fanavaozana rindrambaiko",      desc:"GFALens v2.1.0 napetraka soa aman-tsara",     time:"2 andro lasa", read:true  },
    ],
  },
};

const NOTIF_ICONS = {
  incident:{ bg:"bg-red-100 dark:bg-red-900/40",    icon:"⚠️" },
  rapport: { bg:"bg-blue-100 dark:bg-blue-900/40",  icon:"📄" },
  user:    { bg:"bg-teal-100 dark:bg-teal-900/40",  icon:"👤" },
  system:  { bg:"bg-purple-100 dark:bg-purple-900/40",icon:"⚙️"},
};

export default function Header({ title, onNavigate }) {
  const { user, logout } = useAuth();
  const { langue }       = useAppSettings();
  const t                = TRANSLATIONS[langue] || TRANSLATIONS.fr;

  const [openUser,  setOpenUser]  = useState(false);
  const [openNotif, setOpenNotif] = useState(false);
  const [notifs,    setNotifs]    = useState(t.notifItems);

  useEffect(() => {
    setNotifs((TRANSLATIONS[langue] || TRANSLATIONS.fr).notifItems);
  }, [langue]);

  const userRef  = useRef(null);
  const notifRef = useRef(null);

  useEffect(() => {
    const h = (e) => {
      if (userRef.current  && !userRef.current.contains(e.target))  setOpenUser(false);
      if (notifRef.current && !notifRef.current.contains(e.target)) setOpenNotif(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  const unreadCount = notifs.filter(n => !n.read).length;
  const markAllRead = () => setNotifs(p => p.map(n => ({ ...n, read:true })));
  const markOneRead = (id) => setNotifs(p => p.map(n => n.id===id ? {...n,read:true} : n));

  return (
    <div className="h-14 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-6 flex-shrink-0 transition-colors duration-300">
      <h2 className="text-sm font-semibold text-gray-800 dark:text-gray-100">{title}</h2>

      <div className="flex items-center gap-2">

        {/* NOTIFICATIONS */}
        <div className="relative" ref={notifRef}>
          <button onClick={() => { setOpenNotif(!openNotif); setOpenUser(false); }}
            className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
            <svg className="w-5 h-5 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
            </svg>
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 min-w-[16px] h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center px-0.5">
                {unreadCount}
              </span>
            )}
          </button>

          {openNotif && (
            <div className="absolute right-0 top-12 w-80 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-2xl z-50 overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-gray-700">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">{t.notifications}</span>
                  {unreadCount > 0 && (
                    <span className="px-1.5 py-0.5 bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-300 text-xs font-bold rounded-full">{unreadCount}</span>
                  )}
                </div>
                {unreadCount > 0 && (
                  <button onClick={markAllRead} className="text-xs text-blue-600 dark:text-blue-400 hover:underline font-medium">{t.markAllRead}</button>
                )}
              </div>
              <div className="max-h-80 overflow-y-auto divide-y divide-gray-50 dark:divide-gray-700">
                {notifs.length === 0
                  ? <div className="py-8 text-center text-sm text-gray-400">{t.noNotif}</div>
                  : notifs.map(n => (
                    <button key={n.id} onClick={() => markOneRead(n.id)}
                      className={`w-full text-left px-4 py-3 flex items-start gap-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors ${!n.read?"bg-blue-50/50 dark:bg-blue-900/10":""}`}>
                      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm ${NOTIF_ICONS[n.type]?.bg||"bg-gray-100"}`}>
                        {NOTIF_ICONS[n.type]?.icon||"🔔"}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className={`text-xs font-semibold truncate ${!n.read?"text-gray-900 dark:text-gray-100":"text-gray-600 dark:text-gray-400"}`}>{n.title}</p>
                          {!n.read && <span className="w-1.5 h-1.5 bg-blue-500 rounded-full flex-shrink-0"/>}
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate mt-0.5">{n.desc}</p>
                        <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-1">{n.time}</p>
                      </div>
                    </button>
                  ))
                }
              </div>
            </div>
          )}
        </div>

        {/* UTILISATEUR */}
        <div className="relative" ref={userRef}>
          <button onClick={() => { setOpenUser(!openUser); setOpenNotif(false); }}
            className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
            <img src={user?.avatar||"https://i.pravatar.cc/40?u=admin"} alt="avatar"
              className="w-8 h-8 rounded-full object-cover border-2 border-blue-200"/>
            <div className="hidden sm:block text-left">
              <p className="text-sm font-semibold text-gray-800 dark:text-gray-100 leading-tight">{user?.name||"Admin"}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{user?.role||t.admin}</p>
            </div>
            <svg className="w-4 h-4 text-gray-400 hidden sm:block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/>
            </svg>
          </button>

          {openUser && (
            <div className="absolute right-0 top-12 w-52 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg z-50 py-1">
              <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
                <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">{user?.name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{user?.email}</p>
              </div>
              <button onClick={() => { onNavigate("parametres"); setOpenUser(false); }}
                className="w-full text-left px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                {t.monProfil}
              </button>
              <button onClick={() => { logout(); setOpenUser(false); }}
                className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                {t.deconnexion}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
