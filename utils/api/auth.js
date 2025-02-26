import { compareSync, hashSync } from "bcrypt";
import { sign, verify } from "jsonwebtoken";
const privateKey = process.env.PRIVATE_KEY;

export const hashPassword = (password) => 
  hashSync(password, 2);

export const comparePassword = (password, hashedPassword) => 
  compareSync(password, hashedPassword);

export const generateToken = (payload) =>
  sign(payload, privateKey, { expiresIn: "1w" });

export const verifyToken = (token) =>
  verify(token, privateKey);

