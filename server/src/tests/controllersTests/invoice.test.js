import * as invoiceController from '../../controllers/invoiceController';
import * as invoiceService from '../../services/invoiceService';
import { isValidUUID } from '../../helpers/validatorHelper';

jest.mock('../../services/invoiceService');
jest.mock('../../helpers/validatorHelper');

describe('Invoice Controller', () => {
  let req, res;

  beforeEach(() => {
    jest.clearAllMocks();
    req = {
      body: {},
      user: { role: 'ROLE_ADMIN' },
      query: {},
      params: {}
    };
    res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
  });

  describe('getInvoice', () => {
    it('should return 400 if ID is invalid or missing', async () => {
      isValidUUID.mockReturnValue(false);

      await invoiceController.getInvoice(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Invalid or missing invoice ID' });
    });

    it('should return 404 if invoice is not found', async () => {
      isValidUUID.mockReturnValue(true);
      invoiceService.getInvoiceById.mockResolvedValue(null);

      req.params.id = 'valid-uuid';
      await invoiceController.getInvoice(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Invoice not found' });
    });

    it('should return 403 if user is not authorized', async () => {
      isValidUUID.mockReturnValue(true);
      invoiceService.getInvoiceById.mockResolvedValue({ user: { _id: 'different-user-id' } });

      req.params.id = 'valid-uuid';
      req.user = { id: 'user-id', role: 'ROLE_USER' };
      await invoiceController.getInvoice(req, res);

      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.json).toHaveBeenCalledWith({ error: 'Unauthorized' });
    });

    it('should return invoice data if user is authorized', async () => {
      isValidUUID.mockReturnValue(true);
      const mockInvoice = { user: { _id: 'user-id' } };
      invoiceService.getInvoiceById.mockResolvedValue(mockInvoice);

      req.params.id = 'valid-uuid';
      req.user = { id: 'user-id', role: 'ROLE_USER' };
      await invoiceController.getInvoice(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockInvoice);
    });

    it('should handle errors', async () => {
      isValidUUID.mockReturnValue(true);
      invoiceService.getInvoiceById.mockRejectedValue(new Error('Database error'));

      req.params.id = 'valid-uuid';
      await invoiceController.getInvoice(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Database error' });
    });
  });

  describe('getAllInvoices', () => {
    it('should return all invoices for admin user', async () => {
      const mockInvoices = [{ id: 1 }, { id: 2 }];
      invoiceService.getAllInvoices.mockResolvedValue(mockInvoices);

      req.user.role = 'ROLE_ADMIN';
      await invoiceController.getAllInvoices(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockInvoices);
    });

    it('should return invoices for the logged-in user', async () => {
      const mockInvoices = [{ id: 1 }];
      invoiceService.getInvoicesByUserId.mockResolvedValue(mockInvoices);

      req.user.role = 'ROLE_USER';
      req.user.id = 'user-id';
      await invoiceController.getAllInvoices(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockInvoices);
    });

    it('should handle errors', async () => {
      invoiceService.getAllInvoices.mockRejectedValue(new Error('Database error'));

      req.user.role = 'ROLE_ADMIN';
      await invoiceController.getAllInvoices(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Database error' });
    });
  });

  describe('createInvoice', () => {
    it('should return 400 if required fields are missing', async () => {
      await invoiceController.createInvoice(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'User ID, Cart ID and Total are required' });
    });

    it('should return 403 if user is not authorized', async () => {
      req.body = { userId: 'different-user-id', numero: '123', commandeId: 'cmd123', total: 100, invoiceUrl: 'url' };
      req.user.id = 'user-id';

      await invoiceController.createInvoice(req, res);

      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.json).toHaveBeenCalledWith({ error: 'Unauthorized' });
    });

    it('should create invoice successfully', async () => {
      req.body = { userId: 'user-id', numero: '123', commandeId: 'cmd123', total: 100, invoiceUrl: 'url' };
      req.user.id = 'user-id';
      const mockInvoice = { id: 'inv123' };
      invoiceService.createInvoice.mockResolvedValue(mockInvoice);

      await invoiceController.createInvoice(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(mockInvoice);
    });

    it('should handle errors', async () => {
      req.body = { userId: 'user-id', numero: '123', commandeId: 'cmd123', total: 100, invoiceUrl: 'url' };
      req.user.id = 'user-id';
      invoiceService.createInvoice.mockRejectedValue(new Error('Database error'));

      await invoiceController.createInvoice(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Database error' });
    });
  });

});
