import User from './modelsBDD/User.js';
import Facture from './modelsBDD/Facture.js';
import Commande from './modelsBDD/Commande.js';
import Panier from './modelsBDD/Panier.js';
import Promotion from './modelsBDD/Promotion.js';
import Categorie from './modelsBDD/Categorie.js';
import Produit from './modelsBDD/Produit.js';
import DemandeRGPD from './modelsBDD/DemandeRGPD.js';
import Paiement from './modelsBDD/Paiement.js';

// Associations
User.hasMany(Facture, { foreignKey: 'userId' });
Facture.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(Commande, { foreignKey: 'userId' });
Commande.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(Panier, { foreignKey: 'userId' });
Panier.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(DemandeRGPD, { foreignKey: 'userId' });
DemandeRGPD.belongsTo(User, { foreignKey: 'userId' });

Panier.hasMany(Commande, { foreignKey: 'panierId' });
Commande.belongsTo(Panier, { foreignKey: 'panierId' });

Panier.belongsToMany(Produit, { through: 'Panier_Produits', foreignKey: 'panierId' });
Produit.belongsToMany(Panier, { through: 'Panier_Produits', foreignKey: 'produitId' });

Produit.hasMany(Promotion, { foreignKey: 'produitId' });
Promotion.belongsTo(Produit, { foreignKey: 'produitId' });

Categorie.hasMany(Produit, { foreignKey: 'categorieId' });
Produit.belongsTo(Categorie, { foreignKey: 'categorieId' });

Produit.hasMany(Commande, { foreignKey: 'produitId' });
Commande.belongsTo(Produit, { foreignKey: 'produitId' });

Facture.belongsTo(User, { foreignKey: 'clientId' });
Facture.belongsTo(User, { foreignKey: 'userId' });

Paiement.belongsTo(Produit, { foreignKey: 'produitId' });
Produit.hasMany(Paiement, { foreignKey: 'produitId' });