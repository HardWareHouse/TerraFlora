# Terra Flora

### Description du projet

Terra Flora (Site web e-commerce de vente de fleurs) - Challenge Stack semestriel : VueJS avec TypeScript / MongoDB, NodeJS / Droit RGPD

### Lancement du projet

- Exécuter `docker compose build --pull --no-cache` pour construire les images
- Lancer `docker compose up -d` (sans les logs) / `docker compose up` (avec les logs)
- Ouvrir le navigateur sous l'adresse `https://localhost:5173`

### Membres du groupe

Sami ASSIAKH - GitHub : iSaaMz - https://github.com/iSaaMz

Jay BURY - GitHub : buryj97 - https://github.com/buryj97

Aria AMAN - GitHub : AriaAman - https://github.com/AriaAman

Moussa Seydou TRAORE - GitHub : MoussaST - https://github.com/MoussaST

### Repository du projet

Lien : https://github.com/LlamasScripters/TerraFlora

# Tâches réalisées

### Attribution des tâches :

### Sami :

- Recherche de produits :
- Recherche utilisateur par nom, description de produit et via URL avec paramètres GET
- Recherche facettée par nom, catégorie, marque, couleur, taille avec prix minimum et maximum, avec facettes incluses dans l'URL pour partage de recherche

- Gestion d'alerte par mail :
- Envoi d'alerte par mail lors de l'ajout d'un nouveau produit dans une catégorie, d'un restock de produit, d'un changement de prix, inscription à la newsletter et personnalisation des alertes selon les préférences de l'utilisateur

- Panier avec système de réservation :
- Réservation des produits dans le panier pour une durée de 15 minutes

- Gestion des stocks :
- Création d'une page pour les store keepers, avec CRUD des produits, création d'un CRON permettant de vérifier le niveau des stocks qui alertent en cas de stock faible ou rupture de stock
- Graphique d'évolution des stocks configurable par date de début et de fin

- Historique de commandes et factures :
- Ajout d'une barre de recherche permettant de rechercher par numéro de commandes/factures

### Aria :

### Moussa :

- Dashboard User :
- Interface
- CRUD de TOUTE les ressources (SQL et Mongo)
- Les Middlewares Front et Back
- Services
- Helpers
- Architecture controllers - services - helpers
- Gestion des rôles Front et Back
- Dénormalisation SQL -> Mongo
- Migration Mongo
- Paramétrage des requêtes avec Axios
- Gestion du Token
- Formulaire de contact
- Gestion des préférences

- Dashboard Admin :
- Gestion des ressources
- Interface Statistiques
- Gestion du formulaire de contact
- Suppression User
- Anonymisation User

- Création de Commande après achat Stripe
- Création auto de Facture via la commande
- Téléchargement Facture depuis dashboard

### Jay :

- Intégration de l'API Stripe
  - Récupérer les produits du panier et créer une session Checkout
  - Liens de paiements
  - Remboursements avec facture
  - Modification du prix de produit synchronisée (BDD/Stripe)
- Récupération des paiements et factures (admin dashboard)
- Suppression de compte
  - Anonymisation de données lors de la suppression
- RGPD
  - Rédaction des documents RGPD:
    - Mentions légales
    - Politique de confidentialité
    - CGU/CGV
  - Création d’un formulaire de demande d’exercice de droits
  - Intégration d’un bandeau de cookies
- Front: Page de succès après un paiement, formulaire de contact, création de la page détails de produit
- Tests de userService
