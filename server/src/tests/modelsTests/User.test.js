import { DataTypes } from 'sequelize';
import bcrypt from 'bcryptjs';

const mockDefine = jest.fn().mockReturnValue({
  addHook: jest.fn()
});

jest.mock('../../modelsSQL/dataBase.js', () => ({
  connection: {
    define: mockDefine,
  },
}));

jest.mock('bcryptjs', () => ({
  hash: jest.fn().mockResolvedValue('hashedPassword'),
  genSalt: jest.fn().mockResolvedValue('salt'),
}));

jest.mock('../../modelsSQL/User.js', () => {
  const actualUser = jest.requireActual('../../modelsSQL/User.js');
  actualUser.default;
  return actualUser;
});

const User = require('../../modelsSQL/User.js').default;

describe('User Model', () => {
  let modelDefinition;
  let userModel;

  beforeAll(() => {
    [, modelDefinition] = mockDefine.mock.calls[0];
    userModel = mockDefine.mock.results[0].value;
  });

  it('should define the User model correctly', () => {
    expect(mockDefine).toHaveBeenCalledWith('User', expect.any(Object), expect.any(Object));
  });

  it('should export the User model', () => {
    expect(User).toBeDefined();
  });

  it('should have correct properties', () => {
    const expectedProperties = ['id', 'nom', 'prenom', 'email', 'password', 'telephone', 'role', 'haveConsented', 'lastUpdatedPassword', 'wantsMailNewProduct', 'wantsMailRestockProduct', 'wantsMailChangingPrice', 'wantsMailNewsletter', 'isVerified', 'isBlocked'];
    expectedProperties.forEach(prop => {
      expect(modelDefinition).toHaveProperty(prop);
    });
  });

  it('should not allow null for required fields', () => {
    const requiredFields = ['nom', 'prenom', 'email', 'password', 'telephone', 'role'];
    requiredFields.forEach(field => {
      expect(modelDefinition[field].allowNull).toBe(false);
    });
  });

  it('should have correct data types', () => {
    expect(modelDefinition.id.type).toEqual(DataTypes.UUID);
    expect(modelDefinition.nom.type).toEqual(DataTypes.STRING);
    expect(modelDefinition.prenom.type).toEqual(DataTypes.STRING);
    expect(modelDefinition.email.type).toEqual(DataTypes.STRING);
    expect(modelDefinition.password.type).toEqual(DataTypes.STRING);
    expect(modelDefinition.telephone.type).toEqual(DataTypes.STRING);
    expect(modelDefinition.role.type).toEqual(DataTypes.STRING);
    expect(modelDefinition.haveConsented.type).toEqual(DataTypes.BOOLEAN);
    expect(modelDefinition.lastUpdatedPassword.type).toEqual(DataTypes.DATE);
    expect(modelDefinition.wantsMailNewProduct.type).toEqual(DataTypes.BOOLEAN);
    expect(modelDefinition.wantsMailRestockProduct.type).toEqual(DataTypes.BOOLEAN);
    expect(modelDefinition.wantsMailChangingPrice.type).toEqual(DataTypes.BOOLEAN);
    expect(modelDefinition.wantsMailNewsletter.type).toEqual(DataTypes.BOOLEAN);
    expect(modelDefinition.isVerified.type).toEqual(DataTypes.BOOLEAN);
    expect(modelDefinition.isBlocked.type).toEqual(DataTypes.BOOLEAN);
  });

  it('should have correct default values', () => {
    expect(modelDefinition.role.defaultValue).toBe('ROLE_USER');
    expect(modelDefinition.haveConsented.defaultValue).toBe(false);
    expect(modelDefinition.lastUpdatedPassword.defaultValue).toBe(DataTypes.NOW);
    expect(modelDefinition.wantsMailNewProduct.defaultValue).toBe(false);
    expect(modelDefinition.wantsMailRestockProduct.defaultValue).toBe(false);
    expect(modelDefinition.wantsMailChangingPrice.defaultValue).toBe(false);
    expect(modelDefinition.wantsMailNewsletter.defaultValue).toBe(false);
    expect(modelDefinition.isVerified.defaultValue).toBe(false);
    expect(modelDefinition.isBlocked.defaultValue).toBe(false);
  });

  it('should have email validation', () => {
    expect(modelDefinition.email.validate.isEmail).toBe(true);
  });

  it('should have unique constraint on email', () => {
    expect(modelDefinition.email.unique).toBe(true);
  });

  it('should add beforeCreate hook', () => {
    expect(userModel.addHook).toHaveBeenCalledWith('beforeCreate', expect.any(Function));
  });

  it('should add beforeUpdate hook', () => {
    expect(userModel.addHook).toHaveBeenCalledWith('beforeUpdate', expect.any(Function));
  });
});