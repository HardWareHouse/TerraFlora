import jwt from "jsonwebtoken";
import * as authService from "../services/authService.js";
import User from "../modelsSQL/User.js";
import { authenticate, authorizeAdmin, authorizeUser } from "../middlewares/authMiddleware.js";
import { isEmailAddressValid } from "../helpers/emailAddressHelper.js";
import { isPasswordValid, isPasswordExpired } from "../helpers/passwordHelper.js";
import { isValidUUID, isValidEmail, isStrongPassword } from "../helpers/validatorHelper.js";
import { login, register, confirmEmail, forgotPassword, resetPassword } from "../controllers/authController.js";
import bcrypt from "bcryptjs";
import { sendConfirmationEmail, sendResetPasswordEmail, sendAccountBlockedEmail } from "../emailConfig.js";

jest.mock("jsonwebtoken");
jest.mock("bcryptjs");
jest.mock("../services/authService.js");
jest.mock("../modelsSQL/User.js");
jest.mock("../emailConfig.js");

// Mock de brevo
jest.mock("@getbrevo/brevo", () => {
  const mTransactionalEmailsApi = {
    sendTransacEmail: jest.fn().mockResolvedValue({}),
    authentications: {
      apiKey: {
        apiKey: "",
      },
    },
  };
  return {
    TransactionalEmailsApi: jest.fn(() => mTransactionalEmailsApi),
  };
});

describe("Authentication Tests", () => {
  describe("authenticate middleware", () => {
    it("should authenticate a valid user", async () => {
      const req = {
        header: jest.fn().mockReturnValue("Bearer validtoken"),
        user: null,
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const next = jest.fn();

      jwt.verify.mockReturnValue({ id: "123" });
      User.findByPk.mockResolvedValue({ id: "123", isBlocked: false, isVerified: true });

      await authenticate(req, res, next);

      expect(next).toHaveBeenCalled();
      expect(req.user).toBeDefined();
    });
  });

  describe("isEmailAddressValid", () => {
    it("should return true for a valid email", () => {
      expect(isEmailAddressValid("test@example.com")).toBe(true);
    });

    it("should return false for an invalid email", () => {
      expect(isEmailAddressValid("testexample.com")).toBe(false);
    });
  });

  describe("Password Helper Functions", () => {
    it("should validate a strong password", () => {
      expect(isPasswordValid("StrongP@ssw0rd")).toBe(true);
    });

    it("should reject a weak password", () => {
      expect(isPasswordValid("weakpassword")).toBe(false);
    });

    it("should check if password is expired", () => {
      const twoMonthsAgo = new Date();
      twoMonthsAgo.setMonth(twoMonthsAgo.getMonth() - 2);
      expect(isPasswordExpired(twoMonthsAgo)).toBe(true);
    });
  });

  describe("Validator Helper Functions", () => {
    it("should validate UUID", () => {
      expect(isValidUUID("550e8400-e29b-41d4-a716-446655440000")).toBe(true);
    });

    it("should validate email", () => {
      expect(isValidEmail("test@example.com")).toBe(true);
    });

    it("should validate strong password", () => {
      expect(isStrongPassword("StrongP@ssw0rd")).toBe(true);
    });
  });

  describe("Auth Service Functions", () => {
    it("should find user by email", async () => {
      const mockUser = { id: "123", email: "test@example.com" };
      authService.findUserByEmail.mockResolvedValue(mockUser);

      const user = await authService.findUserByEmail("test@example.com");
      expect(user).toEqual(mockUser);
    });
  });

  describe("Auth Controller Functions", () => {
    it("should login a user", async () => {
      const req = {
        body: { email: "test@example.com", password: "password" },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      authService.findUserByEmail.mockResolvedValue({
        id: "123",
        email: "test@example.com",
        isVerified: true,
        password: "hashedPassword",
      });
      authService.comparePasswords.mockResolvedValue(true);
      authService.generateToken.mockReturnValue("token");

      await login(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        loginToken: "token",
        mailPreferenceToken: "token",
      }));
    });
  });
});
