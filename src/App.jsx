import { useState } from "react";
import { Switch, Route, Router as WouterRouter, Redirect } from "wouter";
import { useHashLocation } from "wouter/use-hash-location";
import { AuthProvider, useAuth }                from "./contexts/AuthContext";
import { AppSettingsProvider, useAppSettings }  from "./contexts/AppSettingsContext";
import Login            from "./pages/Login";
import Sidebar          from "./components/Layout/Sidebar";
import Header           from "./components/Layout/Header";
import DashboardPage    from "./pages/DashboardPage";
import FilialePage      from "./pages/FilialePage";
import AgencePage       from "./pages/AgencePage";
import RapportsPage     from "./pages/RapportsPage";
import UtilisateursPage from "./components/utilisateurs/UtilisateursPage";
import RolesPage        from "./components/roles/RolesPage";
import IncidentsPage    from "./components/incidents/IncidentsPage";
import Parametre        from "./pages/Parametre";
import ClientIncidentForm from "./pages/ClientPage";
// ── Titres traduits selon la langue active ──
const TITLES = {
  fr: {
    dashboard:    "Tableau de bord",
    filiales:     "Gestion des groupes / Filiales",
    agences:      "Gestion des groupes / Agences",
    utilisateurs: "Utilisateurs",
    roles:        "Rôles & Permissions",
    suivi:        "Suivi des incidents",
    rapports:     "Rapports",
    parametres:   "Paramètres",
  },
  en: {
    dashboard:    "Dashboard",
    filiales:     "Group Management / Branches",
    agences:      "Group Management / Agencies",
    utilisateurs: "Users",
    roles:        "Roles & Permissions",
    suivi:        "Incident Tracking",
    rapports:     "Reports",
    parametres:   "Settings",
  },
  mg: {
    dashboard:    "Tableau de bord",
    filiales:     "Fitantanana ny vondron'ny Filiale",
    agences:      "Fitantanana ny vondron'ny Agence",
    utilisateurs: "Mpampiasa",
    roles:        "Andraikitra & Fahazoan-dàlana",
    suivi:        "Fanaraha-maso ny olana",
    rapports:     "Tatitra",
    parametres:   "Fametrahana",
  },
};

function Dashboard() {
  const [page, setPage] = useState("dashboard");
  const { langue } = useAppSettings();
  const titles = TITLES[langue] || TITLES.fr;

  const renderPage = () => {
    if (page === "dashboard")    return <DashboardPage />;
    if (page === "filiales")     return <FilialePage />;
    if (page === "agences")      return <AgencePage />;
    if (page === "rapports")     return <RapportsPage />;
    if (page === "utilisateurs") return <UtilisateursPage />;
    if (page === "roles")        return <RolesPage />;
    if (page === "suivi")        return <IncidentsPage />;
    if (page === "parametres")   return <Parametre />;
    return <DashboardPage />;
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Sidebar activePage={page} onNavigate={setPage} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title={titles[page]} onNavigate={setPage} />
        <div className="flex-1 flex overflow-hidden">{renderPage()}</div>
      </div>
    </div>
  );
}

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Redirect to="/" />;
}

function AppRoutes() {
  return (
    <Switch>
      <Route path="/" component={Login} />
      <Route path="/dashboard">
        <ProtectedRoute><Dashboard /></ProtectedRoute>
      </Route>
      <Route path="/signaler-incident">
        <ProtectedRoute><ClientPage /></ProtectedRoute>
      </Route>
      <Route><Login /></Route>
    </Switch>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppSettingsProvider>
        <WouterRouter hook={useHashLocation}>
          <AppRoutes />
        </WouterRouter>
      </AppSettingsProvider>
    </AuthProvider>
  );
}
