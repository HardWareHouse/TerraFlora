import Adresse from "../modelsSQL/Adresse.js";

export const createAddress = async (data) => {
  return await Adresse.create(data);
};

export const getAddressById = async (id) => {
  return await Adresse.findByPk(id);
};

export const getAddressByUserId = async (userId) => {
  return await Adresse.findOne({
    where: { userId },
    attributes: { exclude: ["createdAt", "updatedAt"] }
  });
};

export const getAllAddresses = async () => {
  return await Adresse.findAll();
};

export const updateAddressById = async (id, data) => {
  const address = await Adresse.findByPk(id);
  if (address) {
    return await address.update(data);
  }
  return null;
};

export const deleteAddressById = async (id) => {
  const address = await Adresse.findByPk(id);
  if (address) {
    await address.destroy();
    return address;
  }
  return null;
};
