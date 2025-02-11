import { db } from "@/lib/db";

export async function getTwoFactorConfirmationByUserId(userId: string) {
  try {
    return await db.twoFactorConfirmation.findUnique({
      where: { userId },
    });
  } catch {
    return null;
  }
}
