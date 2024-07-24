import { DataTypes } from 'sequelize';

const mockDefine = jest.fn().mockReturnValue({});
jest.mock('../../modelsSQL/dataBase.js', () => ({
  connection: {
    define: mockDefine,
  },
}));

jest.mock('../../modelsSQL/Facture.js', () => {
  jest.requireActual('../../modelsSQL/Facture.js');
  return mockDefine.mock.calls[0][1]; 
});

const modelDefinition = require('../../modelsSQL/Facture.js');

describe('Facture Model', () => {
  it('should define the Facture model correctly', () => {
    expect(mockDefine).toHaveBeenCalledWith(
      'Facture',
      expect.objectContaining({
        id: expect.objectContaining({
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true
        }),
        numero: expect.objectContaining({
          type: DataTypes.STRING,
          allowNull: false,
          unique: true
        }),
        dateFacturation: expect.objectContaining({
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW
        }),
        datePaiementDue: expect.objectContaining({
          type: DataTypes.DATE,
          allowNull: true
        }),
        statutPaiement: expect.objectContaining({
          type: DataTypes.STRING,
          allowNull: false,
          defaultValue: 'En attente',
          validate: expect.objectContaining({
            isIn: [['En attente', 'En cours de paiement', 'Payée', 'Impayée']]
          })
        }),
        total: expect.objectContaining({
          type: DataTypes.FLOAT,
          allowNull: false
        }),
        invoiceUrl: expect.objectContaining({
          type: DataTypes.STRING,
          allowNull: false
        })
      }),
      expect.objectContaining({
        tableName: 'Factures',
      })
    );
  });

  it('should have correct properties', () => {
    expect(modelDefinition).toHaveProperty('id');
    expect(modelDefinition).toHaveProperty('numero');
    expect(modelDefinition).toHaveProperty('dateFacturation');
    expect(modelDefinition).toHaveProperty('datePaiementDue');
    expect(modelDefinition).toHaveProperty('statutPaiement');
    expect(modelDefinition).toHaveProperty('total');
    expect(modelDefinition).toHaveProperty('invoiceUrl');
  });

  it('should not allow null for required fields', () => {
    expect(modelDefinition.numero.allowNull).toBe(false);
    expect(modelDefinition.dateFacturation.allowNull).toBe(false);
    expect(modelDefinition.statutPaiement.allowNull).toBe(false);
    expect(modelDefinition.total.allowNull).toBe(false);
    expect(modelDefinition.invoiceUrl.allowNull).toBe(false);
  });

  it('should allow null for optional fields', () => {
    expect(modelDefinition.datePaiementDue.allowNull).toBe(true);
  });

  it('should have correct default values', () => {
    expect(modelDefinition.dateFacturation.defaultValue).toBe(DataTypes.NOW);
    expect(modelDefinition.statutPaiement.defaultValue).toBe('En attente');
  });

  it('should have correct validations for statutPaiement', () => {
    expect(modelDefinition.statutPaiement.validate.isIn[0]).toEqual([
      'En attente',
      'En cours de paiement',
      'Payée',
      'Impayée'
    ]);
  });

  it('should have unique constraint on numero', () => {
    expect(modelDefinition.numero.unique).toBe(true);
  });
});