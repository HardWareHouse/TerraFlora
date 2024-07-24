import * as contactService from "../../services/contactService.js";
import ContactSQL from "../../modelsSQL/Contact.js";
import ContactMongo from "../../modelsMongo/Contact.mongo.js";
import User from "../../modelsSQL/User.js";

jest.mock("../../modelsSQL/Contact.js");
jest.mock("../../modelsMongo/Contact.mongo.js");
jest.mock("../../modelsSQL/User.js");

describe("contactService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getAllContacts", () => {
    it("should return all contacts", async () => {
      const mockContacts = [{ id: 1, subject: "Test" }];
      ContactMongo.find = jest.fn().mockReturnValue({
        select: jest.fn().mockResolvedValue(mockContacts)
      });

      const result = await contactService.getAllContacts();

      expect(ContactMongo.find).toHaveBeenCalled();
      expect(result).toEqual(mockContacts);
    });
  });

  describe("createContact", () => {
    it("should create a new contact", async () => {
      const mockContactSQL = { id: 1, subject: "Test" };
      const mockUser = { id: 1, nom: "John", prenom: "Doe", email: "john.doe@example.com" };
      ContactSQL.create.mockResolvedValue(mockContactSQL);
      User.findByPk.mockResolvedValue(mockUser);
      
      ContactMongo.aggregate = jest.fn().mockResolvedValue([mockContactSQL]);

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
      expect(ContactMongo.create).toHaveBeenCalled();
      expect(result).toEqual(mockContactSQL);
    });
  });

  describe("getContactById", () => {
    it("should return the contact if found", async () => {
      const mockContact = { id: 1, subject: "Test" };
      ContactMongo.aggregate.mockResolvedValue([mockContact]);

      const result = await contactService.getContactById(1);

      expect(ContactMongo.aggregate).toHaveBeenCalled();
      expect(result).toEqual(mockContact);
    });

    it("should return null if contact not found", async () => {
      ContactMongo.aggregate.mockResolvedValue([]);

      const result = await contactService.getContactById(1);

      expect(ContactMongo.aggregate).toHaveBeenCalled();
      expect(result).toBeNull();
    });
  });

  describe("updateContact", () => {
    it("should update the contact if found", async () => {
      const mockContactSQL = {
        id: 1,
        subject: "Test",
        message: "Message",
        email: "email@example.com",
        response: "Response",
        isResponded: false,
        dateResponse: null,
        update: jest.fn().mockResolvedValue(true)
      };
      
      ContactSQL.findByPk.mockResolvedValue(mockContactSQL);
      
      const updatedContact = {
        id: 1,
        subject: "Test",
        message: "Message",
        email: "email@example.com",
        response: "Response",
        isResponded: false,
        dateResponse: null
      };
      
      ContactMongo.findByIdAndUpdate.mockResolvedValue(updatedContact);
      
      const data = { subject: "Updated Test" };
      const result = await contactService.updateContact(1, data);
  
      expect(ContactSQL.findByPk).toHaveBeenCalledWith(1);
      expect(mockContactSQL.update).toHaveBeenCalled();
      expect(ContactMongo.findByIdAndUpdate).toHaveBeenCalledWith(1, { $set: updatedContact }, { new: true });
      expect(result).toBe(true);
    });
  
    it("should return null if contact not found", async () => {
      ContactSQL.findByPk.mockResolvedValue(null);
  
      const result = await contactService.updateContact(1, { subject: "Test" });
      expect(result).toBe(false);
    });
  });
  

  describe("deleteContact", () => {
    it("should delete the contact if found", async () => {
      const mockContact = { id: 1, destroy: jest.fn().mockResolvedValue() };
      ContactSQL.findByPk.mockResolvedValue(mockContact);

      const result = await contactService.deleteContact(1);

      expect(ContactSQL.findByPk).toHaveBeenCalledWith(1);
      expect(mockContact.destroy).toHaveBeenCalled();
      expect(ContactMongo.findByIdAndDelete).toHaveBeenCalledWith(1);
      expect(result).toBe(true);
    });

    it("should return false if contact not found", async () => {
      ContactSQL.findByPk.mockResolvedValue(null);

      const result = await contactService.deleteContact(1);
      expect(result).toBe(false);
    });
  });
});
