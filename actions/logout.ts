"use server";

import { signOut } from "@/auth";

export async function logout() {
  // can add some staff here before signOut

  await signOut({
    redirectTo: "/auth/login",
    redirect: true,
  });
}
