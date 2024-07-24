import { DataTypes } from 'sequelize';

const mockDefine = jest.fn().mockReturnValue({});
jest.mock('../../modelsSQL/dataBase.js', () => ({
  connection: {
    define: mockDefine,
  },
}));

jest.mock('../../modelsSQL/MethodePaiement.js', () => {
  const actualMethodePaiement = jest.requireActual('../../modelsSQL/MethodePaiement.js');
  // Cela va exécuter le code dans MethodePaiement.js, appelant ainsi mockDefine
  actualMethodePaiement.default;
  return actualMethodePaiement;
});

const MethodePaiement = require('../../modelsSQL/MethodePaiement.js').default;

describe('MethodePaiement Model', () => {
  let modelDefinition;

  beforeAll(() => {
    modelDefinition = mockDefine.mock.calls[0][1];
  });

  it('should define the MethodePaiement model correctly', () => {
    expect(mockDefine).toHaveBeenCalledWith(
      'MethodePaiement',
      expect.any(Object),
      expect.objectContaining({
        tableName: 'MethodesPaiement',
      })
    );
  });

  it('should export the MethodePaiement model', () => {
    expect(MethodePaiement).toBeDefined();
  });

  it('should have correct properties', () => {
    expect(modelDefinition).toHaveProperty('id');
    expect(modelDefinition).toHaveProperty('nom');
  });

  it('should not allow null for nom', () => {
    expect(modelDefinition.nom.allowNull).toBe(false);
  });

  it('should have correct data types', () => {
    expect(modelDefinition.id.type).toEqual(DataTypes.UUID);
    expect(modelDefinition.nom.type).toEqual(DataTypes.STRING);
  });

  it('should have UUID as primary key with UUIDV4 as default', () => {
    expect(modelDefinition.id.primaryKey).toBe(true);
    expect(modelDefinition.id.defaultValue).toEqual(DataTypes.UUIDV4);
  });
});