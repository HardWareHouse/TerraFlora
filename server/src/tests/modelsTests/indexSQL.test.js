import db from '../../modelsSQL/indexSQL.js';

jest.mock('../../modelsSQL/dataBase.js', () => ({
  connection: {},
}));

// Reste du code inchangé...

jest.mock('../../modelsSQL/Adresse.js', () => ({}));
jest.mock('../../modelsSQL/Categorie.js', () => ({}));
jest.mock('../../modelsSQL/Contact.js', () => ({}));
jest.mock('../../modelsSQL/Facture.js', () => ({}));
jest.mock('../../modelsSQL/DemandeRGPD.js', () => ({}));
jest.mock('../../modelsSQL/MethodePaiement.js', () => ({}));
jest.mock('../../modelsSQL/Paiement.js', () => ({}));
jest.mock('../../modelsSQL/Panier.js', () => ({}));
jest.mock('../../modelsSQL/Image.js', () => ({}));
jest.mock('../../modelsSQL/Produit.js', () => ({}));
jest.mock('../../modelsSQL/Promotion.js', () => ({}));
jest.mock('../../modelsSQL/User.js', () => ({}));
jest.mock('../../modelsSQL/Commande.js', () => ({}));
jest.mock('../../modelsSQL/Panier_Produits.js', () => ({}));
jest.mock('../../modelsSQL/DeletedUser.js', () => ({}));
jest.mock('../../modelsSQL/associations.js', () => ({}));

describe('indexSQL', () => {
  it('should export the db object with all models', () => {
    expect(db).toHaveProperty('connection');
    expect(db).toHaveProperty('Adresse');
    expect(db).toHaveProperty('Categorie');
    expect(db).toHaveProperty('Contact');
    expect(db).toHaveProperty('DeletedUser');
    expect(db).toHaveProperty('Facture');
    expect(db).toHaveProperty('DemandeRGPD');
    expect(db).toHaveProperty('MethodePaiement');
    expect(db).toHaveProperty('Paiement');
    expect(db).toHaveProperty('Panier');
    expect(db).toHaveProperty('Image');
    expect(db).toHaveProperty('Produit');
    expect(db).toHaveProperty('Promotion');
    expect(db).toHaveProperty('User');
    expect(db).toHaveProperty('Commande');
    expect(db).toHaveProperty('Panier_Produits');
  });
});