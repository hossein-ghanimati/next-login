import {z}  from "zod";

export const userSchema = z.object({
  fname: z.string().min(3),
  lname: z.string().min(3),
  username: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(8),
});

