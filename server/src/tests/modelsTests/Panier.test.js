import { DataTypes } from 'sequelize';

const mockDefine = jest.fn().mockReturnValue({});

jest.mock('../../modelsSQL/dataBase.js', () => ({
  connection: {
    define: mockDefine,
  },
}));

jest.mock('../../modelsSQL/Panier.js', () => {
  jest.requireActual('../../modelsSQL/Panier.js');
  return mockDefine.mock.calls[0][1];
});

const modelDefinition = require('../../modelsSQL/Panier.js');

describe('Panier Model', () => {
  it('should define the Panier model correctly', () => {
    expect(mockDefine).toHaveBeenCalledWith(
      'Panier',
      expect.objectContaining({
        id: expect.objectContaining({
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true
        })
      }),
      expect.objectContaining({
        tableName: 'Paniers',
      })
    );
  });

  it('should have correct properties', () => {
    expect(modelDefinition).toHaveProperty('id');
  });

  it('should have correct id field configuration', () => {
    expect(modelDefinition.id.type).toBe(DataTypes.UUID);
    expect(modelDefinition.id.defaultValue).toBe(DataTypes.UUIDV4);
    expect(modelDefinition.id.primaryKey).toBe(true);
  });
});