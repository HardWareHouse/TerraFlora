import { DataTypes } from 'sequelize';

const mockDefine = jest.fn().mockReturnValue({});

jest.mock('../../modelsSQL/dataBase.js', () => ({
  connection: {
    define: mockDefine,
  },
}));

jest.mock('../../modelsSQL/DemandeRGPD.js', () => {
  const actualDemandeRGPD = jest.requireActual('../../modelsSQL/DemandeRGPD.js');
  actualDemandeRGPD.default;
  return actualDemandeRGPD;
});

const DemandeRGPD = require('../../modelsSQL/DemandeRGPD.js').default;

describe('DemandeRGPD Model', () => {
  let modelDefinition;

  beforeAll(() => {
    modelDefinition = mockDefine.mock.calls[0][1];
  });

  it('should define the DemandeRGPD model correctly', () => {
    expect(mockDefine).toHaveBeenCalledWith('DemandeRGPD', expect.any(Object), expect.objectContaining({
      tableName: 'DemandesRGPD',
    }));
  });

  it('should export the DemandeRGPD model', () => {
    expect(DemandeRGPD).toBeDefined();
  });

  it('should have correct properties', () => {
    expect(modelDefinition).toHaveProperty('id');
    expect(modelDefinition).toHaveProperty('statut');
    expect(modelDefinition).toHaveProperty('typeDemande');
    expect(modelDefinition).toHaveProperty('dateTraitement');
  });

  it('should have correct data types', () => {
    expect(modelDefinition.id.type).toEqual(DataTypes.UUID);
    expect(modelDefinition.statut.type).toEqual(DataTypes.STRING);
    expect(modelDefinition.typeDemande.type).toEqual(DataTypes.STRING);
    expect(modelDefinition.dateTraitement.type).toEqual(DataTypes.DATE);
  });

  it('should not allow null for required fields', () => {
    expect(modelDefinition.statut.allowNull).toBe(false);
    expect(modelDefinition.typeDemande.allowNull).toBe(false);
  });

  it('should allow null for dateTraitement', () => {
    expect(modelDefinition.dateTraitement.allowNull).toBe(true);
  });

  it('should have UUID as primary key with UUIDV4 as default', () => {
    expect(modelDefinition.id.primaryKey).toBe(true);
    expect(modelDefinition.id.defaultValue).toEqual(DataTypes.UUIDV4);
  });
});