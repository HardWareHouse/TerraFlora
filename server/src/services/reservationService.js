import TempReservation from '../modelsSQL/TempReservation.js';
import Produit from '../modelsSQL/Produit.js';
import { Op } from 'sequelize';

// Vérifier les réservations expirées et restaurer le stock
export const checkExpiredReservations = async () => {
  const tenSecondsAgo = new Date(Date.now() - 10 * 1000);

  const expiredReservations = await TempReservation.findAll({
    where: {
      reservedAt: {
        [Op.lte]: tenSecondsAgo
      }
    }
  });

  for (const reservation of expiredReservations) {
    const product = await Produit.findByPk(reservation.produitId);

    if (product) {
      product.stock += reservation.quantity;
      await product.save();
    }

    console.log(`Reservation for product ${reservation.produitId} expired. Restocked ${reservation.quantity} units.`);

    await reservation.destroy();
  }
};
