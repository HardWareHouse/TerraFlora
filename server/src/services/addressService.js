import AdresseSQL from '../modelsSQL/Adresse.js';
import AdresseMongo from '../modelsMongo/Adresse.mongo.js';
import User from '../modelsSQL/User.js';

const getAddressWithAlias = async (id) => {
  return await AdresseMongo.aggregate([
    { $match: { _id: id } },
    {
      $project: {
        id: '$_id',
        voie: 1,
        rue: 1,
        numero: 1,
        ville: 1,
        codePostal: 1,
        isDeliveryAddress: 1,
        isBillingAddress: 1,
        user: 1,
        _id: 0
      }
    }
  ]).then(results => results[0] || null);
};

export const getAllAddresses = async () => {
  return await AdresseMongo.find().select({
    id: '$_id',
    voie: 1,
    rue: 1,
    numero: 1,
    ville: 1,
    codePostal: 1,
    isDeliveryAddress: 1,
    isBillingAddress: 1,
    user: 1,
    _id: 0
  });
};

export const getAddressById = async (id) => {
  return getAddressWithAlias(id);
};

export const createAddress = async (data) => {
  const { userId, voie, rue, numero, ville, codePostal, isDeliveryAddress, isBillingAddress } = data;
  
  try {
    const addressSQL = await AdresseSQL.create({ userId, voie, rue, numero, ville, codePostal, isDeliveryAddress, isBillingAddress });
    const user = await User.findByPk(userId);
    
    await AdresseMongo.create({
      _id: addressSQL.id,
      voie,
      rue,
      numero,
      ville,
      codePostal,
      isDeliveryAddress,
      isBillingAddress,
      user: {
        _id: user.id,
        nom: user.nom,
        prenom: user.prenom,
        email: user.email,
      },
    });

    return getAddressWithAlias(addressSQL.id);
  } catch (error) {
    console.error('Error creating address:', error);
    throw new Error('Failed to create address');
  }
};


export const getAddressByUserId = async (userId) => {
  const adresse = await AdresseMongo.aggregate([
    { $match: { 'user._id': userId } },
    { 
      $project: {
        id: '$_id',
        voie: 1,
        rue: 1,
        numero: 1,
        ville: 1,
        codePostal: 1,
        isDeliveryAddress: 1,
        isBillingAddress: 1,
        _id: 0
      }
    }
  ]);
  
  return adresse.length ? adresse[0] : null;
};

export const updateAddressById = async (id, data) => {
  try {
    const addressSQL = await AdresseSQL.findByPk(id);
    if (addressSQL) {
      await addressSQL.update(data);

      const updatedAddress = {};
      if (data.voie) updatedAddress.voie = data.voie;
      if (data.rue) updatedAddress.rue = data.rue;
      if (data.numero) updatedAddress.numero = data.numero;
      if (data.ville) updatedAddress.ville = data.ville;
      if (data.codePostal) updatedAddress.codePostal = data.codePostal;
      if (data.isDeliveryAddress != undefined) updatedAddress.isDeliveryAddress = data.isDeliveryAddress;
      if (data.isBillingAddress != undefined) updatedAddress.isBillingAddress = data.isBillingAddress;  

      await AdresseMongo.findByIdAndUpdate(id, { $set: updatedAddress }, { new: true });
      return getAddressWithAlias(id);
    }
    return null;
  } catch (error) {
    console.error('Error updating address:', error);
    throw new Error('Failed to update address');
  }
};

export const deleteAddressById = async (id) => {
  try {
    const addressSQL = await AdresseSQL.findByPk(id);
    if (addressSQL) {
      await addressSQL.destroy();
      await AdresseMongo.findByIdAndDelete(id);
      return { message: 'Address deleted' };
    }
    return null;
  } catch (error) {
    console.error('Error deleting address:', error);
    throw new Error('Failed to delete address');
  }
};
