import { checkStockLevels } from '../../services/stockAlertService';
import Produit from '../../modelsSQL/Produit';
import { getAllUsers } from '../../services/userService';
import { sendAlertEmailNoStock, sendAlertEmailLowStock } from '../../emailConfig';

jest.mock('../../modelsSQL/Produit');
jest.mock('../../services/userService');
jest.mock('../../emailConfig');

describe('Stock Alert Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should not send alerts when stock is above threshold', async () => {
    Produit.findAll.mockResolvedValue([
      { nom: 'Produit 1', stock: 10, stockThreshold: 5 }
    ]);

    await checkStockLevels();

    expect(getAllUsers).not.toHaveBeenCalled();
    expect(sendAlertEmailNoStock).not.toHaveBeenCalled();
    expect(sendAlertEmailLowStock).not.toHaveBeenCalled();
  });

  it('should send low stock alerts when stock is at threshold', async () => {
    Produit.findAll.mockResolvedValue([
      { nom: 'Produit 1', stock: 5, stockThreshold: 5 }
    ]);
    getAllUsers.mockResolvedValue([
      { role: 'ROLE_STORE_KEEPER', email: 'storekeeper@test.com' },
      { role: 'ROLE_ADMIN', email: 'admin@test.com' },
      { role: 'ROLE_USER', email: 'user@test.com' }
    ]);

    await checkStockLevels();

    expect(sendAlertEmailLowStock).toHaveBeenCalledTimes(2);
    expect(sendAlertEmailLowStock).toHaveBeenCalledWith(
      expect.objectContaining({ role: 'ROLE_STORE_KEEPER' }),
      'Le produit "Produit 1" a un stock faible (5 restants).'
    );
    expect(sendAlertEmailLowStock).toHaveBeenCalledWith(
      expect.objectContaining({ role: 'ROLE_ADMIN' }),
      'Le produit "Produit 1" a un stock faible (5 restants).'
    );
  });

  it('should send no stock alerts when stock is zero', async () => {
    Produit.findAll.mockResolvedValue([
      { nom: 'Produit 1', stock: 0, stockThreshold: 5 }
    ]);
    getAllUsers.mockResolvedValue([
      { role: 'ROLE_STORE_KEEPER', email: 'storekeeper@test.com' },
      { role: 'ROLE_ADMIN', email: 'admin@test.com' },
      { role: 'ROLE_USER', email: 'user@test.com' }
    ]);

    await checkStockLevels();

    expect(sendAlertEmailNoStock).toHaveBeenCalledTimes(2);
    expect(sendAlertEmailNoStock).toHaveBeenCalledWith(
      expect.objectContaining({ role: 'ROLE_STORE_KEEPER' }),
      'Le produit "Produit 1" est en rupture de stock.'
    );
    expect(sendAlertEmailNoStock).toHaveBeenCalledWith(
      expect.objectContaining({ role: 'ROLE_ADMIN' }),
      'Le produit "Produit 1" est en rupture de stock.'
    );
  });

  it('should handle multiple products with different stock levels', async () => {
    Produit.findAll.mockResolvedValue([
      { nom: 'Produit 1', stock: 10, stockThreshold: 5 },
      { nom: 'Produit 2', stock: 3, stockThreshold: 5 },
      { nom: 'Produit 3', stock: 0, stockThreshold: 5 }
    ]);
    getAllUsers.mockResolvedValue([
      { role: 'ROLE_STORE_KEEPER', email: 'storekeeper@test.com' },
      { role: 'ROLE_ADMIN', email: 'admin@test.com' }
    ]);

    await checkStockLevels();

  });
});