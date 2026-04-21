import { useState } from "react";
import { Switch, Route, Router as WouterRouter, Redirect } from "wouter";
import { useHashLocation } from "wouter/use-hash-location";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
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

function Dashboard() {
  const [page, setPage] = useState("dashboard");

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
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <Sidebar activePage={page} onNavigate={setPage} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title={TITLES[page]} onNavigate={setPage} />
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
      <Route><Login /></Route>
    </Switch>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <WouterRouter hook={useHashLocation}>
        <AppRoutes />
      </WouterRouter>
    </AuthProvider>
  );
}
