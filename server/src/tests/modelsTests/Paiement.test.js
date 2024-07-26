import { DataTypes } from 'sequelize';

const mockDefine = jest.fn().mockReturnValue({});
jest.mock('../../modelsSQL/dataBase.js', () => ({
  connection: {
    define: mockDefine,
  },
}));
jest.mock('../../modelsSQL/MethodePaiement.js', () => ({}));

jest.mock('../../modelsSQL/Paiement.js', () => {
  jest.requireActual('../../modelsSQL/Paiement.js');
  return mockDefine.mock.calls[0][1]; 
});

const modelDefinition = require('../../modelsSQL/Paiement.js');

describe('Paiement Model', () => {
  it('should define the Paiement model correctly', () => {
    expect(mockDefine).toHaveBeenCalledWith(
      'Paiement',
      expect.objectContaining({
        id: expect.objectContaining({
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          allowNull: false,
          primaryKey: true
        }),
        datePaiement: expect.objectContaining({
          type: DataTypes.DATE,
          allowNull: false
        }),
        montant: expect.objectContaining({
          type: DataTypes.FLOAT,
          allowNull: false
        }),
        methodePaiementId: expect.objectContaining({
          type: DataTypes.UUID,
          references: expect.objectContaining({
            model: expect.anything(),
            key: 'id'
          })
        })
      }),
      expect.objectContaining({
        tableName: 'Paiements',
      })
    );
  });

  it('should have correct properties', () => {
    expect(modelDefinition).toHaveProperty('id');
    expect(modelDefinition).toHaveProperty('datePaiement');
    expect(modelDefinition).toHaveProperty('montant');
    expect(modelDefinition).toHaveProperty('methodePaiementId');
  });

  it('should not allow null for required fields', () => {
    expect(modelDefinition.id.allowNull).toBe(false);
    expect(modelDefinition.datePaiement.allowNull).toBe(false);
    expect(modelDefinition.montant.allowNull).toBe(false);
  });

  it('should have correct data types', () => {
    expect(modelDefinition.id.type).toEqual(DataTypes.UUID);
    expect(modelDefinition.datePaiement.type).toEqual(DataTypes.DATE);
    expect(modelDefinition.montant.type).toEqual(DataTypes.FLOAT);
    expect(modelDefinition.methodePaiementId.type).toEqual(DataTypes.UUID);
  });

  it('should have correct default value for id', () => {
    expect(modelDefinition.id.defaultValue).toEqual(DataTypes.UUIDV4);
  });

  it('should have correct foreign key for methodePaiementId', () => {
    expect(modelDefinition.methodePaiementId.references).toEqual({
      model: expect.anything(),
      key: 'id'
    });
  });
});