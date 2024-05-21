import User from './modelsBDD/User.js';
import Facture from './modelsBDD/Facture.js';
import Commande from './modelsBDD/Commande.js';
import Panier from './modelsBDD/Panier.js';
import Promotion from './modelsBDD/Promotion.js';
import Categorie from './modelsBDD/Categorie.js';
import Produit from './modelsBDD/Produit.js';
import DemandeRGPD from './modelsBDD/DemandeRGPD.js';
import Paiement from './modelsBDD/Paiement.js';
import Adresse from './modelsBDD/Adresse.js';
import MethodePaiement from './modelsBDD/MethodePaiement.js';

// Associations

// User associations
User.hasMany(Facture, { foreignKey: 'userId', sourceKey: 'id' });
Facture.belongsTo(User, { foreignKey: 'userId', targetKey: 'id' });

User.hasMany(Commande, { foreignKey: 'userId', sourceKey: 'id' });
Commande.belongsTo(User, { foreignKey: 'userId', targetKey: 'id' });

User.hasOne(Panier, { foreignKey: 'userId', sourceKey: 'id' });
Panier.belongsTo(User, { foreignKey: 'userId', targetKey: 'id' });

User.hasMany(DemandeRGPD, { foreignKey: 'userId', sourceKey: 'id' });
DemandeRGPD.belongsTo(User, { foreignKey: 'userId', targetKey: 'id' });

User.hasMany(Adresse, { foreignKey: 'userId', sourceKey: 'id' });
Adresse.belongsTo(User, { foreignKey: 'userId', targetKey: 'id' });

// Panier associations
Panier.hasOne(Commande, { foreignKey: 'panierId', sourceKey: 'id' });
Commande.belongsTo(Panier, { foreignKey: 'panierId', targetKey: 'id' });

Panier.belongsToMany(Produit, { through: 'Panier_Produits', foreignKey: 'panierId', sourceKey: 'id' });
Produit.belongsToMany(Panier, { through: 'Panier_Produits', foreignKey: 'produitId', sourceKey: 'id' });

// Produit associations
Produit.hasMany(Promotion, { foreignKey: 'produitId', sourceKey: 'id' });
Promotion.belongsTo(Produit, { foreignKey: 'produitId', targetKey: 'id' });

Categorie.hasMany(Produit, { foreignKey: 'categorieId', sourceKey: 'id' });
Produit.belongsTo(Categorie, { foreignKey: 'categorieId', targetKey: 'id' });

Produit.hasMany(Paiement, { foreignKey: 'produitId', sourceKey: 'id' });
Paiement.belongsTo(Produit, { foreignKey: 'produitId', targetKey: 'id' });

// Facture associations
Facture.belongsTo(User, { foreignKey: 'userId', targetKey: 'id' });

// Paiement associations
MethodePaiement.hasMany(Paiement, { foreignKey: 'methodePaiementId', sourceKey: 'id' });
Paiement.belongsTo(MethodePaiement, { foreignKey: 'methodePaiementId', targetKey: 'id' });