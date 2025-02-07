"use server";

import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { LoginSchema } from "@/schemas";
import { AuthError } from "next-auth";
import { z } from "zod";

export async function login(values: z.infer<typeof LoginSchema>): Promise<
  | {
      success: boolean;
      message?: string;
    }
  | undefined
> {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { success: false, message: "Invalid fields!" };
  }

  // return { success: true, message: "Success! Please wait..." };

  const { email, password } = validatedFields.data;

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { success: false, message: "Invalid credentials!" };
        default:
          return { success: false, message: "Something went wrong!" };
      }
    }

    throw error; //* throw an error otherwise will not redirect to as specified by redirectTo attribute
  }
}
