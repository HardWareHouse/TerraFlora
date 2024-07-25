import { verifyToken } from '../../middlewares/tokenMiddleware';
import User from '../../modelsSQL/User';
import jwt from 'jsonwebtoken';

jest.mock('../../modelsSQL/User');
jest.mock('jsonwebtoken');

describe('Token Middleware', () => {
  let req, res;

  beforeEach(() => {
    req = {
      header: jest.fn(),
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    process.env.LOGIN_JWT_KEY = 'test_secret_key';
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return 401 if no Authorization header is present', async () => {
    req.header.mockReturnValue(null);

    await verifyToken(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
  });

  it('should return 401 if token is missing', async () => {
    req.header.mockReturnValue('Bearer ');

    await verifyToken(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: 'Access denied.' });
  });

  it('should return 401 if token verification fails', async () => {
    req.header.mockReturnValue('Bearer invalid_token');
    jwt.verify.mockImplementation(() => {
      throw new Error('Invalid token');
    });

    await verifyToken(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
  });

  it('should return 401 if decoded token is invalid', async () => {
    req.header.mockReturnValue('Bearer valid_token');
    jwt.verify.mockReturnValue(null);

    await verifyToken(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: 'Access denied.' });
  });

  it('should return 401 if user is not found', async () => {
    req.header.mockReturnValue('Bearer valid_token');
    jwt.verify.mockReturnValue({ id: 'user_id' });
    User.findByPk.mockResolvedValue(null);

    await verifyToken(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: 'Access denied.' });
  });

  it('should return 200 with user id and role if token is valid', async () => {
    req.header.mockReturnValue('Bearer valid_token');
    jwt.verify.mockReturnValue({ id: 'user_id' });
    User.findByPk.mockResolvedValue({ id: 'user_id', role: 'USER' });

    await verifyToken(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ userId: 'user_id', userRole: 'USER' });
  });
});