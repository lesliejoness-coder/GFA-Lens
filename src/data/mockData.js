export const mockFiliales = [
  {
    id: 1, nom: "AFGBank Côte d'Ivoire", pays: "Côte d'Ivoire", ville: "Abidjan",
    parentId: null, statut: "Active", description: "Filiale principale en Côte d'Ivoire",
    agences: [
      { id: 101, nom: "Agence Plateau", localisation: "Abidjan - Plateau", type: "Principale", statut: "Active", telephone: "+225 27 20 000 001", email: "plateau@afgbank.ci", responsable: "M. Kouassi",
        sousAgences: [
          { id: 1011, nom: "Guichet Cocody", localisation: "Abidjan - Cocody", statut: "Active" },
          { id: 1012, nom: "Guichet Marcory", localisation: "Abidjan - Marcory", statut: "Active" },
        ] },
      { id: 102, nom: "Agence Yopougon", localisation: "Abidjan - Yopougon", type: "Secondaire", statut: "Maintenance", telephone: "+225 27 20 000 002", email: "yopougon@afgbank.ci", responsable: "Mme. Diallo", sousAgences: [] },
    ],
    sousFiliales: [
      { id: 11, nom: "AFGBank Douala", pays: "Cameroun", ville: "Douala", parentId: 1, statut: "Active", description: "Sous-filiale de Douala",
        agences: [
          { id: 111, nom: "Agence Bonapriso", localisation: "Douala - Bonapriso", type: "Principale", statut: "Active", telephone: "+237 233 000 111", email: "bonapriso@afgbank.cm", responsable: "M. Mbarga",
            sousAgences: [
              { id: 1111, nom: "Guichet Akwa", localisation: "Douala - Akwa", statut: "Active" },
              { id: 1112, nom: "Guichet Bonamoussadi", localisation: "Douala - Bonamoussadi", statut: "Active" },
            ] },
          { id: 112, nom: "Agence Bali", localisation: "Douala - Bali", type: "Secondaire", statut: "Active", telephone: "+237 233 000 112", email: "bali@afgbank.cm", responsable: "Mme. Tchamba", sousAgences: [] },
        ],
        sousFiliales: [] },
    ],
  },
  {
    id: 2, nom: "AFGBank Cameroun", pays: "Cameroun", ville: "Yaoundé",
    parentId: null, statut: "Active", description: "Filiale principale au Cameroun",
    agences: [
      { id: 201, nom: "Agence Centre-ville", localisation: "Yaoundé - Centre", type: "Principale", statut: "Active", telephone: "+237 222 000 201", email: "centre@afgbank.cm", responsable: "M. Nkomo",
        sousAgences: [
          { id: 2011, nom: "Guichet Bastos", localisation: "Yaoundé - Bastos", statut: "Active" },
          { id: 2012, nom: "Guichet Mvan", localisation: "Yaoundé - Mvan", statut: "Maintenance" },
        ] },
      { id: 202, nom: "Agence Nlongkak", localisation: "Yaoundé - Nlongkak", type: "Secondaire", statut: "Bloquée", telephone: "+237 222 000 202", email: "nlongkak@afgbank.cm", responsable: "M. Ekani", sousAgences: [] },
    ],
    sousFiliales: [
      { id: 21, nom: "AFGBank Garoua", pays: "Cameroun", ville: "Garoua", parentId: 2, statut: "Active", description: "Sous-filiale Nord Cameroun",
        agences: [
          { id: 211, nom: "Agence Garoua Centre", localisation: "Garoua - Centre", type: "Principale", statut: "Active", telephone: "+237 222 000 211", email: "garoua@afgbank.cm", responsable: "M. Hamidou", sousAgences: [] },
        ],
        sousFiliales: [] },
    ],
  },
  {
    id: 3, nom: "AFGBank Sénégal", pays: "Sénégal", ville: "Dakar",
    parentId: null, statut: "Inactive", description: "Filiale en cours d'installation",
    agences: [], sousFiliales: [],
  },
];

export const mockRapports = [
  { id: 1, titre: "Rapport mensuel - Mars 2025", type: "Mensuel", dateGeneration: "2025-04-01", filiale: "AFGBank Cameroun", agence: "Toutes", incidents: 12, disponibilite: "98.2%", statut: "Généré", generePar: "Leslie Kamdem", taille: "2.4 MB", formats: ["PDF", "Excel"] },
  { id: 2, titre: "Rapport hebdomadaire - Semaine 13", type: "Hebdomadaire", dateGeneration: "2025-03-30", filiale: "AFGBank Douala", agence: "Agence Bonapriso", incidents: 3, disponibilite: "99.1%", statut: "Généré", generePar: "Leslie Kamdem", taille: "1.1 MB", formats: ["PDF"] },
  { id: 3, titre: "Rapport incident critique - Garoua", type: "Incident", dateGeneration: "2025-03-28", filiale: "AFGBank Garoua", agence: "Agence Garoua Centre", incidents: 1, disponibilite: "72.0%", statut: "En attente", generePar: "System", taille: "0.8 MB", formats: ["PDF"] },
  { id: 4, titre: "Rapport trimestriel - Q1 2025", type: "Trimestriel", dateGeneration: "2025-03-31", filiale: "Toutes", agence: "Toutes", incidents: 38, disponibilite: "96.8%", statut: "Généré", generePar: "Leslie Kamdem", taille: "5.7 MB", formats: ["PDF", "Excel", "CSV"] },
  { id: 5, titre: "Rapport audit sécurité - Q1 2025", type: "Audit", dateGeneration: "2025-04-02", filiale: "AFGBank CI", agence: "Toutes", incidents: 5, disponibilite: "97.5%", statut: "En cours", generePar: "Leslie Kamdem", taille: "—", formats: ["PDF"] },
  { id: 6, titre: "Rapport annuel 2024", type: "Annuel", dateGeneration: "2025-01-15", filiale: "Toutes", agence: "Toutes", incidents: 142, disponibilite: "97.1%", statut: "Généré", generePar: "Leslie Kamdem", taille: "12.3 MB", formats: ["PDF", "Excel"] },
];
