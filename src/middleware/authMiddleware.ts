import type { Request, Response, NextFunction } from "express";
import jwt  from "jsonwebtoken";

// import { isTokenValid } from "../utils/jwt";

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.token;

  if (!token) {
    res.status(400).json('Authentication Invalid');
  }
  try {
   const payload = jwt.verify(token, "gVkYp3s5v8y/B?E(H+MbQeThWmZq4t7w" )
    req.user = payload
    next();
  } catch (error) {
    res.status(400).json('Authentication Invalid');
  }
};
