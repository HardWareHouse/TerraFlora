import { Op } from 'sequelize';
import Contact from "../modelsSQL/Contact.js";

export const isDailyLimitContactExceeded = async (req, res, next) => {
    const user = req.user;
    const date = new Date();
    date.setHours(0, 0, 0, 0);

    try {
        const contacts = await Contact.findAll({
            where: {
                userId: user.id,
                status: {
                    [Op.ne]: 'traité'
                },
                createdAt: {
                    [Op.gte]: date
                }
            }
        });
        if (contacts.length >= 5) {
            return res.status(400).json({ error: "Daily limit reached" });
        }
        next();
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const isMonthlyLimitContactExceeded = async (req, res, next) => {
    const user = req.user;
    const date = new Date();
    date.setDate(1);
    date.setHours(0, 0, 0, 0);

    try {
        const contacts = await Contact.findAll({
            where: {
                userId: user.id,
                status: {
                    [Op.ne]: 'traité'
                },
                createdAt: {
                    [Op.gte]: date
                }
            }
        });
        if (contacts.length >= 12) {
            return res.status(400).json({ error: "Monthly limit reached" });
        }
        next();
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
