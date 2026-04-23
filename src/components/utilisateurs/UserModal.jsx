import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const ROLES = ["Admin", "Employé", "Client"];

const AGENCES = [
  "Agence Plateau",
  "Agence Bonapriso",
  "Agence Centre-ville",
  "Agence Yopougon",
  "Agence Akwa",
];

const FILIALES = [
  "AFGBank CI",
  "AFGBank Cameroun",
  "AFGBank Sénégal",
  "AFGBank Mali",
];

const input =
  "w-full border rounded-lg px-3 py-2 text-sm bg-gray-50 focus:ring-2 focus:ring-blue-400 outline-none";

export default function UserModal({ user, onClose, onSave }) {
  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    prenom: user?.prenom || "",
    nom: user?.nom || "",
    email: user?.email || "",
    password: "",
    role: user?.role || "",
    agence: user?.agence || "",
    filiale: user?.filiale || "",
    actif: user?.actif ?? true,
  });

  const set = (k) => (e) =>
    setForm((p) => ({ ...p, [k]: e.target.value }));

  const isClient = form.role === "Client";

  const submit = () => {
    if (!form.prenom || !form.nom || !form.email || !form.role) return;
    if (!user?.id && !form.password) return;

    onSave({
      ...user,
      ...form,
      id: user?.id || Date.now(),
    });
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4">

      <div className="bg-white w-full max-w-md rounded-xl shadow-lg overflow-hidden">

        {/* HEADER */}
        <div className="bg-blue-900 text-white px-5 py-3 flex justify-between items-center">
          <h2>
            {user?.id ? "Modifier utilisateur" : "Ajouter utilisateur"}
          </h2>
          <button onClick={onClose}>✕</button>
        </div>

        {/* BODY */}
        <div className="p-5 space-y-3">

          {/* prénom + nom */}
          <div className="grid grid-cols-2 gap-2">
            <input
              placeholder="Prénom"
              value={form.prenom}
              onChange={set("prenom")}
              className={input}
            />
            <input
              placeholder="Nom"
              value={form.nom}
              onChange={set("nom")}
              className={input}
            />
          </div>

          {/* email */}
          <input
            placeholder="Email"
            value={form.email}
            onChange={set("email")}
            className={input}
          />

          {/* mot de passe avec icône */}
          {!user?.id && (
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Mot de passe"
                value={form.password}
                onChange={set("password")}
                className={`${input} pr-10`}
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          )}

          {/* rôle */}
          <select
            value={form.role}
            onChange={set("role")}
            className={input}
          >
            <option value="">-- Rôle --</option>
            {ROLES.map((r) => (
              <option key={r}>{r}</option>
            ))}
          </select>

          {/* agence + filiale uniquement CLIENT */}
          {isClient && (
            <div className="grid grid-cols-2 gap-2">

              <select
                value={form.agence}
                onChange={set("agence")}
                className={input}
              >
                <option value="">Agence</option>
                {AGENCES.map((a) => (
                  <option key={a}>{a}</option>
                ))}
              </select>

              <select
                value={form.filiale}
                onChange={set("filiale")}
                className={input}
              >
                <option value="">Filiale</option>
                {FILIALES.map((f) => (
                  <option key={f}>{f}</option>
                ))}
              </select>

            </div>
          )}

        </div>

        {/* FOOTER */}
        <div className="p-4 flex justify-end gap-2 border-t">

          <button onClick={onClose}>
            Annuler
          </button>

          <button
            onClick={submit}
            className="bg-blue-900 text-white px-4 py-2 rounded-lg"
          >
            {user?.id ? "Modifier" : "Ajouter"}
          </button>

        </div>

      </div>

    </div>
  );
}