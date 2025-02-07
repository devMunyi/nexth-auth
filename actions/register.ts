"use server";

import { RegisterSchema } from "@/schemas";
import { z } from "zod";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";
import bcrypt from "bcryptjs";

export async function register(
  values: z.infer<typeof RegisterSchema>
): Promise<{
  success: boolean;
  message?: string;
}> {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { success: false, message: "Invalid fields!" };
  }

  const { name, email, password } = validatedFields.data;

  const hashedPassword = await bcrypt.hash(password, 10);
  const exitingUserEmail = await getUserByEmail(email);

  if (exitingUserEmail) {
    return { success: false, message: "Email already in use!" };
  }

  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  // TODO: send email verification

  return { success: true, message: "Success! Please wait..." };
}
