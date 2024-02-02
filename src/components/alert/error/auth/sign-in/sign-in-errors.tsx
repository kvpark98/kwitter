import { Alert } from "react-bootstrap";

export interface SignInErrorsProps {
  error: string;
}

export default function SignInErrors({ error }: SignInErrorsProps) {
  return (
    <Alert variant="danger" className="m-0 mt-3 w-100">
      <p>
        {(error === "auth/invalid-credential" ||
          error === "auth/wrong-password" ||
          error === "auth/user-not-found") &&
          "The email or password entered is incorrect."}
        {error === "auth/user-disabled" &&
          "The user associated with the provided email has been disabled."}
        {error === "auth/expired-action-code" &&
          "The email link has expired. Please request a new link and ensure you use it within the specified time limit."}
        {error === "auth/invalid-action-code" &&
          "The provided link is either incorrect or has already been utilized. Please obtain a new link."}
        {error === "auth/account-exists-with-different-credential" &&
          "The email is either invalid or already in use."}
        {error === "auth/requires-recent-login" &&
          "Security concern. For this action, recent sign-in is required. Please sign in again."}
        {error === "auth/too-many-requests" &&
          "Excessive attempts. Please retry after a brief delay."}
        {error === "auth/network-request-failed" &&
          "An unexpected network error has occurred. Kindly reopen the page."}
        {error === "auth/invalid-user-token" &&
          "Invalid user token. Please sign in again to obtain a valid token."}
        {error === "auth/user-token-expired" &&
          "Your credentials have expired. Please try again."}
        {error === "auth/web-storage-unsupported" &&
          "Your browser does not support web storage."}
        {error === "auth/internal-error" &&
          "An internal error occurred. Please try again later or contact support for assistance."}
        {error === "auth/unknown" &&
          "An unexpected error occurred. Please try again or contact support."}
      </p>
    </Alert>
  );
}
