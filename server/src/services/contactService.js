import ContactSQL from "../modelsSQL/Contact.js";
import ContactMongo from "../modelsMongo/Contact.mongo.js";
import User from "../modelsSQL/User.js";

const getContactWithAlias = async (id) => {
    return await ContactMongo.aggregate([
      { $match: { _id: id } },
      {
        $project: {
          id: '$_id',
          subject: 1,
          message: 1,
          email: 1,
          dateContact: 1,
          status: 1,
          response: 1,
          dateResponse: 1,
          isResponded: 1,
          user: 1,
          _id: 0
        }
      }
    ]).then(results => results[0] || null);
  };

export const getAllContacts = async () => {
    return await ContactMongo.find().select({
        id: '$_id',
        subject: 1,
        message: 1,
        email: 1,
        dateContact: 1,
        status: 1,
        response: 1,
        dateResponse: 1,
        isResponded: 1,
        user: 1,
        _id: 0
      });
};

export const getContactById = async (id) => {
    return getContactWithAlias(id);
};

export const createContact = async (data) => {
    const { userId, subject, message, email } = data;
    try {
        const contactSQL = await ContactSQL.create({ userId, subject, message, email });
        if (!contactSQL) throw new Error("Contact not created");

        const user = await User.findByPk(userId);
        if (!user) throw new Error("User not found");
        
        
        await ContactMongo.create({
            _id: contactSQL.id,
            subject,
            message,
            email,
            dateContact: contactSQL.dateContact,
            status: contactSQL.status,
            response: contactSQL.response,
            dateResponse: contactSQL.dateResponse,
            isResponded: contactSQL.isResponded,
            user: {
                _id: user.id,
                nom: user.nom,
                prenom: user.prenom,
                email: user.email,
            },
        });
        return getContactWithAlias(contactSQL.id);
    } catch (error) {
        throw new Error(error);
    }
};

export const updateContact = async (id, data) => {
    const { subject, message, email, response } = data;
    try {
        const contact = await ContactSQL.findByPk(id);
        if (contact) {
            const isResponded = !!response;
            const dateResponse = isResponded ? new Date() : null;

            await contact.update({ subject, message, email, response, isResponded, dateResponse });

            const updatedContact = {};
            if (subject) updatedContact.subject = subject;
            if (message) updatedContact.message = message;
            if (email) updatedContact.email = email;
            if (response) updatedContact.response = response;
            if (isResponded) updatedContact.isResponded = isResponded;
            if (dateResponse) updatedContact.dateResponse = dateResponse;

            await ContactMongo.findByIdAndUpdate(id, { $set: updatedContact }, { new: true });
            return getContactWithAlias(id);
        } else {
            return null;
        }
    } catch (error) {
        throw new Error(error);
    }
};


export const deleteContact = async (id) => {
    try {
        const contact = await ContactSQL.findByPk(id);
        if (contact) {
            await contact.destroy();
            await ContactMongo.findByIdAndDelete(id);
            return true;
        } else return false;
    } catch (error) {
        console.error('Error deleting contact:', error);
        throw new Error('Failed to delete address');
    }
};
