import Contact from "../modelsSQL/Contact.js";
import User from "../modelsSQL/User.js";

export const getAllContacts = async () => {
    return await Contact.findAll({
        attributes: { exclude: ["createdAt", "updatedAt", "userId"] },
    });
}

export const createContact = async (data) => {
    return await Contact.create(data);
};

export const getContactById = async (id) => {
    return await Contact.findByPk(id);
};

export const updateContact = async (id, data) => {
    const contact = await Contact.findByPk(id);
    if (!contact) {
        throw new Error("Contact not found");
    }
    return await contact.update(data);
};

export const deleteContact = async (id) => {
    const contact = await Contact.findByPk(id);
    if (!contact) {
        throw new Error("Contact not found");
    }
    return await contact.destroy();
};
