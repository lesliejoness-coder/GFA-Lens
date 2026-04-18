// ── Constantes ────────────────────────────────────────────────────
export const PRIORITES = ["Faible", "Moyen", "Critique"];

export const STATUTS = ["En attente", "En cours", "Terminé"];

export const AGENTS = [
  "Jean Kouassi", "Marie Dupont", "Paul Atangana",
  "Fatou Diallo", "Sébastien Mbarga",
];

export const AGENCES = [
  "Agence Plateau", "Agence Bonapriso", "Agence Centre-ville",
  "Agence Yopougon", "Agence Akwa",
];

export const FILIALES = [
  "AFGBank CI", "AFGBank Cameroun", "AFGBank Sénégal", "AFGBank Mali",
];

// ── Données initiales ─────────────────────────────────────────────
export const INITIAL_INCIDENTS = [
  {
    id: 1,
    titre: "Connexion impossible à la plateforme GFA",
    description: "Les utilisateurs de l'agence ne peuvent plus se connecter depuis ce matin.",
    agence: "Agence Plateau",
    priorite: "Critique",
    statut: "En cours",
    dateDeclaration: "2025-03-10",
    dateResolution: null,
    agent: "Jean Kouassi",
    transfere: false,
    pieceJointe: null,
    pieceJointeUrl: null,
    historique: [
      { date: "2025-03-10 08:30", action: "Incident déclaré", ancienStatut: null, nouveauStatut: "En attente" },
      { date: "2025-03-10 09:15", action: "Affecté à Jean Kouassi", ancienStatut: "En attente", nouveauStatut: "En cours" },
    ],
  },
  {
    id: 2,
    titre: "Lenteur sur les transactions",
    description: "Les transactions prennent plus de 30 secondes à s'exécuter.",
    agence: "Agence Bonapriso",
    priorite: "Moyen",
    statut: "Terminé",
    dateDeclaration: "2025-03-05",
    dateResolution: "2025-03-07",
    agent: "Marie Dupont",
    transfere: false,
    pieceJointe: null,
    pieceJointeUrl: null,
    historique: [
      { date: "2025-03-05 10:00", action: "Incident déclaré", ancienStatut: null, nouveauStatut: "En attente" },
      { date: "2025-03-05 14:00", action: "Pris en charge", ancienStatut: "En attente", nouveauStatut: "En cours" },
      { date: "2025-03-07 11:30", action: "Problème résolu", ancienStatut: "En cours", nouveauStatut: "Terminé" },
    ],
  },
  {
    id: 3,
    titre: "Erreur d'impression des reçus",
    description: "Le module d'impression ne génère pas les reçus correctement.",
    agence: "Agence Centre-ville",
    priorite: "Faible",
    statut: "En attente",
    dateDeclaration: "2025-03-12",
    dateResolution: null,
    agent: null,
    transfere: false,
    pieceJointe: null,
    pieceJointeUrl: null,
    historique: [
      { date: "2025-03-12 09:00", action: "Incident déclaré", ancienStatut: null, nouveauStatut: "En attente" },
    ],
  },
  {
    id: 4,
    titre: "Module de rapport inaccessible",
    description: "La page des rapports affiche une erreur 500 depuis la mise à jour.",
    agence: "Agence Yopougon",
    priorite: "Critique",
    statut: "En attente",
    dateDeclaration: "2025-03-13",
    dateResolution: null,
    agent: null,
    transfere: false,
    pieceJointe: null,
    pieceJointeUrl: null,
    historique: [
      { date: "2025-03-13 16:45", action: "Incident déclaré", ancienStatut: null, nouveauStatut: "En attente" },
    ],
  },
];
