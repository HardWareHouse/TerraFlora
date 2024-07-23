import UserSQL from '../modelsSQL/User.js';
import UserMongo from "../modelsMongo/User.mongo.js";
import { isValidUUID } from "../helpers/validatorHelper.js";
import { sendPreferenceUpdateEmail } from '../emailConfig.js';

const formatPreferenceName = (key) => {
  switch (key) {
    case 'wantsMailNewProduct':
      return 'Nouveaux produits';
    case 'wantsMailRestockProduct':
      return 'Restock de produit';
    case 'wantsMailChangingPrice':
      return 'Changement de prix';
    case 'wantsMailNewsletter':
      return 'Newsletter';
    default:
      return 'Préférence';
  }
};

export const updateMailPreference = async (req, res) => {
  const { wantsMailNewProduct, wantsMailRestockProduct, wantsMailChangingPrice, wantsMailNewsletter } = req.body;
  const { userId } = req.params;

  if (!userId || !isValidUUID(userId)) {
    return res.status(400).json({ message: 'Invalid or missing User ID' });
  }

  if (wantsMailNewProduct === undefined && wantsMailRestockProduct === undefined &&
      wantsMailChangingPrice === undefined && wantsMailNewsletter === undefined) {
    return res.status(400).json({ message: 'At least one preference is required' });
  }

  try {
    const user = await UserSQL.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const userMongo = await UserMongo.findOne({ _id: userId });
    if (!userMongo) {
      return res.status(404).json({ message: 'User not found' });
    }

    let preferencesUpdated = false;

    const updatePreferences = [
      { key: 'wantsMailNewProduct', value: wantsMailNewProduct },
      { key: 'wantsMailRestockProduct', value: wantsMailRestockProduct },
      { key: 'wantsMailChangingPrice', value: wantsMailChangingPrice },
      { key: 'wantsMailNewsletter', value: wantsMailNewsletter }
    ];

    for (const { key, value } of updatePreferences) {
      if (value !== undefined && value !== user[key]) {
        user[key] = value;
        userMongo[key] = value;
        preferencesUpdated = true;
        const formattedPreferenceName = formatPreferenceName(key);
        sendPreferenceUpdateEmail(user, formattedPreferenceName);
      }
    }

    if (!preferencesUpdated) {
      return res.status(400).json({ message: 'No changes detected' });
    }

    await user.save();
    await userMongo.save();
    res.status(200).json({ message: 'Email preferences updated successfully' });
  } catch (error) {
    console.error('Error updating email preferences:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
