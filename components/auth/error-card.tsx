import CardWrapper from "@/components/auth/card-wrapper";
import { BsExclamationTriangle } from "react-icons/bs";

export default function ErrorCard() {
  return (
    <CardWrapper
      headerLabel="Oops! Something went wrong!"
      backButtonLabel="Back to login"
      backButtonHref="/auth/login"
    >
      <div className="w-full flex justify-center items-center">
        <BsExclamationTriangle className="text-destructive" />
      </div>
    </CardWrapper>
  );
}
