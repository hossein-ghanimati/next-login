import { compareSync, hashSync } from "bcrypt";

export const hashPassword = (password) => 
  hashSync(password, 2);

export const comparePassword = (password, hashedPassword) => 
  compareSync(password, hashedPassword);