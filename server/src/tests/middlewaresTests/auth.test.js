// authMiddleware.test.js
import { authenticate, authorizeAdmin, authorizeUser } from "../../middlewares/authMiddleware.js";
import jwt from "jsonwebtoken";
import User from "../../modelsSQL/User.js";

jest.mock("jsonwebtoken");
jest.mock("../../modelsSQL/User.js");

describe("authenticate middleware", () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      header: jest.fn(),
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  it("should return 401 if Authorization header is missing", async () => {
    req.header.mockReturnValue(null);

    await authenticate(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
  });

  it("should return 401 if token is missing", async () => {
    req.header.mockReturnValue("Bearer ");

    await authenticate(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
  });

  it("should return 401 if token is invalid", async () => {
    req.header.mockReturnValue("Bearer invalidtoken");
    jwt.verify.mockImplementation(() => {
      throw new Error("Invalid token");
    });

    await authenticate(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
  });

  it("should return 401 if user is not found", async () => {
    req.header.mockReturnValue("Bearer validtoken");
    jwt.verify.mockReturnValue({ id: 1 });
    User.findByPk.mockResolvedValue(null);

    await authenticate(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
  });

  it("should return 401 if user is blocked", async () => {
    req.header.mockReturnValue("Bearer validtoken");
    jwt.verify.mockReturnValue({ id: 1 });
    User.findByPk.mockResolvedValue({ isBlocked: true });

    await authenticate(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: "Your account has been blocked", code: "account_blocked" });
  });

  it("should return 401 if user is not verified", async () => {
    req.header.mockReturnValue("Bearer validtoken");
    jwt.verify.mockReturnValue({ id: 1 });
    User.findByPk.mockResolvedValue({ isVerified: false });

    await authenticate(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: "Account not verified. Please verify your account to log in.", code: "account_not_verified" });
  });

  it("should call next if authentication is successful", async () => {
    req.header.mockReturnValue("Bearer validtoken");
    jwt.verify.mockReturnValue({ id: 1 });
    User.findByPk.mockResolvedValue({ id: 1, isBlocked: false, isVerified: true });

    await authenticate(req, res, next);

    expect(req.user).toEqual({ id: 1, isBlocked: false, isVerified: true });
    expect(next).toHaveBeenCalled();
  });

  it("should return 401 if token is expired", async () => {
    req.header.mockReturnValue("Bearer expiredtoken");
    jwt.verify.mockImplementation(() => {
      throw { name: "TokenExpiredError" };
    });

    await authenticate(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: "Token expired", code: "token_expired" });
  });

  it("should return 401 if any other error occurs", async () => {
    req.header.mockReturnValue("Bearer validtoken");
    jwt.verify.mockImplementation(() => {
      throw new Error("Some error");
    });

    await authenticate(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
  });
});

describe("authorizeAdmin middleware", () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      user: { role: "ROLE_USER" },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  it("should return 401 if user is not authenticated", () => {
    req.user = null;

    authorizeAdmin(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: "Access denied." });
  });

  it("should return 403 if user is not an admin", () => {
    req.user.role = "ROLE_USER";

    authorizeAdmin(req, res, next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ error: "Access denied." });
  });

  it("should call next if user is an admin", () => {
    req.user.role = "ROLE_ADMIN";

    authorizeAdmin(req, res, next);

    expect(next).toHaveBeenCalled();
  });
});

describe("authorizeUser middleware", () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      user: { role: "ROLE_ADMIN" },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  it("should return 401 if user is not authenticated", () => {
    req.user = null;

    authorizeUser(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: "Access denied." });
  });

  it("should return 403 if user is not a regular user", () => {
    req.user.role = "ROLE_ADMIN";

    authorizeUser(req, res, next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ error: "Access denied." });
  });

  it("should call next if user is a regular user", () => {
    req.user.role = "ROLE_USER";

    authorizeUser(req, res, next);

    expect(next).toHaveBeenCalled();
  });
});
