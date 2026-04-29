import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useAuth } from "../contexts/AuthContext";
import logo from "../asset/logo.jpeg";

// ─── Traductions ───────────────────────────────────────────────
const T = {
  fr: {
    platform:    "Plateforme de gestion et supervision",
    title:       "Connexion",
    subtitle:    "Entrez vos identifiants pour accéder au tableau de bord",
    emailLabel:  "Adresse email",
    passLabel:   "Mot de passe",
    emailPh:     "admin@afgbank.cm",
    passPh:      "••••••••",
    btnLogin:    "Se connecter",
    btnLoading:  "Connexion en cours...",
    errFields:   "Veuillez remplir tous les champs.",
    errCreds:    "Identifiants incorrects. Veuillez réessayer.",
    secure:      "Sécurisé par TLS 1.3 · Accès autorisé uniquement",
    copyright:   "© 2026 GFALens — Tous droits réservés",
  },
  en: {
    platform:    "Management and supervision platform",
    title:       "Sign In",
    subtitle:    "Enter your credentials to access the dashboard",
    emailLabel:  "Email address",
    passLabel:   "Password",
    emailPh:     "admin@afgbank.cm",
    passPh:      "••••••••",
    btnLogin:    "Sign in",
    btnLoading:  "Signing in...",
    errFields:   "Please fill in all fields.",
    errCreds:    "Incorrect credentials. Please try again.",
    secure:      "Secured by TLS 1.3 · Authorized access only",
    copyright:   "© 2026 GFALens — All rights reserved",
  },
  mg: {
    platform:    "Sehatra fitantanana sy fanaraha-maso",
    title:       "Hiditra",
    subtitle:    "Ampidiro ny mombamomba anao hiditra amin'ny dashboard",
    emailLabel:  "Adiresy imailaka",
    passLabel:   "Teny miafina",
    emailPh:     "admin@afgbank.cm",
    passPh:      "••••••••",
    btnLogin:    "Hiditra",
    btnLoading:  "Miditra...",
    errFields:   "Fenoy ny saha rehetra azafady.",
    errCreds:    "Diso ny mombamomba. Andamo indray.",
    secure:      "Voaro amin'ny TLS 1.3 · Fidirana voahasina ihany",
    copyright:   "© 2026 GFALens — Zo rehetra voatokana",
  },
};

const LANG_LABELS = { fr: "FR", en: "EN", mg: "MG" };

export default function Login() {
  const { isAuthenticated, user, login } = useAuth();
  const [, navigate] = useLocation();

  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState("");
  const [showPass, setShowPass] = useState(false);

  // Langue lue depuis localStorage (même clé que AppSettingsContext)
  const [langue, setLangue] = useState(
    () => localStorage.getItem("gfalens_lang") || "fr"
  );

  const t = T[langue] || T.fr;

  // Quand l'utilisateur change la langue ici, on persiste pour que le reste de l'app suive
  const handleLangChange = (lang) => {
    setLangue(lang);
    localStorage.setItem("gfalens_lang", lang);
  };

  useEffect(() => {
    if (isAuthenticated && user) {
      if (user.role === "client") {
        navigate("/signaler-incident");
      } else {
        navigate("/dashboard");
      }
    }
  }, [isAuthenticated, user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError(t.errFields);
      return;
    }
    setLoading(true);
    try {
      await login(email, password);
    } catch {
      setError(t.errCreds);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 50%, #2563eb 100%)" }}
    >
      {/* Décoration fond */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #60a5fa, transparent)" }} />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #a78bfa, transparent)" }} />
        <div className="absolute top-1/2 left-1/4 w-64 h-64 rounded-full opacity-5"
          style={{ background: "radial-gradient(circle, #ffffff, transparent)" }} />
      </div>

      {/* Sélecteur de langue — coin haut droit */}
      <div className="absolute top-5 right-6 z-20 flex gap-1.5">
        {Object.entries(LANG_LABELS).map(([key, label]) => (
          <button
            key={key}
            onClick={() => handleLangChange(key)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              langue === key
                ? "bg-white text-blue-900 shadow-md"
                : "bg-white/20 text-white hover:bg-white/30"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="w-full max-w-md px-6 relative z-10">
        {/* Logo + titre */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white shadow-2xl mb-4">
            <img src={logo} alt="Logo GFALens" className="w-15 h-15 object-contain" />
          </div>
          <h1 className="text-3xl font-bold text-white">GFALens</h1>
          <p className="text-blue-200 text-sm mt-1">{t.platform}</p>
        </div>

        {/* Carte formulaire */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-1">{t.title}</h2>
          <p className="text-sm text-gray-500 mb-6">{t.subtitle}</p>

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                {t.emailLabel}
              </label>
              <div className="relative">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                  fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </svg>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder={t.emailPh}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 focus:bg-white transition-colors"
                />
              </div>
            </div>

            {/* Mot de passe */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-sm font-medium text-gray-700">{t.passLabel}</label>
              </div>
              <div className="relative">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                  fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <input
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder={t.passPh}
                  required
                  className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 focus:bg-white transition-colors"
                />
                <button type="button" onClick={() => setShowPass(!showPass)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Erreur */}
            {error && (
              <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-100 rounded-xl">
                <svg className="w-4 h-4 text-red-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            {/* Bouton */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-blue-900 hover:bg-blue-800 text-white font-medium rounded-xl transition-all disabled:opacity-70 flex items-center justify-center gap-2 shadow-lg"
            >
              {loading && (
                <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
              )}
              {loading ? t.btnLoading : t.btnLogin}
            </button>
          </form>

          <p className="text-xs text-gray-400 text-center mt-6 pt-6 border-t border-gray-100">
            {t.secure}
          </p>
        </div>

        <p className="text-center text-blue-300 text-xs mt-6">{t.copyright}</p>
      </div>
    </div>
  );
}
