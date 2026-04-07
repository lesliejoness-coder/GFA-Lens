import { useState } from "react";

export default function Sidebar({ activePage, onNavigate }) {
  const [open, setOpen] = useState({
    groupes: activePage === "filiales" || activePage === "agences",
    users: activePage === "utilisateurs" || activePage === "roles",
  });

  const toggle = (k) => setOpen(prev => ({ ...prev, [k]: !prev[k] }));
  const active = (p) => activePage === p;

  const navBtn = (page, label) => (
    <button key={page} onClick={() => onNavigate(page)}
      className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition-all ${active(page) ? "bg-blue-700 text-white font-medium" : "text-blue-100 hover:bg-blue-800/60 hover:text-white"}`}>
      {label}
    </button>
  );

  const subBtn = (page, label) => (
    <button key={page} onClick={() => onNavigate(page)}
      className={`w-full flex items-center gap-2 pl-9 pr-4 py-2 rounded-lg text-sm transition-all ${active(page) ? "bg-blue-700 text-white font-medium" : "text-blue-200 hover:bg-blue-800/60 hover:text-white"}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-60" />
      {label}
    </button>
  );

  const menuBtn = (key, label) => (
    <button onClick={() => toggle(key)}
      className="w-full flex items-center justify-between px-4 py-2.5 rounded-lg text-sm text-blue-100 hover:bg-blue-800/60 hover:text-white transition-all">
      <span>{label}</span>
      <svg className={`w-4 h-4 transition-transform ${open[key] ? "rotate-90" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </button>
  );

  return (
    <div className="h-screen bg-blue-900 text-white w-64 flex-shrink-0 hidden md:flex flex-col overflow-y-auto">
      <div className="px-4 py-5 border-b border-blue-800/60">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center">
            <svg className="w-5 h-5 text-white" viewBox="0 0 20 20" fill="currentColor">
              <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
              <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <p className="font-bold text-white">AFGBank</p>
            <p className="text-blue-300 text-xs">Plateforme GFA</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-3 space-y-1">
        {navBtn("dashboard", "Tableau de bord")}

        <div>
          {menuBtn("groupes", "Gestion des groupes")}
          {open.groupes && (
            <div className="mt-1 space-y-0.5 border-l border-blue-700/50 ml-6">
              {subBtn("filiales", "Filiales")}
              {subBtn("agences", "Agences")}
            </div>
          )}
        </div>

        <div>
          {menuBtn("users", "Utilisateurs")}
          {open.users && (
            <div className="mt-1 space-y-0.5 border-l border-blue-700/50 ml-6">
              {subBtn("utilisateurs", "Utilisateur")}
              {subBtn("roles", "Rôle")}
            </div>
          )}
        </div>

        {navBtn("suivi", "Suivi des agences")}
        {navBtn("rapports", "Rapports")}
        {navBtn("parametres", "Paramètres")}
      </nav>

      <div className="p-3 border-t border-blue-800/60">
        <div className="flex items-center gap-2 px-2 py-1.5">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <p className="text-xs text-blue-300">Système opérationnel</p>
        </div>
      </div>
    </div>
  );
}
