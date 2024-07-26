import { DataTypes } from 'sequelize';

const mockDefine = jest.fn().mockReturnValue({});
jest.mock('../../modelsSQL/dataBase.js', () => ({
  connection: {
    define: mockDefine,
  },
}));

jest.mock('../../modelsSQL/Commande.js', () => {
  jest.requireActual('../../modelsSQL/Commande.js');
  return mockDefine.mock.calls[0][1]; 
});

const modelDefinition = require('../../modelsSQL/Commande.js');

describe('Commande Model', () => {
  it('should define the Commande model correctly', () => {
    expect(mockDefine).toHaveBeenCalledWith(
      'Commande',
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
        statut: expect.objectContaining({
          type: DataTypes.STRING,
          allowNull: false,
          defaultValue: 'En cours de traitement',
          validate: expect.objectContaining({
            isIn: [['En cours de traitement', 'Expédiée', 'Livrée', 'Annulée', 'Retournée']]
          })
        }),
        dateCommande: expect.objectContaining({
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW
        }),
        dateLivraisonFinale: expect.objectContaining({
          type: DataTypes.DATE,
          allowNull: true
        }),
        total: expect.objectContaining({
          type: DataTypes.FLOAT,
          allowNull: false
        }),
        trackingNumber: expect.objectContaining({
          type: DataTypes.STRING,
          allowNull: true
        }),
        productArray: expect.objectContaining({
          type: DataTypes.ARRAY(DataTypes.JSONB),
          allowNull: false
        })
      }),
      expect.objectContaining({
        tableName: 'Commandes',
      })
    );
  });

  it('should have correct properties', () => {
    expect(modelDefinition).toHaveProperty('id');
    expect(modelDefinition).toHaveProperty('numero');
    expect(modelDefinition).toHaveProperty('statut');
    expect(modelDefinition).toHaveProperty('dateCommande');
    expect(modelDefinition).toHaveProperty('dateLivraisonFinale');
    expect(modelDefinition).toHaveProperty('total');
    expect(modelDefinition).toHaveProperty('trackingNumber');
    expect(modelDefinition).toHaveProperty('productArray');
  });

  it('should not allow null for required fields', () => {
    expect(modelDefinition.numero.allowNull).toBe(false);
    expect(modelDefinition.statut.allowNull).toBe(false);
    expect(modelDefinition.dateCommande.allowNull).toBe(false);
    expect(modelDefinition.total.allowNull).toBe(false);
    expect(modelDefinition.productArray.allowNull).toBe(false);
  });

  it('should allow null for optional fields', () => {
    expect(modelDefinition.dateLivraisonFinale.allowNull).toBe(true);
    expect(modelDefinition.trackingNumber.allowNull).toBe(true);
  });

  it('should have correct default values', () => {
    expect(modelDefinition.statut.defaultValue).toBe('En cours de traitement');
    expect(modelDefinition.dateCommande.defaultValue).toBe(DataTypes.NOW);
  });

  it('should have correct validations for statut', () => {
    expect(modelDefinition.statut.validate.isIn[0]).toEqual([
      'En cours de traitement',
      'Expédiée',
      'Livrée',
      'Annulée',
      'Retournée'
    ]);
  });
});