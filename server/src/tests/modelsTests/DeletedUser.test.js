import { DataTypes } from 'sequelize';

const mockDefine = jest.fn().mockReturnValue({});

jest.mock('../../modelsSQL/dataBase.js', () => ({
  connection: {
    define: mockDefine,
  },
}));

jest.mock('../../modelsSQL/DeletedUser.js', () => {
  const actualDeletedUser = jest.requireActual('../../modelsSQL/DeletedUser.js');
  actualDeletedUser.default;
  return actualDeletedUser;
});

const DeletedUser = require('../../modelsSQL/DeletedUser.js').default;

describe('DeletedUser Model', () => {
  let modelDefinition;

  beforeAll(() => {
    modelDefinition = mockDefine.mock.calls[0][1];
  });

  it('should define the DeletedUser model correctly', () => {
    expect(mockDefine).toHaveBeenCalledWith('DeletedUser', expect.any(Object), {});
  });

  it('should export the DeletedUser model', () => {
    expect(DeletedUser).toBeDefined();
  });

  it('should have correct properties', () => {
    expect(modelDefinition).toHaveProperty('id');
    expect(modelDefinition).toHaveProperty('role');
    expect(modelDefinition).toHaveProperty('haveConsented');
    expect(modelDefinition).toHaveProperty('lastUpdatedPassword');
    expect(modelDefinition).toHaveProperty('wantsMailNewProduct');
    expect(modelDefinition).toHaveProperty('wantsMailRestockProduct');
    expect(modelDefinition).toHaveProperty('wantsMailChangingPrice');
    expect(modelDefinition).toHaveProperty('wantsMailNewsletter');
    expect(modelDefinition).toHaveProperty('isVerified');
    expect(modelDefinition).toHaveProperty('isBlocked');
  });

  it('should have correct data types', () => {
    expect(modelDefinition.id.type).toEqual(DataTypes.UUID);
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
    expect(modelDefinition.haveConsented.defaultValue).toBe(false);
    expect(modelDefinition.lastUpdatedPassword.defaultValue).toEqual(DataTypes.NOW);
    expect(modelDefinition.wantsMailNewProduct.defaultValue).toBe(false);
    expect(modelDefinition.wantsMailRestockProduct.defaultValue).toBe(false);
    expect(modelDefinition.wantsMailChangingPrice.defaultValue).toBe(false);
    expect(modelDefinition.wantsMailNewsletter.defaultValue).toBe(false);
    expect(modelDefinition.isVerified.defaultValue).toBe(false);
    expect(modelDefinition.isBlocked.defaultValue).toBe(false);
  });

  it('should have UUID as primary key with UUIDV4 as default', () => {
    expect(modelDefinition.id.primaryKey).toBe(true);
    expect(modelDefinition.id.defaultValue).toEqual(DataTypes.UUIDV4);
  });
});