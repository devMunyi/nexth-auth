"use client";

import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import CardWrapper from "@/components/auth/card-wrapper";

import { BeatLoader } from "react-spinners";
import newVerification from "@/actions/new-verification";
import FormError from "@/components/form-error";
import FormSuccess from "@/components/form-success";
export default function NewVerificationForm() {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const onSubmit = useCallback(() => {
    if (success || error) return; // ==> prevent useEffect strict mode behavior of firing twice on dev env

    setError("");
    setSuccess("");
    if (!token) {
      setError("Missing token!");
      return;
    }

    newVerification(token)
      .then((response) => {
        if (!response?.success) setError(response.message);
        if (response?.success) setSuccess(response.message);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, [token, error, success]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <CardWrapper
      headerLabel="Confirming your verification"
      backButtonLabel="Back to login"
      backButtonHref="/auth/login"
    >
      <div className="w-full flex justify-center items-center">
        {!error && !success && <BeatLoader />}

        <FormSuccess message={success} />

        {!success && <FormError message={error} />}
      </div>
    </CardWrapper>
  );
}
