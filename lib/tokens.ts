import crypto from "crypto";
import { v4 as uuidv4 } from "uuid";
import { db } from "@/lib/db";
import { getVerificationTokenByEmail } from "@/data/verification-token";
import { getPasswordResetTokenByEmail } from "@/data/password-reset-token";

export async function generateTwoFactorToken(email: string) {
  const token = crypto.randomInt(100_000, 1_000_000).toString();

  const expiresAt = new Date(new Date().getTime() + 300 * 1000); // 5 minutes from now

  const existingToken = await db.twoFactorToken.findFirst({ where: { email } });

  if (existingToken) {
    // delete token if it exists to create a new one
    await db.twoFactorToken.delete({ where: { id: existingToken.id } });
  }

  // create a new token & return it
  return await db.twoFactorToken.create({
    data: {
      token,
      email,
      expiresAt,
    },
  });
}

export async function generateVerificationToken(email: string) {
  const token = uuidv4();
  const expiresAt = new Date(new Date().getTime() + 3600 * 1000); // 1 hr from now

  const existingToken = await getVerificationTokenByEmail(email);

  if (existingToken) {
    // delete token if it exists to create a new one
    await db.verificationToken.delete({ where: { id: existingToken.id } });
  }

  // create a new token & return it
  return await db.verificationToken.create({
    data: {
      token,
      email,
      expiresAt,
    },
  });
}

export async function generatePasswordResetToken(email: string) {
  const token = uuidv4();
  const expiresAt = new Date(new Date().getTime() + 3600 * 1000); // 1 hr from now

  const existingToken = await getPasswordResetTokenByEmail(email);

  if (existingToken) {
    // delete token if it exists to create a new one
    await db.passwordResetToken.delete({ where: { id: existingToken.id } });
  }

  // create a new token & return it
  return await db.passwordResetToken.create({
    data: {
      token,
      email,
      expiresAt,
    },
  });
}
