"use server";
import { ResetPasswordSchema } from "@/schemas";
import { z } from "zod";
import { getUserByEmail } from "@/data/user";
import { generatePasswordResetToken } from "@/lib/tokens";
import { sendPasswordResetEmail } from "@/lib/mail";

export async function resetPassword(
  values: z.infer<typeof ResetPasswordSchema>
) {
  const validatedFields = ResetPasswordSchema.safeParse(values);

  if (!validatedFields.success) {
    return { success: false, message: "Invalid Email" };
  }

  const { email } = validatedFields.data;
  const exitingUserByEmail = await getUserByEmail(email);

  if (!exitingUserByEmail) {
    return { success: false, message: "Email not found!" };
  }

  // Generate reset token
  const passwordResetToken = await generatePasswordResetToken(email);

  // Send reset email
  await sendPasswordResetEmail(
    passwordResetToken.email,
    passwordResetToken.token
  );

  return { success: true, message: "Reset email sent!" };
}
