import * as contactService from "../../services/contactService.js";
import ContactSQL from "../../modelsSQL/Contact.js";
import ContactMongo from "../../modelsMongo/Contact.mongo.js";
import User from "../../modelsSQL/User.js";

jest.mock("../../modelsSQL/Contact.js");
jest.mock("../../modelsMongo/Contact.mongo.js");
jest.mock("../../modelsSQL/User.js");

describe("contactService", () => {
  describe("getAllContacts", () => {
    it("should return all contacts", async () => {
      const mockContacts = [{ id: 1, subject: "Test" }];
      ContactMongo.find.mockResolvedValue(mockContacts);

      const result = await contactService.getAllContacts();

      expect(ContactMongo.find).toHaveBeenCalledWith({}, {
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
      expect(result).toEqual(mockContacts);
    });
  });

  describe("createContact", () => {
    it("should create a new contact", async () => {
      const mockContactSQL = { id: 1, subject: "Test" };
      const mockUser = { id: 1, nom: "John", prenom: "Doe", email: "john.doe@example.com" };
      ContactSQL.create.mockResolvedValue(mockContactSQL);
      User.findByPk.mockResolvedValue(mockUser);

      const data = {
        subject: "Test",
        message: "Message",
        email: "test@example.com",
        userId: 1,
      };
      ContactMongo.create.mockResolvedValue(mockContactSQL);
      const result = await contactService.createContact(data);

      expect(ContactSQL.create).toHaveBeenCalledWith(data);
      expect(User.findByPk).toHaveBeenCalledWith(1);
      expect(ContactMongo.create).toHaveBeenCalledWith({
        _id: 1,
        subject: "Test",
        message: "Message",
        email: "test@example.com",
        dateContact: undefined,
        status: undefined,
        response: undefined,
        dateResponse: undefined,
        isResponded: undefined,
        user: {
          _id: 1,
          nom: "John",
          prenom: "Doe",
          email: "john.doe@example.com",
        },
      });
      expect(result).toEqual(mockContactSQL);
    });
  });

  describe("getContactById", () => {
    it("should return the contact if found", async () => {
      const mockContact = { id: 1, subject: "Test" };
      ContactMongo.aggregate.mockResolvedValue([{ ...mockContact }]);

      const result = await contactService.getContactById(1);

      expect(ContactMongo.aggregate).toHaveBeenCalledWith([
        { $match: { _id: 1 } },
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
      ]);
      expect(result).toEqual(mockContact);
    });

    it("should return null if contact not found", async () => {
      ContactMongo.aggregate.mockResolvedValue([]);

      const result = await contactService.getContactById(1);

      expect(ContactMongo.aggregate).toHaveBeenCalledWith([
        { $match: { _id: 1 } },
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
      ]);
      expect(result).toBeNull();
    });
  });

  describe("updateContact", () => {
    it("should update the contact if found", async () => {
      const mockContactSQL = {
        id: 1,
        subject: "Test",
        update: jest.fn().mockResolvedValue({ id: 1, subject: "Updated Test" })
      };
      ContactSQL.findByPk.mockResolvedValue(mockContactSQL);
      
      const updatedContact = { id: 1, subject: "Updated Test" };
      ContactMongo.findByIdAndUpdate.mockResolvedValue(updatedContact);

      const data = { subject: "Updated Test" };
      const result = await contactService.updateContact(1, data);

      expect(ContactSQL.findByPk).toHaveBeenCalledWith(1);
      expect(mockContactSQL.update).toHaveBeenCalledWith({ 
        subject: "Updated Test",
        message: undefined,
        email: undefined,
        response: undefined,
        isResponded: false,
        dateResponse: null
      });
      expect(ContactMongo.findByIdAndUpdate).toHaveBeenCalledWith(
        1,
        { $set: { 
          subject: "Updated Test",
          message: undefined,
          email: undefined,
          response: undefined,
          isResponded: false,
          dateResponse: null
        }},
        { new: true }
      );
      expect(result).toEqual(updatedContact);
    });

    it("should throw an error if contact not found", async () => {
      ContactSQL.findByPk.mockResolvedValue(null);

      await expect(
        contactService.updateContact(1, { subject: "Updated Test" })
      ).rejects.toThrow("Contact not found");
    });
  });

  describe("deleteContact", () => {
    it("should delete the contact if found", async () => {
      const mockContact = { id: 1, destroy: jest.fn().mockResolvedValue() };
      ContactSQL.findByPk.mockResolvedValue(mockContact);

      await contactService.deleteContact(1);

      expect(ContactSQL.findByPk).toHaveBeenCalledWith(1);
      expect(mockContact.destroy).toHaveBeenCalled();
      expect(ContactMongo.findByIdAndDelete).toHaveBeenCalledWith(1);
    });

    it("should throw an error if contact not found", async () => {
      ContactSQL.findByPk.mockResolvedValue(null);

      await expect(contactService.deleteContact(1)).rejects.toThrow(
        "Contact not found"
      );
    });
  });
});
