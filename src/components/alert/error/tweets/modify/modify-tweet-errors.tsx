import { Alert } from "react-bootstrap";

export interface ModifyTweetErrorProps {
  error: string;
}

export default function ModifyTweetErrors({ error }: ModifyTweetErrorProps) {
  return (
    <Alert variant="danger" className="m-0 mb-3 w-100">
      <p>
        {error === "permission-denied" &&
          "Access Denied. You lack the necessary permissions to add/update a document."}
        {error === "not-found" &&
          "Document not found. The document you are trying to add/update does not exist."}
        {error === "resource-exhausted" &&
          "Resource Limit Exceeded. The operation could not be completed due to resource constraints."}
        {error === "invalid-argument" &&
          "Invalid Argument. Ensure that the data you are attempting to add/update is correctly formatted."}
        {error === "size-exhausted" &&
          "File size exceeds 1MB. Please choose a smaller file."}
        {error === "already exists" && "Data update failed."}
        {error === "storage/quota-exceeded" &&
          "Storage quota exceeded. Please free up space or try again later."}
        {error === "storage/unauthenticated" &&
          "User authentication required. Please sign in and try again."}
        {error === "storage/unauthorized" &&
          "Access denied. You lack the necessary permissions."}
        {error === "storage/object-not-found" &&
          "Unable to retrieve download URL. The requested file does not exist."}
        {(error === "unknown" || error === "unknown-error") &&
          "An unexpected error occurred. Please try again later."}
        {error === "auth/invalid-display-name" &&
          "Invalid display name. Please provide a valid name."}
        {error === "auth/invalid-photo-url" &&
          "Invalid photo URL. Please provide a valid URL for your profile picture."}
        {error === "auth/user-not-found" &&
          "User not found. Please verify your account and try again."}
        {error === "auth/user-disabled" &&
          "Account disabled. Please contact support to re-enable your account."}
        {error === "auth/too-many-requests" &&
          "Excessive attempts. Please retry after a brief delay."}
        {error === "auth/network-request-failed" &&
          "An unexpected network error has occurred. Kindly reopen the page."}
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
