import { useState } from "react";

const PERMISSIONS = [
  "dashboard",
  "utilisateurs",
  "incidents",
  "rapports",
  "paramètres",
];

export default function RoleModal({ role, onClose, onSave }) {
  const [nom, setNom] = useState(role?.nom || "");
  const [permissions, setPermissions] = useState(role?.permissions || {});
  const [error, setError] = useState("");

  const toggle = (key) => {
    setPermissions((p) => ({ ...p, [key]: !p[key] }));
  };

  const submit = () => {
    if (!nom.trim()) {
      setError("Le nom du rôle est obligatoire");
      return;
    }

    onSave({
      ...role,
      id: role?.id || Date.now(),
      nom: nom.trim(),
      permissions,
    });
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-xl p-5 shadow-lg">

        <h2 className="text-lg font-bold mb-4">
          {role?.id ? "Modifier rôle" : "Ajouter rôle"}
        </h2>

        <div className="mb-3">
          <input
            value={nom}
            onChange={(e) => {
              setNom(e.target.value);
              setError("");
            }}
            className="w-full border p-2 rounded"
            placeholder="Nom du rôle"
          />

          {error && (
            <p className="text-red-500 text-xs mt-1">
              {error}
            </p>
          )}
        </div>

        <div className="space-y-2 mb-4">
          {PERMISSIONS.map((p) => (
            <label key={p} className="flex gap-2 items-center">
              <input
                type="checkbox"
                checked={!!permissions[p]}
                onChange={() => toggle(p)}
              />
              {p}
            </label>
          ))}
        </div>

        <div className="flex justify-end gap-2">
          <button onClick={onClose}>
            Annuler
          </button>

          <button
            onClick={submit}
            disabled={!nom.trim()}
            className={`px-3 py-1 rounded text-white ${
              !nom.trim()
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-900 hover:bg-blue-800"
            }`}
          >
            Enregistrer
          </button>
        </div>

      </div>
    </div>
  );
}