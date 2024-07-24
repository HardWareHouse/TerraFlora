import { DataTypes } from 'sequelize';

const mockDefine = jest.fn().mockReturnValue({});
jest.mock('../../modelsSQL/dataBase.js', () => ({
  connection: {
    define: mockDefine,
  },
}));

import Categorie from '../../modelsSQL/Categorie.js';

describe('Categorie Model', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

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

  it('should export the Categorie model', () => {
    expect(Categorie).toBeDefined();
  });

  it('should have correct properties', () => {
    const [modelName, modelDefinition] = mockDefine.mock.calls[0];
    expect(modelDefinition).toHaveProperty('id');
    expect(modelDefinition).toHaveProperty('nom');
    expect(modelDefinition).toHaveProperty('description');
  });

  it('should not allow null for nom', () => {
    const [modelName, modelDefinition] = mockDefine.mock.calls[0];
    expect(modelDefinition.nom.allowNull).toBe(false);
  });

  it('should allow null for description', () => {
    const [modelName, modelDefinition] = mockDefine.mock.calls[0];
    expect(modelDefinition.description.allowNull).toBe(true);
  });
});
