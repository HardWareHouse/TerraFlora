import { DataTypes } from 'sequelize';

const mockDefine = jest.fn().mockReturnValue({});

jest.mock('../../modelsSQL/dataBase.js', () => ({
  connection: {
    define: mockDefine,
  },
}));

jest.mock('../../modelsSQL/Panier_Produits.js', () => {
  jest.requireActual('../../modelsSQL/Panier_Produits.js');
  return mockDefine.mock.calls[0][1];
});

const modelDefinition = require('../../modelsSQL/Panier_Produits.js');

describe('Panier_Produits Model', () => {
  it('should define the Panier_Produits model correctly', () => {
    expect(mockDefine).toHaveBeenCalledWith(
      'Panier_Produits',
      expect.objectContaining({
        quantity: expect.objectContaining({
          type: DataTypes.INTEGER,
          defaultValue: 1,
        })
      }),
      expect.objectContaining({
        timestamps: false,
      })
    );
  });

  it('should have correct properties', () => {
    expect(modelDefinition).toHaveProperty('quantity');
  });

  it('should have correct quantity field configuration', () => {
    expect(modelDefinition.quantity.type).toBe(DataTypes.INTEGER);
    expect(modelDefinition.quantity.defaultValue).toBe(1);
  });
});