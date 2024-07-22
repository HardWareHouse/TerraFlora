import User from '../modelsSQL/User.js';
import { sendPreferenceUpdateEmail } from '../emailConfig.js';
import * as emailPreferenceService from '../services/emailPreferenceService.js'


// Update wantsMailNewProduct
export const updateWantsMailNewProduct = async (req, res) => {
  const { wantsMailNewProduct } = req.body;
  if (wantsMailNewProduct === undefined) {
    return res.status(400).json({ message: 'wantsMailNewProduct is required' });
  }

  try {
    const user = await User.findByPk(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.wantsMailNewProduct = wantsMailNewProduct;

    if (user.wantsMailNewProduct) {
      sendPreferenceUpdateEmail(user, 'nouveaux produits');
    }

    await user.save();
    await emailPreferenceService.updateUserMongoWantsMailNewProduct(user.id, wantsMailNewProduct);

    res.status(200).json({ message: 'Email preference for new product updated successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Update wantsMailRestockProduct
export const updateWantsMailRestockProduct = async (req, res) => {
  const { wantsMailRestockProduct } = req.body;
  if (wantsMailRestockProduct === undefined) {
    return res.status(400).json({ message: 'wantsMailRestockProduct is required' });
  }

  try {
    const user = await User.findByPk(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.wantsMailRestockProduct = wantsMailRestockProduct;

    if (user.wantsMailRestockProduct) {
      sendPreferenceUpdateEmail(user, 'restock de produit');
    }

    await user.save();
    await emailPreferenceService.updateUserMongoWantsMailRestockProduct(user.id, wantsMailRestockProduct);

    res.status(200).json({ message: 'Email preference for restock product updated successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update wantsMailChangingPrice
export const updateWantsMailChangingPrice = async (req, res) => {
  const { wantsMailChangingPrice } = req.body;
  if (wantsMailChangingPrice === undefined) {
    return res.status(400).json({ message: 'wantsMailChangingPrice is required' });
  }

  try {
    const user = await User.findByPk(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.wantsMailChangingPrice = wantsMailChangingPrice;

    if (user.wantsMailChangingPrice) {
      sendPreferenceUpdateEmail(user, 'prix');
    }

    await user.save();
    await emailPreferenceService.updateUserMongoWantsMailChangingPrice(user.id, wantsMailChangingPrice);

    res.status(200).json({ message: 'Email preference for changing price updated successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update wantsMailNewsletter
export const updateWantsMailNewsletter = async (req, res) => {
  const { wantsMailNewsletter } = req.body;
  if (wantsMailNewsletter === undefined) {
    return res.status(400).json({ message: 'wantsMailNewsletter is required' });
  }

  try {
    const user = await User.findByPk(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.wantsMailNewsletter = wantsMailNewsletter;

    if (user.wantsMailNewsletter) {
      sendPreferenceUpdateEmail(user, 'newsletter');
    }

    await user.save();
    await emailPreferenceService.updateUserMongoWantsMailNewsletter(user.id, wantsMailNewsletter);

    res.status(200).json({ message: 'Email preference for newsletter updated successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
