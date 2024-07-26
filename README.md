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

- Ajout de tables BDD pour les paiements, adresses, et méthodes de paiement
- Associations et modifications des tables de la base de données
- Recherche de produits :
- Recherche utilisateur par nom, description de produit et via URL avec paramètres GET
- Recherche facettée par nom, catégorie, marque, couleur, taille avec prix minimum et maximum, avec facettes incluses dans l'URL pour partage de recherche
- Mise en place du front de la boutique avec filtres, styles, vue grille et liste
- Pagination, breadcrumbs, et tri des produits
- Affichage des détails du produit avec gestion du panier
- Ajout des fonctionnalités de panier et de gestion des articles
- Développement des CRUD pour les produits et catégories
- Envoi d'alerte par mail lors de l'ajout d'un nouveau produit dans une catégorie, d'un restock de produit, d'un changement de prix, inscription à la newsletter et personnalisation des alertes selon les préférences de l'utilisateur
- Réservation des produits dans le panier pour une durée de 15 minutes
- Création d'une page pour les store keepers, avec CRUD des produits, création d'un CRON permettant de vérifier le niveau des stocks qui alertent en cas de stock faible ou rupture de stock
- Graphique d'évolution des stocks configurable avec filtrage par date de début et de fin
- Import d'images lors de l’ajout de produits
- Envoi d'alertes par email pour les produits en stock faible ou restockés
- Historique de commandes et factures :
- Ajout d'une barre de recherche permettant de rechercher par numéro de commandes/factures dans le dashboard utilisateur
- Correction des erreurs de pagination, ajout multiples de produits, et affichage d'images
- Validation de la quantité de produits en stock
- Limitation de l’ajout de produits au panier selon le stock disponible
- Vidage du panier après un paiement réussi
- Configuration des en-têtes CORS pour le chargement des images
- Système de toast pour l’ajout de produits au panier
- Personnalisation des pages d'erreur et de paiement annulé/refusé



### Aria :

- Toute la partie Auth FRONT et BACK
- Responsive du site 
- Envoi d'alerte par mail lors de l'ajout d'un nouveau produit dans une catégorie, d'un restock de produit, d'un changement de prix, inscription à la newsletter et personnalisation des alertes selon les préférences de l'utilisateur
- Réservation des produits dans le panier pour une durée de 15 minutes avec un cron
- Mise en production(Via digital ocean, gestion de lien via OVH) du site
- Configuration de BREVO et des template pour l'envoie de mail
- Intégration API LAPOSTE
- sécurisation du VPS
- Test Unitaires
- Création page COMPTABLE
- Création du composant DATABLE
- Initialisation du PROJET (docker, MongoDB, Sequalize)
- Création de la BDD 
- CRUD et sécurisation PRODUIT
- Creation de la migration des tables SQL (sequalize)

### Moussa :

 Coté Front:
 - Totalité du front du Dashboard User :
 - TOUTE LA PAGE, CES COMPOSANT (sauf la barre de recherche Commande et Facture) et leurs gestion cela inclus :
  - Menu de navigation, les tableaux, formulaires...etc

- Totalité du front du Dashboard Admin :
 - TOUTE LA PAGE, CES COMPOSANTS et leurs gestion :
  - Menu de navigation avec rédirection vers les deux pages (ces pages ne sont pas faite par moi), les tableaux, formulaires, Statistiques...etc

 - Bouton de suppression ouvrant une modal de confirmation réutilisable (deleteButton) 
 - Modal d'édition des ressouces s'adaptant dynamiquement au champs et au requete à soumettre (editResourceModal)
 - Grosse partie de la gestion du store pinia auth
 - Création et paramétrage de l'objet axios instance avec inclusion dynamique du token si présent et middleware de gestion des erreurs retourné par l'API
 - Gestion des accèss dans le router 
 - Tout les composables (sauf useForm)
 - Gestion et sécurisation des rôles Front
 - Création du composant utilisé dans la page Comptable

 Côté back:

 Totalité du back du Dashboard User :
 - Tableau de bord 
 - Historique de commande avec redirection vers la page détails commande 
 - Historique Facture avec possibilité de télechargement de la Facture 
 - CRUD Adresse du User
 - Formulaire d'édition du User
 - Formulaire de gestion des préferences mails 
 - Formalaire de Contact

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

Autres (Front et Back):
 - Création de commande après achat Stripe
 - Création auto de Facture via la commande
 - Suppression de User avec Anonymisation auto

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
