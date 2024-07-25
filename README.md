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

 Coté Front:
 - Totalité du front du Dashboard User :
 - TOUTE LA PAGE, CES COMPOSANT (sauf la barre de recherche Commande et Facture) et leurs gestion cela inclus :
  - Menu de navigation, les tableaux, formulaires...etc

- Totalité du front du Dashboard Admin :
 - TOUTE LA PAGE, CES COMPOSANTS et leurs gestion :
  - Menu de navigation avec rédirection vers les deux pages (ces pages ne sont pas faite par moi), les tableaux, formulaires, Statistiques...etc

 - Bouton de supression ouvrant une modal de confirmation réutilisable (deleteButton) 
 - Modal d'édition des ressouces s'adaptant dynamiquement au champs et au requete à soumettre (editResourceModal)
 - Grosse partie de la gestion du store pinia auth
 - Création et paramétrage du l'objet axios instance avec inclusion dynamique du token si présent et middleware de gestion des erreurs retourné par l'API
 - Gestion des accèss dans le router 
 - Tout les composables (sauf useForm)
 - Gestion et sécurisation des rôles Front
 - Création du composant utilisé dans la page Comptable

 Côté back:

 Totalité du back du Dashboard User :
 - Tableau de bord 
 - Historique de commande avec rediection vers la page détails commande 
 - Historique Facture avec possibilité de télechargement de la Facture 
 - CRUD Adresse du User
 - Formulaire d'édition du User
 - Formaulaire de gestion des préferences mails 
 - Formualaire de Contact

 Totalité du back du Dashboard Admin :
 - Gestion des ressources (Suppression et/ou edition) avec modal d'édition et bouton de supression avec modal de confirmation
 - Statistique (donné en dur)
 - Gestion des contact avec modal pour soumettre une réponse

 - CRUD de TOUTE les ressouces (sauf Produit et Stripe) côté SQL et Mongo
 - Mise en place de la séparation et création des controllers (80%) - services (90%) - helpers (100%)
 - Sécurisation de 85 % des routes
 - Création de tout les middlewares (sauf uploadMiddleware)
 - Gestion et sécurisation des rôles Back
 - Création de tout les models Mongo (Sauf Produit) 
 - Création de tout les fichiers d'insertionMongo (Sauf Produit)
 - 100% de la Dénormalisation automatique SQL -> Mongo au lancement du serveur avec mise à jour et/ou création des données 
 - Création de la commande qui permet de lancer la dénormalisation SQL -> Mongo runDataDenormalization
 - 100% de l'initialisation dynamique des models dans la base au lancement du serveur (Migration Mongo)
 - Gestion du Token
 - Formulaire de contact et réponse contact
 - Gestion des préferences 
 - Ajout de Cors et Helmet (Avec Aria)

Autres(Front et Back):
 - Création de commande après achat Stripe
 - Création auto de Facture via la commande
 - Supression de User avec Anonymisation auto

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
