import User from "../modelsSQL/User.js";
import jwt from "jsonwebtoken";

export const verifyToken = async (req, res) => {
  const header = req.header('Authorization') ?? req.header('authorization') ;
  if(!header) return res.status(401)

  const token = header.replace('Bearer ', '');
  if (!token) return res.status(401).json({ error: 'Access denied.' });

  try {
    const decoded = jwt.verify(token, process.env.LOGIN_JWT_KEY);
    if (!decoded) {
      return res.status(401).json({ error: "Access denied." });
    }

    const user = await User.findByPk(decoded.id);
    if (!user) {
      return res.status(401).json({ error: "Access denied." });
    }

    res.status(200).json({ userId: user.id });
  } catch (error) {
    console.error(error);
    return res.status(401);
  }
};