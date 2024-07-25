import { Sequelize, DataTypes } from 'sequelize';
import Adresse from '../../modelsSQL/Adresse.js';

describe('Adresse Model', () => {
  let sequelize;
  let AdresseModel;

  beforeAll(async () => {
    sequelize = new Sequelize('sqlite::memory:', { logging: false });
    AdresseModel = sequelize.define('Adresse', {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      voie: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isIn: [['allée', 'avenue', 'boulevard', 'chemin', 'cours', 'impasse', 'passage', 'place', 'quai', 'route', 'rue', 'square', 'voie']]
        }
      },
      numero: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          is: /^\d{1,3}[a-zA-Z]?$/
        }
      },
      rue: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          is: /^[a-zA-Z\s-]{1,50}$/
        }
      },
      ville: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          is: /^[a-zA-Z\s-]{1,50}$/
        }
      },
      codePostal: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          is: /^\d{5}$/
        }
      },
      isDeliveryAddress: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      isBillingAddress: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
      }
    }, {
      tableName: 'Adresses'
    });
    await sequelize.sync();
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it('should create a valid Adresse', async () => {
    const adresse = await AdresseModel.create({
      voie: 'rue',
      numero: '123',
      rue: 'Test Rue',
      ville: 'Test Ville',
      codePostal: '12345',
      isDeliveryAddress: true,
      isBillingAddress: false
    });
    expect(adresse).toBeDefined();
    expect(adresse.voie).toBe('rue');
    expect(adresse.numero).toBe('123');
    expect(adresse.rue).toBe('Test Rue');
    expect(adresse.ville).toBe('Test Ville');
    expect(adresse.codePostal).toBe('12345');
    expect(adresse.isDeliveryAddress).toBe(true);
    expect(adresse.isBillingAddress).toBe(false);
  });

  it('should fail when voie is invalid', async () => {
    try {
      await AdresseModel.create({
        voie: 'invalid',
        numero: '123',
        rue: 'Test Rue',
        ville: 'Test Ville',
        codePostal: '12345',
        isDeliveryAddress: true,
        isBillingAddress: false
      });
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.name).toBe('SequelizeValidationError');
    }
  });

  it('should fail when numero is invalid', async () => {
    try {
      await AdresseModel.create({
        voie: 'rue',
        numero: '1234',
        rue: 'Test Rue',
        ville: 'Test Ville',
        codePostal: '12345',
        isDeliveryAddress: true,
        isBillingAddress: false
      });
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.name).toBe('SequelizeValidationError');
    }
  });

  it('should fail when codePostal is invalid', async () => {
    try {
      await AdresseModel.create({
        voie: 'rue',
        numero: '123',
        rue: 'Test Rue',
        ville: 'Test Ville',
        codePostal: '1234',
        isDeliveryAddress: true,
        isBillingAddress: false
      });
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.name).toBe('SequelizeValidationError');
    }
  });
});
