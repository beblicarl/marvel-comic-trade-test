import jwt, { GetPublicKeyOrSecret } from "jsonwebtoken"
import type { Request, Response } from "express";


type UserT = {
 id: string;

 // email: string;
};

export const createJWT = (payload: UserT) => {
 const token = jwt.sign(payload, "gVkYp3s5v8y/B?E(H+MbQeThWmZq4t7w", {
  expiresIn: `1d`,
 });
 return token;
}




export const attachedCookiesToResponse = (response: Response, user: UserT) => {
 
 const token = createJWT(user);
 
 const oneDay = 1000 * 60 * 60 * 24;
 response.cookie("token", token, {
  httpOnly: true,
  expires: new Date(Date.now() + oneDay),
  secure: process.env.NODE_ENV === "production",
  // signed: true
 });
}

