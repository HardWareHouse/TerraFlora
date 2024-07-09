import User from './User.js';
import Facture from './Facture.js';
import Commande from './Commande.js';
import Panier from './Panier.js';
import Promotion from './Promotion.js';
import Categorie from './Categorie.js';
import Produit from './Produit.js';
import DemandeRGPD from './DemandeRGPD.js';
import Paiement from './Paiement.js';
import Adresse from './Adresse.js';
import MethodePaiement from './MethodePaiement.js';
import Image from './Image.js';

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

Produit.hasMany(Image, { foreignKey: 'produitId' });
Image.belongsTo(Produit, { foreignKey: 'produitId' });

// Facture associations
Facture.belongsTo(User, { foreignKey: 'userId', targetKey: 'id' });

// Paiement associations
MethodePaiement.hasMany(Paiement, { foreignKey: 'methodePaiementId', sourceKey: 'id' });
Paiement.belongsTo(MethodePaiement, { foreignKey: 'methodePaiementId', targetKey: 'id' });