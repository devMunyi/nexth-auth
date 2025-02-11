"use server";

import { db } from "@/lib/db";

export async function getTwoFactorTokenByToken(token: string) {
  try {
    return await db.twoFactorToken.findUnique({
      where: { token },
    });
  } catch {
    return null;
  }
}

export async function getTwoFactorTokenByEmail(email: string) {
  try {
    return await db.twoFactorToken.findFirst({ where: { email } });
  } catch {
    return null;
  }
}
