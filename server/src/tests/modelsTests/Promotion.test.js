import { DataTypes } from 'sequelize';

const mockDefine = jest.fn().mockReturnValue({});
jest.mock('../../modelsSQL/dataBase.js', () => ({
  connection: {
    define: mockDefine,
  },
}));

jest.mock('../../modelsSQL/Promotion.js', () => {
  const actualPromotion = jest.requireActual('../../modelsSQL/Promotion.js');
  actualPromotion.default;
  return actualPromotion;
});

const Promotion = require('../../modelsSQL/Promotion.js').default;

describe('Promotion Model', () => {
  let modelDefinition;

  beforeAll(() => {
    modelDefinition = mockDefine.mock.calls[0][1];
  });

  it('should define the Promotion model correctly', () => {
    expect(mockDefine).toHaveBeenCalledWith(
      'Promotion',
      expect.any(Object),
      expect.objectContaining({
        tableName: 'Promotions',
      })
    );
  });

  it('should export the Promotion model', () => {
    expect(Promotion).toBeDefined();
  });

  it('should have correct properties', () => {
    expect(modelDefinition).toHaveProperty('id');
    expect(modelDefinition).toHaveProperty('remise');
    expect(modelDefinition).toHaveProperty('dateDebut');
    expect(modelDefinition).toHaveProperty('dateFin');
  });

  it('should not allow null for required fields', () => {
    expect(modelDefinition.remise.allowNull).toBe(false);
    expect(modelDefinition.dateDebut.allowNull).toBe(false);
    expect(modelDefinition.dateFin.allowNull).toBe(false);
  });

  it('should have correct data types', () => {
    expect(modelDefinition.id.type).toEqual(DataTypes.UUID);
    expect(modelDefinition.remise.type).toEqual(DataTypes.INTEGER);
    expect(modelDefinition.dateDebut.type).toEqual(DataTypes.DATE);
    expect(modelDefinition.dateFin.type).toEqual(DataTypes.DATE);
  });

  it('should have UUID as primary key with UUIDV4 as default', () => {
    expect(modelDefinition.id.primaryKey).toBe(true);
    expect(modelDefinition.id.defaultValue).toEqual(DataTypes.UUIDV4);
  });
});