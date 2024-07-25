import { DataTypes } from 'sequelize';

const mockDefine = jest.fn().mockReturnValue({});

jest.mock('../../modelsSQL/dataBase.js', () => ({
  connection: {
    define: mockDefine,
  },
}));

jest.mock('../../modelsSQL/Produit.js', () => ({}));

jest.mock('../../modelsSQL/Image.js', () => {
  const actualImage = jest.requireActual('../../modelsSQL/Image.js');
  actualImage.default;
  return actualImage;
});

const Image = require('../../modelsSQL/Image.js').default;

describe('Image Model', () => {
  let modelDefinition;

  beforeAll(() => {
    modelDefinition = mockDefine.mock.calls[0][1];
  });

  it('should define the Image model correctly', () => {
    expect(mockDefine).toHaveBeenCalledWith('Image', expect.any(Object), expect.objectContaining({
      tableName: 'Images',
    }));
  });

  it('should export the Image model', () => {
    expect(Image).toBeDefined();
  });

  it('should have correct properties', () => {
    expect(modelDefinition).toHaveProperty('id');
    expect(modelDefinition).toHaveProperty('produitId');
    expect(modelDefinition).toHaveProperty('imageUrl');
  });

  it('should have correct data types', () => {
    expect(modelDefinition.id.type).toEqual(DataTypes.UUID);
    expect(modelDefinition.produitId.type).toEqual(DataTypes.UUID);
    expect(modelDefinition.imageUrl.type).toEqual(DataTypes.STRING);
  });

  it('should not allow null for required fields', () => {
    expect(modelDefinition.produitId.allowNull).toBe(false);
    expect(modelDefinition.imageUrl.allowNull).toBe(false);
  });

  it('should have UUID as primary key with UUIDV4 as default', () => {
    expect(modelDefinition.id.primaryKey).toBe(true);
    expect(modelDefinition.id.defaultValue).toEqual(DataTypes.UUIDV4);
  });

  it('should have correct foreign key for produitId', () => {
    expect(modelDefinition.produitId.references).toEqual({
      model: expect.anything(),
      key: 'id'
    });
  });
});