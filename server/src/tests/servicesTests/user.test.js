import {
  getAllUsers,
  getUser,
  getUserById,
  getUserByEmail,
  updateUserById,
  deleteUserById,
} from "../../services/userService";
import UserSQL from "../../modelsSQL/User.js";
import UserMongo from "../../modelsMongo/User.mongo.js";
import DeletedUserSQL from "../../modelsSQL/DeletedUser.js";
import DeletedUserMongo from "../../modelsMongo/DeletedUser.mongo.js";
import { comparePasswords } from "../../helpers/passwordHelper.js";

jest.mock("../../modelsSQL/User.js", () => {
  return {
    findByPk: jest.fn(),
    create: jest.fn(),
    destroy: jest.fn(),
  };
});
jest.mock("../../modelsMongo/User.mongo.js", () => ({
  find: jest.fn().mockReturnValue({
    select: jest.fn().mockResolvedValue([]),
  }),
  aggregate: jest.fn(),
  findByIdAndUpdate: jest.fn(),
  findByIdAndDelete: jest.fn(),
}));
jest.mock("../../modelsSQL/DeletedUser.js", () => ({
  create: jest.fn(),
}));
jest.mock("../../modelsMongo/DeletedUser.mongo.js", () => ({
  create: jest.fn(),
}));
jest.mock("../../helpers/passwordHelper.js", () => ({
  comparePasswords: jest.fn(),
}));

describe("User Service Tests", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("getAllUsers should return all users from MongoDB", async () => {
    UserMongo.find.mockReturnValue({
      select: jest.fn().mockResolvedValue([
        {
          id: "1",
          nom: "Doe",
          prenom: "John",
          email: "john.doe@example.com",
          telephone: "1234567890",
          role: "user",
          isVerified: true,
          isBlocked: false,
          wantsMailNewProduct: false,
          wantsMailRestockProduct: false,
          wantsMailChangingPrice: false,
          wantsMailNewsletter: false,
        },
      ]),
    });

    const users = await getAllUsers();

    expect(users).toHaveLength(1);
    expect(users[0]).toHaveProperty("id", "1");
    expect(users[0]).toHaveProperty("email", "john.doe@example.com");
  });

  test("getUser should return user from SQL database", async () => {
    // Set up mock response for findByPk
    UserSQL.findByPk.mockResolvedValue({
      id: "1",
      nom: "Doe",
      prenom: "John",
      email: "john.doe@example.com",
      telephone: "1234567890",
      role: "user",
      isVerified: true,
      isBlocked: false,
      wantsMailNewProduct: false,
      wantsMailRestockProduct: false,
      wantsMailChangingPrice: false,
      wantsMailNewsletter: false,
      hasConsented: true,
      save: jest.fn().mockResolvedValue(true),
      destroy: jest.fn().mockResolvedValue(true),
    });

    const user = await getUser("1");

    expect(user).toHaveProperty("id", "1");
    expect(user).toHaveProperty("email", "john.doe@example.com");
  });

  test("getUserById should return user with alias from MongoDB", async () => {
    UserMongo.aggregate.mockResolvedValue([
      {
        id: "1",
        nom: "Doe",
        prenom: "John",
        email: "john.doe@example.com",
        telephone: "1234567890",
        role: "user",
        isVerified: true,
        isBlocked: false,
        wantsMailNewProduct: false,
        wantsMailRestockProduct: false,
        wantsMailChangingPrice: false,
        wantsMailNewsletter: false,
      },
    ]);

    const user = await getUserById("1");

    expect(user).toHaveProperty("id", "1");
    expect(user).toHaveProperty("email", "john.doe@example.com");
  });

  test("getUserByEmail should return user by email from MongoDB", async () => {
    UserMongo.aggregate.mockResolvedValue([
      { id: "1", nom: "Doe", prenom: "John", email: "john.doe@example.com" },
    ]);

    const user = await getUserByEmail("john.doe@example.com");

    expect(user).toHaveProperty("id", "1");
    expect(user).toHaveProperty("email", "john.doe@example.com");
  });

  test("updateUserById should update user and synchronize with MongoDB", async () => {
    UserSQL.findByPk.mockResolvedValue({
      id: "1",
      nom: "Doe",
      prenom: "John",
      email: "john.doe@example.com",
      telephone: "1234567890",
      role: "user",
      isVerified: true,
      isBlocked: false,
      wantsMailNewProduct: false,
      wantsMailRestockProduct: false,
      wantsMailChangingPrice: false,
      wantsMailNewsletter: false,
      hasConsented: true,
      save: jest.fn().mockResolvedValue(true),
    });

    comparePasswords.mockResolvedValue(true);

    UserMongo.findByIdAndUpdate.mockResolvedValue(true);

    const updatedUser = await updateUserById("1", {
      email: "new.email@example.com",
    });

    expect(updatedUser).toHaveProperty("id", "1");
    expect(UserSQL.findByPk).toHaveBeenCalledWith("1");
    expect(UserMongo.findByIdAndUpdate).toHaveBeenCalled();
  });

  test("deleteUserById should delete user and move to deleted collections", async () => {
    UserSQL.findByPk.mockResolvedValue({
      id: "1",
      role: "user",
      isVerified: true,
      isBlocked: false,
      destroy: jest.fn().mockResolvedValue(true),
    });

    DeletedUserSQL.create.mockResolvedValue({
      id: "1",
      role: "user",
      isVerified: true,
      isBlocked: false,
      userId: "1",
    });
    DeletedUserMongo.create.mockResolvedValue(true);

    UserMongo.findByIdAndDelete.mockResolvedValue(true);

    const result = await deleteUserById("1");

    expect(result).toBe(true);
    expect(UserSQL.findByPk).toHaveBeenCalledWith("1");
    expect(UserMongo.findByIdAndDelete).toHaveBeenCalledWith("1");
  });
});
