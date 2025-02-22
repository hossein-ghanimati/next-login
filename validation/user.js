import {z}  from "zod";

export const loginSchema = z.object({
  identifier: z.string().min(3),
  password: z.string().min(8),
})

export const userSchema = z.object({
  fname: z.string().min(3),
  lname: z.string().min(3),
  username: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(8),
});

