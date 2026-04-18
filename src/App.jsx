import { useState } from "react";
import { Switch, Route, Router as WouterRouter, Redirect } from "wouter";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import Login        from "./pages/Login";
import Sidebar      from "./components/Layout/Sidebar";
import Header       from "./components/Layout/Header";
import DashboardPage from "./pages/DashboardPage";
import FilialePage  from "./pages/FilialePage";
import AgencePage   from "./pages/AgencePage";
import RapportsPage from "./pages/RapportsPage";
import EmptyPage from "./pages/EmptyPage";
import Parametres from "./pages/Parametre";
import ClientPage from "./pages/ClientPage";
import EmptyPage    from "./pages/EmptyPage";

// ── Modules utilisateurs / rôles ────────────────────────────────
import UtilisateursPage from "./components/utilisateurs/UtilisateursPage";
import RolesPage        from "./components/roles/RolesPage";

// ── Module incidents ─────────────────────────────────────────────
import IncidentsPage from "./components/incidents/IncidentsPage";


const TITLES = {
  dashboard:    "Tableau de bord",
  filiales:     "Gestion des groupes / Filiales",
  agences:      "Gestion des groupes / Agences",
  utilisateurs: "Utilisateurs",
  roles:        "Rôles & Permissions",
  suivi:        "Suivi des incidents",
  rapports:     "Rapports",
  parametres:   "Paramètres",
};

function renderPage(page) {
  switch (page) {
    case "dashboard":    return <DashboardPage />;
    case "filiales":     return <FilialePage />;
    case "agences":      return <AgencePage />;
    case "rapports":     return <RapportsPage />;
    case "utilisateurs": return <UtilisateursPage />;
    case "roles":        return <RolesPage />;
    case "suivi":        return <IncidentsPage />;        // ← branché
    case "parametres":   return <EmptyPage title="Paramètres" icon="⚙️" />;
    default:             return <DashboardPage />;
  }
}

function Dashboard() {
  const [page, setPage] = useState("dashboard");


  const renderPage = () => {
    if (page === "dashboard") return <DashboardPage />;
    if (page === "filiales") return <FilialePage />;
    if (page === "agences") return <AgencePage />;
    if (page === "rapports") return <RapportsPage />;
    if (page === "utilisateurs") return <EmptyPage title="Utilisateurs" icon="👤" />;
    if (page === "roles") return <EmptyPage title="Rôles & Permissions" icon="🔐" />;
    if (page === "suivi") return <EmptyPage title="Suivi des agences" icon="📡" />;
    if (page === "parametres") return <Parametres />;
    return <DashboardPage />;
  };


  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <Sidebar activePage={page} onNavigate={setPage} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title={TITLES[page]} onNavigate={setPage} />
        <div className="flex-1 flex overflow-hidden">
          {renderPage(page)}
        </div>
      </div>
    </div>
  );
}

// --- NOUVEAU COMPOSANT : LAYOUT POUR LE CLIENT ---
function ClientLayout() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Un header simple pour le client sans Sidebar */}
      <header className="bg-white shadow-sm py-4 px-8 flex justify-between items-center border-b border-blue-900">
        <h1 className="text-xl font-bold text-blue-900">GFALens Client</h1>
        <button 
          onClick={() => window.location.href = "/"} // Logique de déconnexion simple
          className="text-sm text-gray-600 hover:text-red-500 font-medium"
        >
          Déconnexion
        </button>
      </header>
      <main className="flex-1 p-4 md:p-8">
        <ClientIncidentForm />
      </main>
    </div>
  );
}

function ProtectedRoute({ children, allowedRole }) {
  const { isAuthenticated, user} = useAuth();
  return isAuthenticated ? <>{children}</> : <Redirect to="/" />;

  // Si un rôle spécifique est requis (ex: client)
  if (allowedRole && user?.role !== allowedRole) {
    // Redirection de secours si le rôle ne correspond pas
    return <Redirect to={user?.role === "client" ? "/incident" : "/dashboard"} />;
  }
  return <>{children}</>;
}

function AppRoutes() {
  return (
    <Switch>
      
      <Route path="/" component={Login} />
      <Route path="/dashboard">
        <ProtectedRoute allowedRole="admin">
          <Dashboard />
        </ProtectedRoute>
      </Route>

      <Route path="/signaler-incident">
        <ProtectedRoute allowedRole="client">
          <ClientPage />
        </ProtectedRoute>
      </Route>

      <Route>
        <Redirect to="/" />
      </Route>

      <Route><Login /></Route>

    </Switch>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <WouterRouter>
        <AppRoutes />
      </WouterRouter>
    </AuthProvider>
  );
}
