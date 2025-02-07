"use client";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Button } from "@/components/ui/button";

export default function Social() {
  return (
    <div className="flex items-center w-full gap-x-2 justify-center">
      <Button size="lg" className="w-full" variant="outline" onClick={() => {}}>
        <FcGoogle className="w-5 h-5" />
        <span className="font-normal">Google</span>
      </Button>

      <Button
        size="lg"
        className="w-full font-normal"
        variant="outline"
        onClick={() => {}}
      >
        <FaGithub className="w-5 h-5" />
        <span className="font-normal">GitHub</span>
      </Button>
    </div>
  );
}
