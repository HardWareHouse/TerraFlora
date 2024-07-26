import { Sequelize } from 'sequelize';

jest.mock('sequelize', () => {
  const mSequelize = {
    authenticate: jest.fn(),
    define: jest.fn(),
  };
  return { Sequelize: jest.fn(() => mSequelize) };
});

jest.mock('dotenv', () => ({
  config: jest.fn(),
}));

describe('Database Connection', () => {
  let connectToDatabase;
  let connection;

  beforeEach(() => {
    jest.resetModules();
    process.env.POSTGRES_LINK = 'mock_postgres_link';
    const dataBase = require('../../modelsSQL/dataBase.js');
    connectToDatabase = dataBase.connectToDatabase;
    connection = dataBase.connection;
  });

//   it('should create a Sequelize instance with correct parameters', () => {
//     expect(Sequelize).toHaveBeenCalledWith('mock_postgres_link', { dialect: 'postgres' });
//   });

  it('should export the connection', () => {
    expect(connection).toBeDefined();
  });

  describe('connectToDatabase', () => {
    it('should authenticate successfully', async () => {
      connection.authenticate.mockResolvedValue();
      
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
      await connectToDatabase();
      
      expect(connection.authenticate).toHaveBeenCalled();
      expect(consoleSpy).toHaveBeenCalledWith('Connection has been established successfully.');
      consoleSpy.mockRestore();
    });

    it('should handle authentication error', async () => {
      const mockError = new Error('Authentication failed');
      connection.authenticate.mockRejectedValue(mockError);
      
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      await connectToDatabase();
      
      expect(connection.authenticate).toHaveBeenCalled();
      expect(consoleErrorSpy).toHaveBeenCalledWith('Unable to connect to the database:', mockError);
      consoleErrorSpy.mockRestore();
    });
  });
});
