import React, { useState, useRef } from 'react';
import { PaperClipIcon, XMarkIcon, ArrowLeftOnRectangleIcon } from '@heroicons/react/24/outline'; 
import { useAuth } from "../contexts/AuthContext"; // Import du contexte
import { useLocation } from "wouter"; // Import pour la redirection

const ClientIncidentForm = () => {
  const { logout } = useAuth(); // On récupère la fonction logout
  const [, navigate] = useLocation(); // On récupère la fonction de navigation

  const [formData, setFormData] = useState({
    type: '',
    agence: '',
    categorie: '',
    priorite: '',
    description: '',
  });
  
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);

  // Fonction de déconnexion
  const handleLogout = () => {
    logout(); // Vide le localStorage et l'état user
    navigate("/"); // Redirige vers la page de login
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const removeFile = () => {
    setFile(null);
    fileInputRef.current.value = "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('type', formData.type);
    data.append('agence', formData.agence);
    data.append('description', formData.description);
    if (file) data.append('file', file);

    console.log("Données prêtes:", Object.fromEntries(data));
    alert("Incident signalé avec succès (simulation)");
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-sm border border-gray-200 p-6 mt-10">
      {/* HEADER AVEC BOUTON DÉCONNEXION */}
      <div className="flex items-center justify-between mb-6 border-b pb-4">
        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          <span className="text-red-500">⚠️</span> Signaler un Incident
        </h2>
        
        <button 
          onClick={handleLogout}
          className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-red-600 transition-colors"
        >
          <ArrowLeftOnRectangleIcon className="w-5 h-5" />
          Déconnexion
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Titre *</label>
            <input
              type="text"
              name="type"
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Panne réseau, Problème matériel..."
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Agence *</label>
            <select
              name="agence"
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
              onChange={handleChange}
            >
              <option value="">Sélectionner une agence</option>
              <option value="douala">Agence Plateau</option>
              <option value="yaounde">Agence Yopougon</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Type *</label>
            <select name="categorie" className="w-full p-2 border border-gray-300 rounded-md shadow-sm" onChange={handleChange}>
              <option>Sélectionner un type</option>
              <option>Autre</option>
              <option>Problème Display</option>
              <option>Problème prise de ticket</option>
              <option>Problème Counter</option>
              <option>Mauvaise configuration de l'interface organisation/agence</option>
              <option>Problème d'appel</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Priorité *</label>
            <select name="priorite" className="w-full p-2 border border-gray-300 rounded-md shadow-sm" onChange={handleChange}>
              <option>Sélectionner une priorité</option>
              <option>Faible</option>
              <option>Moyenne</option>
              <option>Critique</option>
            </select>
          </div>
        </div>

        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
          <textarea
            name="description"
            required
            rows="4"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none pb-12"
            onChange={handleChange}
          ></textarea>

          <div className="absolute bottom-2 left-2 flex items-center gap-2">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept=".jpg,.png,.pdf,.doc,.docx"
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current.click()}
              className="flex items-center gap-1 text-sm bg-gray-100 hover:bg-gray-200 text-gray-600 px-3 py-1 rounded-full transition"
            >
              <PaperClipIcon className="w-4 h-4" />
              {file ? "Changer le fichier" : "Joindre un fichier"}
            </button>
            
            {file && (
              <span className="text-xs text-blue-600 flex items-center gap-1 bg-blue-50 px-2 py-1 rounded">
                {file.name}
                <XMarkIcon className="w-3 h-3 cursor-pointer" onClick={removeFile} />
              </span>
            )}
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            type="button"
            className="px-6 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition"
          >
            Annuler
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition font-semibold"
          >
            🔴 Signaler
          </button>
        </div>
      </form>
    </div>
  );
};

export default ClientIncidentForm;