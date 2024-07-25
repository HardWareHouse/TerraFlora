import { DataTypes } from 'sequelize';

const mockDefine = jest.fn().mockReturnValue({});

jest.mock('../../modelsSQL/dataBase.js', () => ({
  connection: {
    define: mockDefine,
  },
}));

jest.mock('../../modelsSQL/TempReservation.js', () => {
  const actualTempReservation = jest.requireActual('../../modelsSQL/TempReservation.js');
  actualTempReservation.default;
  return actualTempReservation;
});

const TempReservation = require('../../modelsSQL/TempReservation.js').default;

describe('TempReservation Model', () => {
  let modelDefinition;

  beforeAll(() => {
    modelDefinition = mockDefine.mock.calls[0][1];
  });

  it('should define the TempReservation model correctly', () => {
    expect(mockDefine).toHaveBeenCalledWith('TempReservation', expect.any(Object), expect.objectContaining({
      tableName: 'TempReservations',
    }));
  });

  it('should export the TempReservation model', () => {
    expect(TempReservation).toBeDefined();
  });

  it('should have correct properties', () => {
    expect(modelDefinition).toHaveProperty('id');
    expect(modelDefinition).toHaveProperty('userId');
    expect(modelDefinition).toHaveProperty('produitId');
    expect(modelDefinition).toHaveProperty('quantity');
    expect(modelDefinition).toHaveProperty('reservedAt');
  });

  it('should have correct data types', () => {
    expect(modelDefinition.id.type).toEqual(DataTypes.UUID);
    expect(modelDefinition.userId.type).toEqual(DataTypes.UUID);
    expect(modelDefinition.produitId.type).toEqual(DataTypes.UUID);
    expect(modelDefinition.quantity.type).toEqual(DataTypes.INTEGER);
    expect(modelDefinition.reservedAt.type).toEqual(DataTypes.DATE);
  });

  it('should not allow null for required fields', () => {
    expect(modelDefinition.userId.allowNull).toBe(false);
    expect(modelDefinition.produitId.allowNull).toBe(false);
    expect(modelDefinition.quantity.allowNull).toBe(false);
  });

  it('should have UUID as primary key with UUIDV4 as default', () => {
    expect(modelDefinition.id.primaryKey).toBe(true);
    expect(modelDefinition.id.defaultValue).toEqual(DataTypes.UUIDV4);
  });

  it('should have correct default value for reservedAt', () => {
    expect(modelDefinition.reservedAt.defaultValue).toEqual(DataTypes.NOW);
  });
});