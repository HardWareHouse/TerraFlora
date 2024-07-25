import { isDailyLimitContactExceeded, isMonthlyLimitContactExceeded } from "../../middlewares/contactMiddleware";
import Contact from "../../modelsSQL/Contact";
import { Op } from "sequelize";

jest.mock("../../modelsSQL/Contact");

describe("isDailyLimitContactExceeded middleware", () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      user: { id: "user-id" }
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    next = jest.fn();
  });

  it("should return 400 if daily contact limit is exceeded", async () => {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    Contact.findAll.mockResolvedValue(new Array(5).fill({}));

    await isDailyLimitContactExceeded(req, res, next);

    expect(Contact.findAll).toHaveBeenCalledWith({
      where: {
        userId: req.user.id,
        status: {
          [Op.ne]: 'traité'
        },
        createdAt: {
          [Op.gte]: date
        }
      }
    });
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: "Daily limit reached" });
  });

  it("should call next if daily contact limit is not exceeded", async () => {
    Contact.findAll.mockResolvedValue(new Array(4).fill({}));

    await isDailyLimitContactExceeded(req, res, next);

    expect(next).toHaveBeenCalled();
  });

  it("should handle errors properly", async () => {
    Contact.findAll.mockRejectedValue(new Error("Database error"));

    await isDailyLimitContactExceeded(req, res, next);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Database error" });
  });
});

describe("isMonthlyLimitContactExceeded middleware", () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      user: { id: "user-id" }
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    next = jest.fn();
  });

  it("should return 400 if monthly contact limit is exceeded", async () => {
    const date = new Date();
    date.setDate(1);
    date.setHours(0, 0, 0, 0);
    Contact.findAll.mockResolvedValue(new Array(12).fill({}));

    await isMonthlyLimitContactExceeded(req, res, next);

    expect(Contact.findAll).toHaveBeenCalledWith({
      where: {
        userId: req.user.id,
        status: {
          [Op.ne]: 'traité'
        },
        createdAt: {
          [Op.gte]: date
        }
      }
    });
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: "Monthly limit reached" });
  });

  it("should call next if monthly contact limit is not exceeded", async () => {
    Contact.findAll.mockResolvedValue(new Array(11).fill({}));

    await isMonthlyLimitContactExceeded(req, res, next);

    expect(next).toHaveBeenCalled();
  });

  it("should handle errors properly", async () => {
    Contact.findAll.mockRejectedValue(new Error("Database error"));

    await isMonthlyLimitContactExceeded(req, res, next);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Database error" });
  });
});
