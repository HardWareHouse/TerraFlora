import User from "../modelsSQL/User.js";
import jwt from "jsonwebtoken";

export const verifyToken = async (req, res) => {
    try {
      const token = req.header('Authorization').replace('Bearer ', '');
      if(!token) {
        return res.status(400).json({ msg: "Token manquant." });
      }
  
      const decoded = jwt.verify(token, process.env.LOGIN_JWT_KEY);
      if (!decoded) {
        return res.status(400).json({ msg: "Token invalide." });
      }
  
      const user = await User.findByPk(decoded.id);
      if (!user) {
        return res.status(400).json({ msg: "Utilisateur non trouvé." });
      }
  
      res.status(200).json({ userId: user.id });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
};