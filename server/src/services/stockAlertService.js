import Produit from '../modelsSQL/Produit.js';
import { getAllUsers } from './userService.js';
import { sendAlertEmailNoStock, sendAlertEmailLowStock } from '../emailConfig.js';


export const checkStockLevels = async () => {
  const products = await Produit.findAll();

  for (const product of products) {
    if (product.stock <= product.stockThreshold) {
      const users = await getAllUsers();
      for (const user of users) {
        if (product.stock === 0) {
          await sendAlertEmailNoStock(user, `Le produit "${product.nom}" est en rupture de stock.`);
        } else {
          await sendAlertEmailLowStock(user, `Le produit "${product.nom}" a un stock faible (${product.stock} restants).`);
        }
      }
    }
  }
};
