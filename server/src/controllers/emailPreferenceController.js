import User from '../modelsSQL/User.js';
import { sendPreferenceUpdateEmail } from '../emailConfig.js';

// Update wantsMailNewProduct
export const updateWantsMailNewProduct = async (req, res) => {
  const { wantsMailNewProduct } = req.body;

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

    res.status(200).json({ message: 'Email preference for new product updated successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update wantsMailRestockProduct
export const updateWantsMailRestockProduct = async (req, res) => {
  const { wantsMailRestockProduct } = req.body;

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

    res.status(200).json({ message: 'Email preference for restock product updated successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update wantsMailChangingPrice
export const updateWantsMailChangingPrice = async (req, res) => {
  const { wantsMailChangingPrice } = req.body;

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

    res.status(200).json({ message: 'Email preference for changing price updated successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update wantsMailNewsletter
export const updateWantsMailNewsletter = async (req, res) => {
  const { wantsMailNewsletter } = req.body;

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

    res.status(200).json({ message: 'Email preference for newsletter updated successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
