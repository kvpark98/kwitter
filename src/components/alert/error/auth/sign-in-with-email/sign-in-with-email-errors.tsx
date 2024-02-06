import { Alert } from "react-bootstrap";

export interface SignInWithEmailErrorsProps {
  error: string;
}

export default function SignInWithEmailErrors({
  error,
}: SignInWithEmailErrorsProps) {
  return (
    <Alert variant="danger" className="m-0 mt-3 w-100">
      <p>
        {error === "auth/user-disabled" &&
          "Your account has been disabled. Please contact support for further assistance."}
        {error === "auth/user-not-found" &&
          "We couldn't find a user corresponding to the provided email link. Make sure the link is correct, or consider signing up if you haven't already."}
        {error === "auth/invalid-email" &&
          "The provided email does not correspond to the registered sign-in address."}
        {error === "auth/too-many-requests" &&
          "Due to security reasons, we've temporarily blocked your request. Please wait a moment and try again, or contact support for further assistance."}
        {error === "auth/expired-action-code" &&
          "The email link has expired. Please request a new link and ensure you use it within the specified time limit."}
        {error === "auth/invalid-action-code" &&
          "The provided link is either incorrect or has already been utilized. Please obtain a new link."}
        {error === "auth/internal-error" &&
          "An internal error occurred. Please try again later or contact support for assistance."}
        {error === "auth/unknown" &&
          "An unexpected error occurred. Please try again or contact support."}
      </p>
    </Alert>
  );
}
