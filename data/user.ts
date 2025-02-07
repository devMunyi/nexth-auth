import { db } from "@/lib/db";

export async function getUserByEmail(email: string) {
  try {
    return await db.user.findUnique({
      where: { email },
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return null;
  }
}

export async function getUserById(id: string) {
  try {
    return await db.user.findUnique({
      where: { id },
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return null;
  }
}
