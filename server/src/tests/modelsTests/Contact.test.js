import { DataTypes } from 'sequelize';

// Mock de la connexion Sequelize
const mockDefine = jest.fn().mockReturnValue({});
jest.mock('../../modelsSQL/dataBase.js', () => ({
  connection: {
    define: mockDefine,
  },
}));

// Importer le module Contact après avoir défini le mock
jest.mock('../../modelsSQL/Contact.js', () => {
  jest.requireActual('../../modelsSQL/Contact.js');
  return mockDefine.mock.calls[0][1];  // Retourne la définition du modèle
});

// Importer Contact après les mocks
const modelDefinition = require('../../modelsSQL/Contact.js');

describe('Contact Model', () => {
  it('should define the Contact model correctly', () => {
    expect(mockDefine).toHaveBeenCalledWith(
      'Contact',
      expect.objectContaining({
        id: expect.objectContaining({
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true
        }),
        subject: expect.objectContaining({
          type: DataTypes.STRING,
          allowNull: false,
          validate: expect.objectContaining({
            max: 50,
            min: 5
          })
        }),
        message: expect.objectContaining({
          type: DataTypes.TEXT,
          allowNull: false,
          validate: expect.objectContaining({
            max: 300,
            min: 5
          })
        }),
        email: expect.objectContaining({
          type: DataTypes.STRING,
          allowNull: false,
          validate: expect.objectContaining({
            isEmail: true
          })
        }),
        dateContact: expect.objectContaining({
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW
        }),
        status: expect.objectContaining({
          type: DataTypes.STRING,
          allowNull: false,
          defaultValue: 'En cours de traitement',
          validate: expect.objectContaining({
            isIn: [['En cours de traitement', 'traité', 'non traité']]
          })
        }),
        response: expect.objectContaining({
          type: DataTypes.TEXT,
          allowNull: true,
          validate: expect.objectContaining({
            max: 500,
            min: 5
          })
        }),
        dateResponse: expect.objectContaining({
          type: DataTypes.DATE,
          allowNull: true
        }),
        isResponded: expect.objectContaining({
          type: DataTypes.BOOLEAN,
          defaultValue: false
        })
      }),
      expect.objectContaining({
        tableName: 'Contacts',
      })
    );
  });

  it('should have correct properties', () => {
    expect(modelDefinition).toHaveProperty('id');
    expect(modelDefinition).toHaveProperty('subject');
    expect(modelDefinition).toHaveProperty('message');
    expect(modelDefinition).toHaveProperty('email');
    expect(modelDefinition).toHaveProperty('dateContact');
    expect(modelDefinition).toHaveProperty('status');
    expect(modelDefinition).toHaveProperty('response');
    expect(modelDefinition).toHaveProperty('dateResponse');
    expect(modelDefinition).toHaveProperty('isResponded');
  });

  it('should not allow null for required fields', () => {
    expect(modelDefinition.subject.allowNull).toBe(false);
    expect(modelDefinition.message.allowNull).toBe(false);
    expect(modelDefinition.email.allowNull).toBe(false);
    expect(modelDefinition.dateContact.allowNull).toBe(false);
    expect(modelDefinition.status.allowNull).toBe(false);
  });

  it('should allow null for optional fields', () => {
    expect(modelDefinition.response.allowNull).toBe(true);
    expect(modelDefinition.dateResponse.allowNull).toBe(true);
  });

  it('should have correct default values', () => {
    expect(modelDefinition.dateContact.defaultValue).toBe(DataTypes.NOW);
    expect(modelDefinition.status.defaultValue).toBe('En cours de traitement');
    expect(modelDefinition.isResponded.defaultValue).toBe(false);
  });

  it('should have correct validations', () => {
    expect(modelDefinition.subject.validate).toEqual(expect.objectContaining({ max: 50, min: 5 }));
    expect(modelDefinition.message.validate).toEqual(expect.objectContaining({ max: 300, min: 5 }));
    expect(modelDefinition.email.validate).toEqual(expect.objectContaining({ isEmail: true }));
    expect(modelDefinition.status.validate.isIn[0]).toEqual(['En cours de traitement', 'traité', 'non traité']);
    expect(modelDefinition.response.validate).toEqual(expect.objectContaining({ max: 500, min: 5 }));
  });
});