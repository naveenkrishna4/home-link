import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const verifyUser = async (req, res, next) => {
  const token = req.cookies.accessToken;
  if (!token) return next(errorHandler(401, "Unauthorized"));
  const user = jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) return next(errorHandler(403, "Forbidden"));
    req.user = user;
    next();
  });
};
