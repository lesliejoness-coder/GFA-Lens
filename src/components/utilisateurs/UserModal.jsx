import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useAppSettings } from "../../contexts/AppSettingsContext";

const T = {
  fr: {
    titleAdd: "Ajouter utilisateur",
    titleEdit: "Modifier utilisateur",
    firstNamePlaceholder: "Prénom",
    lastNamePlaceholder: "Nom",
    emailPlaceholder: "Email",
    passwordPlaceholder: "Mot de passe",
    rolePlaceholder: "-- Rôle --",
    agencePlaceholder: "Agence",
    filialePlaceholder: "Filiale",
    cancel: "Annuler",
    add: "Ajouter",
    edit: "Modifier",
  },
  en: {
    titleAdd: "Add user",
    titleEdit: "Edit user",
    firstNamePlaceholder: "First name",
    lastNamePlaceholder: "Last name",
    emailPlaceholder: "Email",
    passwordPlaceholder: "Password",
    rolePlaceholder: "-- Role --",
    agencePlaceholder: "Agency",
    filialePlaceholder: "Branch",
    cancel: "Cancel",
    add: "Add",
    edit: "Save",
  },
  mg: {
    titleAdd: "Manampy mpampiasa",
    titleEdit: "Hanova mpampiasa",
    firstNamePlaceholder: "Fanampiny",
    lastNamePlaceholder: "Anarana",
    emailPlaceholder: "Imailaka",
    passwordPlaceholder: "Teny miafina",
    rolePlaceholder: "-- Andraikitra --",
    agencePlaceholder: "Agence",
    filialePlaceholder: "Filiale",
    cancel: "Hanafoana",
    add: "Hanampy",
    edit: "Hanova",
  },
};

const ROLES    = ["Admin", "Employé", "Client"];
const AGENCES  = ["Agence Plateau", "Agence Bonapriso", "Agence Centre-ville", "Agence Yopougon", "Agence Akwa"];
const FILIALES = ["AFGBank CI", "AFGBank Cameroun", "AFGBank Sénégal", "AFGBank Mali"];

export default function UserModal({ user, onClose, onSave }) {
  const [showPassword, setShowPassword] = useState(false);
  const { langue } = useAppSettings();
  const t = T[langue] || T.fr;

  const [form, setForm] = useState({
    prenom:   user?.prenom   || "",
    nom:      user?.nom      || "",
    email:    user?.email    || "",
    password: "",
    role:     user?.role     || "",
    agence:   user?.agence   || "",
    filiale:  user?.filiale  || "",
    actif:    user?.actif    ?? true,
  });

  const set = k => e => setForm(p => ({ ...p, [k]: e.target.value }));
  const isClient = form.role === "Client";

  const submit = () => {
    if (!form.prenom || !form.nom || !form.email || !form.role) return;
    if (!user?.id && !form.password) return;
    onSave({ ...user, ...form, id: user?.id || Date.now() });
  };

  const inp = "w-full border border-gray-200 dark:border-gray-600 rounded-xl px-3 py-2.5 text-sm bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:bg-white dark:focus:bg-gray-600 outline-none transition-colors";

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden transition-colors">

        {/* Header */}
        <div className="bg-blue-900 px-5 py-4 flex justify-between items-center">
          <h2 className="font-semibold text-white">
            {user?.id ? t.titleEdit : t.titleAdd}
          </h2>
          <button onClick={onClose} className="text-blue-200 hover:text-white text-xl leading-none transition-colors">✕</button>
        </div>

        {/* Body */}
        <div className="p-5 space-y-3">
          <div className="grid grid-cols-2 gap-2">
            <input placeholder={t.firstNamePlaceholder} value={form.prenom} onChange={set("prenom")} className={inp} />
            <input placeholder={t.lastNamePlaceholder}  value={form.nom}    onChange={set("nom")}    className={inp} />
          </div>

          <input placeholder={t.emailPlaceholder} type="email" value={form.email} onChange={set("email")} className={inp} />

          {!user?.id && (
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder={t.passwordPlaceholder}
                value={form.password}
                onChange={set("password")}
                className={`${inp} pr-10`}
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          )}

          <select value={form.role} onChange={set("role")} className={inp}>
            <option value="">{t.rolePlaceholder}</option>
            {ROLES.map(r => <option key={r}>{r}</option>)}
          </select>

          {isClient && (
            <div className="grid grid-cols-2 gap-2">
              <select value={form.agence}  onChange={set("agence")}  className={inp}>
                <option value="">{t.agencePlaceholder}</option>
                {AGENCES.map(a => <option key={a}>{a}</option>)}
              </select>
              <select value={form.filiale} onChange={set("filiale")} className={inp}>
                <option value="">{t.filialePlaceholder}</option>
                {FILIALES.map(f => <option key={f}>{f}</option>)}
              </select>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-4 flex justify-end gap-2 border-t border-gray-100 dark:border-gray-700 transition-colors">
          <button onClick={onClose} className="px-4 py-2 rounded-xl text-sm text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            {t.cancel}
          </button>
          <button onClick={submit} className="px-4 py-2 rounded-xl text-sm bg-blue-900 text-white hover:bg-blue-800 transition-colors">
            {user?.id ? t.edit : t.add}
          </button>
        </div>

      </div>
    </div>
  );
}
