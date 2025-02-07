"use client";

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

type SubmitButtonProps = {
  isLoading: boolean;
  loadingText: string;
  defaultText: string;
  className?: string;
};

export default function SubmitButton({
  isLoading,
  loadingText,
  defaultText,
  className = "w-full",
}: SubmitButtonProps) {
  return (
    <Button disabled={isLoading} className={className} type="submit">
      {isLoading ? (
        <>
          <Loader2 className="animate-spin" /> {loadingText}
        </>
      ) : (
        defaultText
      )}
    </Button>
  );
}
