import { db } from "@/lib/db";

export async function getAccountByUserId(userId: string) {
  try {
    return await db.account.findFirst({ where: { userId } });
  } catch {
    return null;
  }
}
