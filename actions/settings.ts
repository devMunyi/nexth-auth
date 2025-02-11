"use server";

import { getUserByEmail, getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { sendVerificationEmail } from "@/lib/mail";
import { generateVerificationToken } from "@/lib/tokens";
import { SettingsSchema } from "@/schemas";
import { z } from "zod";
import bcrypt from "bcryptjs";

export async function settings(values: z.infer<typeof SettingsSchema>) {
  const validatedFields = SettingsSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      success: false,
      message: "Invalid fields",
      errors: validatedFields.error.format(),
    };
  }

  const user = await currentUser();

  if (!user || !user.id) {
    return {
      success: false,
      message: "Unauthorized",
    };
  }

  const dbUser = await getUserById(user?.id);

  if (!dbUser) {
    return {
      success: false,
      message: "Unauthorized",
    };
  }

  if (user.isOAuth) {
    values.email = undefined;
    values.password = undefined;
    values.newPassword = undefined;
    values.isTwoFactorEnabled = undefined;
  }

  if (values.email && values.email !== user.email) {
    const existingUser = await getUserByEmail(values.email);

    if (existingUser && existingUser.id !== user.id) {
      return {
        success: false,
        message: "Email already in use",
      };
    }

    const verificationToken = await generateVerificationToken(values.email);

    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );

    return {
      success: true,
      message: "verification email sent!",
    };
  }

  if (values.password && values.newPassword && dbUser.password) {
    const passwordMatch = await bcrypt.compare(
      values.password,
      dbUser.password
    );

    if (!passwordMatch) {
      return {
        success: false,
        message: "Incorrect password",
      };
    }

    values.password = await bcrypt.hash(values.newPassword, 10);
    values.newPassword = undefined;
  } else {
    values.password = undefined;
    values.newPassword = undefined;
  }

  await db.user.update({
    where: { id: dbUser.id },
    data: {
      ...values,
    },
  });

  return {
    success: true,
    message: "Settings updated",
  };
}
