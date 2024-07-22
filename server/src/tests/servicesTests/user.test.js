import { deleteUserById } from "../../services/userService";
import User from "../../modelsSQL/User";
import DeletedUser from "../../modelsSQL/DeletedUsers";

jest.mock("../../modelsSQL/User");
jest.mock("../../modelsSQL/DeletedUsers");

describe("deleteUserById", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should delete a user and move data to DeletedUser", async () => {
    const mockUser = {
      id: "123",
      nom: "John",
      prenom: "Doe",
      email: "john.doe@example.com",
      password: "hashedpassword",
      telephone: "1234567890",
      role: "ROLE_USER",
      toJSON: jest.fn().mockReturnValue({
        id: "123",
        nom: "John",
        prenom: "Doe",
        email: "john.doe@example.com",
        password: "hashedpassword",
        telephone: "1234567890",
        role: "ROLE_USER",
      }),
      destroy: jest.fn().mockResolvedValue(true),
    };

    // Mock User.findByPk to return the mock user
    User.findByPk = jest.fn().mockResolvedValue(mockUser);

    // Mock DeletedUser.create
    DeletedUser.create = jest.fn().mockResolvedValue(mockUser);

    // Call the function
    const result = await deleteUserById("123");

    // Assertions
    expect(User.findByPk).toHaveBeenCalledWith("123");
    expect(DeletedUser.create).toHaveBeenCalledWith({
      nom: "John",
      prenom: "Doe",
      email: "john.doe@example.com",
      password: "hashedpassword",
      telephone: "1234567890",
      role: "ROLE_USER",
    });
    expect(mockUser.destroy).toHaveBeenCalled();
    expect(result).toEqual(mockUser);
  });

  it("should return null if the user is not found", async () => {
    // Mock User.findByPk to return null
    User.findByPk = jest.fn().mockResolvedValue(null);

    // Call the function
    const result = await deleteUserById("123");

    // Assertions
    expect(User.findByPk).toHaveBeenCalledWith("123");
    expect(DeletedUser.create).not.toHaveBeenCalled();
    expect(result).toBeNull();
  });

  it("should handle errors during deletion or creation", async () => {
    const mockUser = {
      id: "123",
      nom: "John",
      prenom: "Doe",
      email: "john.doe@example.com",
      password: "hashedpassword",
      telephone: "1234567890",
      role: "ROLE_USER",
      toJSON: jest.fn().mockReturnValue({
        id: "123",
        nom: "John",
        prenom: "Doe",
        email: "john.doe@example.com",
        password: "hashedpassword",
        telephone: "1234567890",
        role: "ROLE_USER",
      }),
      destroy: jest.fn().mockResolvedValue(true),
    };

    // Mock User.findByPk to return the mock user
    User.findByPk = jest.fn().mockResolvedValue(mockUser);

    // Mock DeletedUser.create to throw an error
    DeletedUser.create = jest
      .fn()
      .mockRejectedValue(new Error("Failed to create"));

    // Call the function and expect it to throw an error
    await expect(deleteUserById("123")).rejects.toThrow("Failed to create");

    // Assertions
    expect(User.findByPk).toHaveBeenCalledWith("123");
    expect(DeletedUser.create).toHaveBeenCalledWith({
      nom: "John",
      prenom: "Doe",
      email: "john.doe@example.com",
      password: "hashedpassword",
      telephone: "1234567890",
      role: "ROLE_USER",
    });
    expect(mockUser.destroy).not.toHaveBeenCalled();
  });
});
