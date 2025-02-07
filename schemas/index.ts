import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().trim().nonempty({ message: "Email is required" }).email(),
  password: z.string().trim().nonempty({ message: "Password is required" }),
});

export const RegisterSchema = z.object({
  email: z.string().trim().nonempty({ message: "Email is required" }).email(),
  password: z
    .string()
    .trim()
    .min(6, { message: "Password must be at least 6 characters" }),
  name: z.string().trim().nonempty({ message: "Name is required" }),
});
