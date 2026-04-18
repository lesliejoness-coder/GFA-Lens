import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("gfa_user");
    if (saved) { setUser(JSON.parse(saved)); setIsAuthenticated(true); }
  }, []);

  /*const login = async (email) => {
    await new Promise(r => setTimeout(r, 1200));
    const u = { email, name: "Leslie Jones", role: "Administrateur", avatar: "https://i.pravatar.cc/80?u=leslie" };
    localStorage.setItem("gfa_user", JSON.stringify(u));
    setUser(u); setIsAuthenticated(true);
  };*/

const login = async (email, password) => {
    await new Promise(r => setTimeout(r, 1200));
    
    // Simulation d'attribution de rôle selon l'email
    let role = "Administrateur";
    let name = "Leslie Jones";

    if (email.includes("client")) {
      role = "client"; // Assure-toi que c'est le même nom que dans allowedRole="client"
      name = "Client Test";
    }

    const u = { 
      email, 
      name: name, 
      role: role, 
      avatar: `https://i.pravatar.cc/80?u=${email}` 
    };

    localStorage.setItem("gfa_user", JSON.stringify(u));
    setUser(u); 
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("gfa_user");
    setUser(null); setIsAuthenticated(false);
  };

  return <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>{children}</AuthContext.Provider>;
}
