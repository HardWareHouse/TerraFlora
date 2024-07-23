import { connection } from "./dataBase.js";
import Adresse from './Adresse.js';
import Categorie from './Categorie.js';
import Contact from "./Contact.js";
import Facture from './Facture.js';
import DemandeRGPD from './DemandeRGPD.js';
import MethodePaiement from './MethodePaiement.js';
import Paiement from './Paiement.js';
import Panier from './Panier.js';
import Image from './Image.js';
import Produit from './Produit.js';
import Promotion from './Promotion.js';
import User from './User.js';
import Commande from './Commande.js';
import Panier_Produits from "./Panier_Produits.js";
import DeletedUser from "./DeletedUser.js";

const db = {
  connection,
  Adresse,
  Categorie,
  Contact,
  DeletedUser,
  Facture,
  DemandeRGPD,
  MethodePaiement,
  Paiement,
  Panier,
  Image,
  Produit,
  Promotion,
  User,
  Commande,
  Panier_Produits
};

import './associations.js';

export default db;