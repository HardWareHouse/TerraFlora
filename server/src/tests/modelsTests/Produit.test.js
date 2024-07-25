import { DataTypes } from 'sequelize';

const mockDefine = jest.fn().mockReturnValue({});

jest.mock('../../modelsSQL/dataBase.js', () => ({
  connection: {
    define: mockDefine,
  },
}));

jest.mock('../../modelsSQL/Produit.js', () => {
  jest.requireActual('../../modelsSQL/Produit.js');
  return mockDefine.mock.calls[0][1];
});

const modelDefinition = require('../../modelsSQL/Produit.js');

describe('Produit Model', () => {
  it('should define the Produit model correctly', () => {
    expect(mockDefine).toHaveBeenCalledWith(
      'Produit',
      expect.objectContaining({
        id: expect.objectContaining({
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        }),
        nom: expect.objectContaining({
          type: DataTypes.STRING,
          allowNull: false,
        }),
        description: expect.objectContaining({
          type: DataTypes.TEXT,
          allowNull: true,
        }),
        prix: expect.objectContaining({
          type: DataTypes.FLOAT,
          allowNull: false,
        }),
        stock: expect.objectContaining({
          type: DataTypes.INTEGER,
          allowNull: false,
        }),
        stockThreshold: expect.objectContaining({
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 5,
        }),
        marque: expect.objectContaining({
          type: DataTypes.STRING,
          allowNull: false,
        }),
        couleur: expect.objectContaining({
          type: DataTypes.STRING,
          allowNull: false,
        }),
        taille: expect.objectContaining({
          type: DataTypes.STRING,
          allowNull: false,
        }),
        isPromotion: expect.objectContaining({
          type: DataTypes.BOOLEAN,
          defaultValue: false,
        }),
        pourcentagePromotion: expect.objectContaining({
          type: DataTypes.INTEGER,
          defaultValue: 0,
          allowNull: true,
        }),
        priceId: expect.objectContaining({
          type: DataTypes.STRING,
          allowNull: true,
        }),
      }),
      expect.objectContaining({
        tableName: 'Produits',
      })
    );
  });

  it('should have correct properties', () => {
    expect(modelDefinition).toHaveProperty('id');
    expect(modelDefinition).toHaveProperty('nom');
    expect(modelDefinition).toHaveProperty('description');
    expect(modelDefinition).toHaveProperty('prix');
    expect(modelDefinition).toHaveProperty('stock');
    expect(modelDefinition).toHaveProperty('stockThreshold');
    expect(modelDefinition).toHaveProperty('marque');
    expect(modelDefinition).toHaveProperty('couleur');
    expect(modelDefinition).toHaveProperty('taille');
    expect(modelDefinition).toHaveProperty('isPromotion');
    expect(modelDefinition).toHaveProperty('pourcentagePromotion');
    expect(modelDefinition).toHaveProperty('priceId');
  });

  it('should have correct field configurations', () => {
    expect(modelDefinition.id.type).toBe(DataTypes.UUID);
    expect(modelDefinition.id.defaultValue).toBe(DataTypes.UUIDV4);
    expect(modelDefinition.id.primaryKey).toBe(true);

    expect(modelDefinition.nom.type).toBe(DataTypes.STRING);
    expect(modelDefinition.nom.allowNull).toBe(false);

    expect(modelDefinition.prix.type).toBe(DataTypes.FLOAT);
    expect(modelDefinition.prix.allowNull).toBe(false);

    expect(modelDefinition.stockThreshold.defaultValue).toBe(5);

    expect(modelDefinition.isPromotion.type).toBe(DataTypes.BOOLEAN);
    expect(modelDefinition.isPromotion.defaultValue).toBe(false);

    expect(modelDefinition.pourcentagePromotion.type).toBe(DataTypes.INTEGER);
    expect(modelDefinition.pourcentagePromotion.defaultValue).toBe(0);
    expect(modelDefinition.pourcentagePromotion.allowNull).toBe(true);
  });
});