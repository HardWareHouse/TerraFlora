import { DataTypes } from 'sequelize';

const mockDefine = jest.fn().mockReturnValue({});

jest.mock('../../modelsSQL/dataBase.js', () => ({
  connection: {
    define: mockDefine,
  },
}));

jest.mock('../../modelsSQL/Categorie.js', () => {
  jest.requireActual('../../modelsSQL/Categorie.js');
  return mockDefine.mock.calls[0][1];
});

const modelDefinition = require('../../modelsSQL/Categorie.js');

describe('Categorie Model', () => {
  it('should define the Categorie model correctly', () => {
    expect(mockDefine).toHaveBeenCalledWith(
      'Categorie',
      expect.objectContaining({
        id: expect.objectContaining({
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true
        }),
        nom: expect.objectContaining({
          type: DataTypes.STRING,
          allowNull: false
        }),
        description: expect.objectContaining({
          type: DataTypes.TEXT,
          allowNull: true
        })
      }),
      expect.objectContaining({
        tableName: 'Categories',
      })
    );
  });

  it('should have correct properties', () => {
    expect(modelDefinition).toHaveProperty('id');
    expect(modelDefinition).toHaveProperty('nom');
    expect(modelDefinition).toHaveProperty('description');
  });

  it('should not allow null for nom', () => {
    expect(modelDefinition.nom.allowNull).toBe(false);
  });

  it('should allow null for description', () => {
    expect(modelDefinition.description.allowNull).toBe(true);
  });
});