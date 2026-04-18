import { useState } from "react";
import { Switch, Route, Router as WouterRouter, Redirect } from "wouter";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import Login from "./pages/Login";
import Sidebar from "./components/Layout/Sidebar";
import Header from "./components/Layout/Header";
import DashboardPage from "./pages/DashboardPage";
import FilialePage from "./pages/FilialePage";
import AgencePage from "./pages/AgencePage";
import RapportsPage from "./pages/RapportsPage";
import EmptyPage from "./pages/EmptyPage";

const TITLES = {
  dashboard: "Tableau de bord",
  filiales: "Gestion des groupes / Filiales",
  agences: "Gestion des groupes / Agences",
  utilisateurs: "Utilisateurs",
  roles: "Rôles & Permissions",
  suivi: "Suivi des agences",
  rapports: "Rapports",
  parametres: "Paramètres",
};

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
    if (page === "parametres") return <Parametre />;
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
      <WouterRouter>
        <AppRoutes />
      </WouterRouter>
    </AuthProvider>
  );
}
