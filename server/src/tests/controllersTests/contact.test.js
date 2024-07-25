import { getContact } from "../../controllers/contactController.js";
import * as contactService from "../../services/contactService.js";
import { isValidUUID } from "../../helpers/validatorHelper.js";

jest.mock("../../services/contactService.js");
jest.mock("../../helpers/validatorHelper.js");

describe("getContact", () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      params: { id: "valid-uuid" },
      user: { id: "user-id", role: "ROLE_USER" },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  it("should return 400 if id is missing or invalid", async () => {
    req.params.id = null;
    isValidUUID.mockReturnValue(false);

    await getContact(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: "Invalid or missing contact ID" });
  });

  it("should return 404 if contact is not found", async () => {
    isValidUUID.mockReturnValue(true);
    contactService.getContactById.mockResolvedValue(null);

    await getContact(req, res, next);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: "Contact not found" });
  });

  it("should return 403 if user is not authorized", async () => {
    isValidUUID.mockReturnValue(true);
    contactService.getContactById.mockResolvedValue({ user: { _id: "another-user-id" } });

    await getContact(req, res, next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ error: "Unauthorized" });
  });

  it("should return 200 with contact data if contact is found and user is authorized", async () => {
    isValidUUID.mockReturnValue(true);
    const contact = { id: "valid-uuid", user: { _id: "user-id" } };
    contactService.getContactById.mockResolvedValue(contact);

    await getContact(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(contact);
  });

  it("should return 500 if there is an internal server error", async () => {
    isValidUUID.mockReturnValue(true);
    contactService.getContactById.mockRejectedValue(new Error("Internal Server Error"));

    await getContact(req, res, next);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Internal Server Error" });
  });
});
