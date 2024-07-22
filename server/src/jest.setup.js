// jest.setup.js or directly in the test file

// Mock the sequelize module
jest.mock("sequelize", () => {
  const DataTypes = {
    UUID: "UUID",
    UUIDV4: "UUIDV4",
    STRING: "STRING",
    BOOLEAN: "BOOLEAN",
    DATE: "DATE",
    NOW: "NOW",
  };

  const mockAddHook = jest.fn();

  const mockSequelize = {
    define: jest.fn().mockImplementation((modelName, attributes, options) => {
      return {
        ...attributes,
        addHook: mockAddHook,
        sync: jest.fn().mockResolvedValue(true),
        authenticate: jest.fn().mockResolvedValue(true),
        close: jest.fn().mockResolvedValue(true),
      };
    }),
    authenticate: jest.fn().mockResolvedValue(true),
    sync: jest.fn().mockResolvedValue(true),
    close: jest.fn().mockResolvedValue(true),
  };

  return {
    Sequelize: jest.fn(() => mockSequelize),
    DataTypes: DataTypes,
  };
});
