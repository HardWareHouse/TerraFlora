import { login, register, confirmEmail, forgotPassword, resetPassword } from '../../controllers/authController.js';
import * as authService from '../../services/authService.js';
import { isPasswordValid, comparePasswords } from '../../helpers/passwordHelper.js';


jest.mock('../../services/authService.js');
jest.mock('../../helpers/passwordHelper.js');

describe('Auth Controller Tests', () => {
  let req, res;

  beforeEach(() => {
    req = {
      body: {},
      params: {}
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    jest.clearAllMocks();
  });

  describe('login', () => {
    it('should login a user successfully', async () => {
      req.body = { email: 'test@example.com', password: 'password123' };
      const mockUser = {
        id: '123',
        email: 'test@example.com',
        isVerified: true,
        isBlocked: false,
        lastUpdatedPassword: new Date()
      };
      authService.findUserByEmail.mockResolvedValue(mockUser);
      comparePasswords.mockResolvedValue(true);
      authService.generateToken.mockReturnValue('mocked-token');

      await login(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        loginToken: 'mocked-token',
        mailPreferenceToken: 'mocked-token'
      }));
    });

    it('should return 401 for invalid credentials', async () => {
      req.body = { email: 'test@example.com', password: 'wrongpassword' };
      authService.findUserByEmail.mockResolvedValue(null);

      await login(req, res);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ message: 'Email ou mot de passe invalide.' });
    });
  });

  describe('register', () => {
    it('should register a new user successfully', async () => {
      req.body = {
        nom: 'Doe',
        prenom: 'John',
        email: 'john@example.com',
        email_cfg: 'john@example.com',
        password: 'StrongP@ssw0rd',
        password_cfg: 'StrongP@ssw0rd',
        telephone: '1234567890',
        haveConsented: true
      };
      isPasswordValid.mockReturnValue(true);
      authService.findUserByEmail.mockResolvedValue(null);
      authService.createUser.mockResolvedValue({
        nom: 'Doe',
        prenom: 'John',
        email: 'john@example.com',
        telephone: '1234567890'
      });

      await register(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        msg: "Utilisateur créé avec succès. Veuillez vérifier votre email pour confirmer votre compte."
      }));
    });

    it('should return 400 for invalid registration data', async () => {
      req.body = {
        email: 'john@example.com',
        password: 'weak'
      };
      isPasswordValid.mockReturnValue(false);

      await register(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
    });
  });

  describe('confirmEmail', () => {
    it('should confirm user email successfully', async () => {
      req.params = { token: 'valid-token' };
      const mockUser = { id: '123', isVerified: false, save: jest.fn() };
      authService.verifyToken.mockReturnValue({ id: '123' });
      authService.findUserById.mockResolvedValue(mockUser);

      await confirmEmail(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ msg: "Email confirmé avec succès." });
      expect(mockUser.isVerified).toBe(true);
      expect(mockUser.save).toHaveBeenCalled();
    });

    it('should return 400 for invalid token', async () => {
      req.params = { token: 'invalid-token' };
      authService.verifyToken.mockImplementation(() => { throw new Error('Invalid token'); });

      await confirmEmail(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
    });
  });

  describe('forgotPassword', () => {
    it('should send reset password email', async () => {
      req.body = { email: 'test@example.com' };
      const mockUser = { id: '123', email: 'test@example.com' };
      authService.findUserByEmail.mockResolvedValue(mockUser);

      await forgotPassword(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ msg: "Email de réinitialisation envoyé." });
      expect(authService.handlePasswordReset).toHaveBeenCalledWith(mockUser);
    });

    it('should return 400 for non-existent email', async () => {
      req.body = { email: 'nonexistent@example.com' };
      authService.findUserByEmail.mockResolvedValue(null);

      await forgotPassword(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
    });
  });

  describe('resetPassword', () => {
    it('should reset password successfully', async () => {
      req.params = { token: 'valid-token' };
      req.body = { password: 'NewStrongP@ssw0rd', password_cfg: 'NewStrongP@ssw0rd' };
      const mockUser = { id: '123', save: jest.fn() };
      authService.verifyToken.mockReturnValue({ id: '123' });
      authService.findUserById.mockResolvedValue(mockUser);
      isPasswordValid.mockReturnValue(true);

      await resetPassword(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ msg: "Mot de passe réinitialisé avec succès." });
      expect(mockUser.save).toHaveBeenCalled();
    });

    it('should return 400 for invalid password', async () => {
      req.params = { token: 'valid-token' };
      req.body = { password: 'weak', password_cfg: 'weak' };
      authService.verifyToken.mockReturnValue({ id: '123' });
      isPasswordValid.mockReturnValue(false);

      await resetPassword(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
    });
  });
});