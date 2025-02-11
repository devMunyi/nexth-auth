import { UserRole } from "@prisma/client";
import * as z from "zod";

export const SettingsSchema = z
  .object({
    name: z.optional(z.string()),
    isTwoFactorEnabled: z.optional(z.boolean()),
    role: z.enum([UserRole.ADMIN, UserRole.USER]),
    email: z.optional(z.string().email()),
    password: z.optional(z.string().min(6)),
    newPassword: z.optional(z.string().min(6)),
  })
  .refine(
    (data) => {
      if (data.password && !data.newPassword) {
        return false;
      }

      return true;
    },
    { message: "New Password is required", path: ["newPassword"] }
  )
  .refine(
    (data) => {
      if (data.newPassword && !data.password) {
        return false;
      }

      return true;
    },
    { message: "Password is required", path: ["password"] }
  );

export const LoginSchema = z.object({
  email: z
    .string()
    .trim()
    .nonempty({ message: "Email is required" })
    .email("Invalid email"),
  password: z.string().trim().nonempty({ message: "Password is required" }),
  code: z.optional(z.string()),
});

export const RegisterSchema = z.object({
  email: z
    .string()
    .trim()
    .nonempty({ message: "Email is required" })
    .email("Invalid email"),
  password: z
    .string()
    .trim()
    .min(6, { message: "Password must be at least 6 characters" }),
  name: z.string().trim().nonempty({ message: "Name is required" }),
});

export const ResetPasswordSchema = z.object({
  email: z
    .string()
    .trim()
    .nonempty({ message: "Email is required" })
    .email("Invalid email"),
});

export const NewPasswordSchema = z.object({
  password: z
    .string()
    .trim()
    .min(6, { message: "Password must be at least 6 characters" }),
});
