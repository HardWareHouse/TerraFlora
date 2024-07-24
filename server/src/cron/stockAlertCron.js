import cron from 'node-cron';
import { checkStockLevels } from '../services/stockAlertService.js';

// Vérification des stocks de produits toutes les heures dans la journée (à changer)
cron.schedule('* * * * *', async () => {
  console.log('Vérification des niveaux de stock...');
  await checkStockLevels();
});
