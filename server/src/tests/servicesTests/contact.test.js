import * as contactService from "../../services/contactService";
import Contact from "../../modelsSQL/Contact"; // Adjust the path as necessary

jest.mock("../../modelsSQL/Contact.js", () => ({
  findByPk: jest.fn(),
  create: jest.fn(),
  destroy: jest.fn(),
}));
jest.mock("../../modelsMongo/Contact.mongo.js", () => ({
  find: jest.fn().mockReturnValue({
    select: jest.fn().mockResolvedValue([]),
  }),
  aggregate: jest.fn(),
  findByIdAndUpdate: jest.fn(),
  findByIdAndDelete: jest.fn(),
}));

describe("contactService", () => {
  describe("getAllContacts", () => {
    it("should return all contacts without createdAt, updatedAt, and userId attributes", async () => {
      const mockContacts = [{ id: 1, subject: "Test" }];
      Contact.findAll.mockResolvedValue(mockContacts);

      const result = await contactService.getAllContacts();

      expect(Contact.findAll).toHaveBeenCalledWith({
        attributes: { exclude: ["createdAt", "updatedAt", "userId"] },
      });
      expect(result).toEqual(mockContacts);
    });
  });

  describe("createContact", () => {
    it("should create a new contact", async () => {
      const mockContact = { id: 1, subject: "Test" };
      Contact.create.mockResolvedValue(mockContact);

      const data = {
        subject: "Test",
        message: "Message",
        email: "test@example.com",
        userId: 1,
      };
      const result = await contactService.createContact(data);

      expect(Contact.create).toHaveBeenCalledWith(data);
      expect(result).toEqual(mockContact);
    });
  });

  describe("getContactById", () => {
    it("should return the contact if found", async () => {
      const mockContact = { id: 1, subject: "Test" };
      Contact.findByPk.mockResolvedValue(mockContact);

      const result = await contactService.getContactById(1);

      expect(Contact.findByPk).toHaveBeenCalledWith(1);
      expect(result).toEqual(mockContact);
    });

    it("should return null if contact not found", async () => {
      Contact.findByPk.mockResolvedValue(null);

      const result = await contactService.getContactById(1);

      expect(Contact.findByPk).toHaveBeenCalledWith(1);
      expect(result).toBeNull();
    });
  });

  describe("updateContact", () => {
    it("should update the contact if found", async () => {
      const mockContact = {
        id: 1,
        subject: "Test",
        update: jest.fn().mockResolvedValue({ id: 1, subject: "Updated Test" }),
      };
      Contact.findByPk.mockResolvedValue(mockContact);

      const data = { subject: "Updated Test" };
      const result = await contactService.updateContact(1, data);

      expect(Contact.findByPk).toHaveBeenCalledWith(1);
      expect(mockContact.update).toHaveBeenCalledWith(data);
      expect(result).toEqual({ id: 1, subject: "Updated Test" });
    });

    it("should throw an error if contact not found", async () => {
      Contact.findByPk.mockResolvedValue(null);

      await expect(
        contactService.updateContact(1, { subject: "Updated Test" })
      ).rejects.toThrow("Contact not found");
    });
  });

  describe("deleteContact", () => {
    it("should delete the contact if found", async () => {
      const mockContact = { id: 1, destroy: jest.fn().mockResolvedValue() };
      Contact.findByPk.mockResolvedValue(mockContact);

      await contactService.deleteContact(1);

      expect(Contact.findByPk).toHaveBeenCalledWith(1);
      expect(mockContact.destroy).toHaveBeenCalled();
    });

    it("should throw an error if contact not found", async () => {
      Contact.findByPk.mockResolvedValue(null);

      await expect(contactService.deleteContact(1)).rejects.toThrow(
        "Contact not found"
      );
    });
  });
});
