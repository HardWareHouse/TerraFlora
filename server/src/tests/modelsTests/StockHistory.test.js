import { DataTypes } from 'sequelize';

const mockDefine = jest.fn().mockReturnValue({});

jest.mock('../../modelsSQL/dataBase.js', () => ({
  connection: {
    define: mockDefine,
  },
}));

jest.mock('../../modelsSQL/StockHistory.js', () => {
  const actualStockHistory = jest.requireActual('../../modelsSQL/StockHistory.js');
  actualStockHistory.default;
  return actualStockHistory;
});

const StockHistory = require('../../modelsSQL/StockHistory.js').default;

describe('StockHistory Model', () => {
  let modelDefinition;

  beforeAll(() => {
    modelDefinition = mockDefine.mock.calls[0][1];
  });

  it('should define the StockHistory model correctly', () => {
    expect(mockDefine).toHaveBeenCalledWith('StockHistory', expect.any(Object), expect.objectContaining({
      tableName: 'StockHistories',
    }));
  });

  it('should export the StockHistory model', () => {
    expect(StockHistory).toBeDefined();
  });

  it('should have correct properties', () => {
    expect(modelDefinition).toHaveProperty('id');
    expect(modelDefinition).toHaveProperty('produitId');
    expect(modelDefinition).toHaveProperty('date');
    expect(modelDefinition).toHaveProperty('stock');
  });

  it('should have correct data types', () => {
    expect(modelDefinition.id.type).toEqual(DataTypes.UUID);
    expect(modelDefinition.produitId.type).toEqual(DataTypes.UUID);
    expect(modelDefinition.date.type).toEqual(DataTypes.DATE);
    expect(modelDefinition.stock.type).toEqual(DataTypes.INTEGER);
  });

  it('should not allow null for required fields', () => {
    expect(modelDefinition.produitId.allowNull).toBe(false);
    expect(modelDefinition.date.allowNull).toBe(false);
    expect(modelDefinition.stock.allowNull).toBe(false);
  });

  it('should have UUID as primary key with UUIDV4 as default', () => {
    expect(modelDefinition.id.primaryKey).toBe(true);
    expect(modelDefinition.id.defaultValue).toEqual(DataTypes.UUIDV4);
  });

  it('should have correct default value for date', () => {
    expect(modelDefinition.date.defaultValue).toEqual(DataTypes.NOW);
  });
});