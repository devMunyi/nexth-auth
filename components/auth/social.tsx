"use client";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { useSearchParams } from "next/navigation";

export default function Social() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || DEFAULT_LOGIN_REDIRECT;
  const onClick = (provider: "google" | "github") => {
    signIn(provider, { callbackUrl });
  };

  return (
    <div className="flex items-center w-full gap-x-2 justify-center">
      <Button
        size="lg"
        className="w-full"
        variant="outline"
        onClick={() => onClick("google")}
      >
        <FcGoogle className="w-5 h-5" />
        <span className="font-normal">Google</span>
      </Button>

      <Button
        size="lg"
        className="w-full font-normal"
        variant="outline"
        onClick={() => onClick("github")}
      >
        <FaGithub className="w-5 h-5" />
        <span className="font-normal">GitHub</span>
      </Button>
    </div>
  );
}
