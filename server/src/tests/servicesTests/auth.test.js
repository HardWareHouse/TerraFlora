import jwt from 'jsonwebtoken';
import { sendConfirmationEmail, sendResetPasswordEmail, sendAccountBlockedEmail } from '../../emailConfig.js';
import UserSQL from '../../modelsSQL/User.js';
import UserMongo from '../../modelsMongo/User.mongo.js';
import * as authService from '../../services/authService.js';

jest.mock('jsonwebtoken');
jest.mock('../../emailConfig.js');
jest.mock('../../modelsSQL/User.js');
jest.mock('../../modelsMongo/User.mongo.js');

describe('Auth Service Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should find user by email', async () => {
    const mockUser = { id: '123', email: 'test@example.com' };
    UserSQL.findOne.mockResolvedValue(mockUser);

    const user = await authService.findUserByEmail('test@example.com');
    expect(user).toEqual(mockUser);
    expect(UserSQL.findOne).toHaveBeenCalledWith({ where: { email: 'test@example.com' } });
  });

  it('should find user by id', async () => {
    const mockUser = { id: '123', email: 'test@example.com' };
    UserSQL.findByPk.mockResolvedValue(mockUser);

    const user = await authService.findUserById('123');
    expect(user).toEqual(mockUser);
    expect(UserSQL.findByPk).toHaveBeenCalledWith('123');
  });

  it('should create a new user', async () => {
    const userData = {
      nom: 'Doe',
      prenom: 'John',
      email: 'john@example.com',
      password: 'password123',
      role: 'ROLE_USER'
    };
    const newUser = { id: '123', ...userData };
    UserSQL.create.mockResolvedValue(newUser);
    UserMongo.create.mockResolvedValue(newUser);
    jwt.sign.mockReturnValue('mocked-token');

    await authService.createUser(userData);

    expect(UserSQL.create).toHaveBeenCalledWith(userData);
    expect(UserMongo.create).toHaveBeenCalled();
    expect(jwt.sign).toHaveBeenCalled();
    expect(sendConfirmationEmail).toHaveBeenCalledWith(newUser, 'mocked-token');
  });

  it('should verify a user in MongoDB', async () => {
    const mockUser = { _id: '123', isVerified: false, save: jest.fn() };
    UserMongo.findById.mockResolvedValue(mockUser);

    await authService.verifiedMongoUser('123');

    expect(UserMongo.findById).toHaveBeenCalledWith('123');
    expect(mockUser.isVerified).toBe(true);
    expect(mockUser.save).toHaveBeenCalled();
  });

  it('should generate a token', () => {
    jwt.sign.mockReturnValue('mocked-token');

    const token = authService.generateToken({ id: '123' }, 'secret', '1h');

    expect(token).toBe('mocked-token');
    expect(jwt.sign).toHaveBeenCalledWith({ id: '123' }, 'secret', { expiresIn: '1h' });
  });

  it('should verify a token', () => {
    jwt.verify.mockReturnValue({ id: '123' });

    const decoded = authService.verifyToken('token', 'secret');

    expect(decoded).toEqual({ id: '123' });
    expect(jwt.verify).toHaveBeenCalledWith('token', 'secret');
  });

  it('should handle password reset', async () => {
    const user = { id: '123', email: 'test@example.com' };
    jwt.sign.mockReturnValue('mocked-token');

    await authService.handlePasswordReset(user);

    expect(jwt.sign).toHaveBeenCalled();
    expect(sendResetPasswordEmail).toHaveBeenCalledWith(user, 'mocked-token');
  });

  it('should handle account blocked', async () => {
    const user = { id: '123', email: 'test@example.com' };

    await authService.handleAccountBlocked(user);

    expect(sendAccountBlockedEmail).toHaveBeenCalledWith(user);
  });

  it('should check if user is admin in MongoDB', async () => {
    UserMongo.findById.mockResolvedValue({ id: '123', role: 'ROLE_ADMIN' });

    const isAdmin = await authService.isAdminInMongo('123');

    expect(isAdmin).toBe(true);
    expect(UserMongo.findById).toHaveBeenCalledWith('123');
  });

  it('should block user on SQL and MongoDB', async () => {
    const mockSQLUser = { id: '123', isBlocked: false, save: jest.fn() };
    const mockMongoUser = { _id: '123', isBlocked: false, save: jest.fn() };
    UserSQL.findByPk.mockResolvedValue(mockSQLUser);
    UserMongo.findById.mockResolvedValue(mockMongoUser);

    await authService.blockUserOnSQLAndMongo('123');

    expect(UserSQL.findByPk).toHaveBeenCalledWith('123');
    expect(UserMongo.findById).toHaveBeenCalledWith('123');
    expect(mockSQLUser.isBlocked).toBe(true);
    expect(mockMongoUser.isBlocked).toBe(true);
    expect(mockSQLUser.save).toHaveBeenCalled();
    expect(mockMongoUser.save).toHaveBeenCalled();
    expect(sendAccountBlockedEmail).toHaveBeenCalledWith(mockSQLUser);
  });
});