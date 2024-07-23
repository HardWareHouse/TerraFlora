import cron from 'node-cron';
import { checkExpiredReservations } from '../services/reservationService.js';

// Vérification des réservations expirées toutes les minutes
cron.schedule('* * * * *', async () => {
  console.log('Checking for expired reservations...');
  await checkExpiredReservations();
});
