import { Alert, Button, Modal } from "react-bootstrap";

export interface ModifyTweetErrorsProps {
  error: string;
  showModifyTweetErrorsModal: boolean;
  handleCloseModifyTweetErrorsModal: () => void;
}

export default function ModifyTweetErrors({
  error,
  showModifyTweetErrorsModal,
  handleCloseModifyTweetErrorsModal,
}: ModifyTweetErrorsProps) {
  return (
    <Modal
      show={showModifyTweetErrorsModal}
      onHide={handleCloseModifyTweetErrorsModal}
      backdrop="static"
      keyboard={false}
    >
      <Alert variant="danger" className="m-0 p-0">
        <Modal.Body>
          <Alert.Heading className="mb-3">Error</Alert.Heading>
          <p>
            {/* Firestore Errors */}
            {error === "cancelled" &&
              "The operation was cancelled. Please review the request and try again or consider an alternative approach."}
            {error === "aborted" &&
              "The operation was aborted. Please try again later."}
            {error === "already_exists" &&
              "The resource already exists. Please choose a different name."}
            {error === "deadline_exceeded" &&
              "The operation exceeded the allotted time. Please try again or check your network connection."}
            {error === "failed_precondition" &&
              "The operation failed due to a precondition. Please ensure all requirements are met."}
            {error === "internal" &&
              "An internal error occurred. Please try again later or contact support."}
            {error === "invalid_argument" &&
              "Invalid argument provided. Please check the input and try again."}
            {error === "not_found" &&
              "The requested resource was not found. Please check the identifier and try again."}
            {error === "permission_denied" &&
              "Permission denied. You do not have the necessary access rights."}
            {error === "resource_exhausted" &&
              "The resource limit has been exhausted. Please free up resources or request additional quota."}
            {error === "unauthenticated" &&
              "Authentication failed. Please sign in and try again."}
            {error === "unavailable" &&
              "The service is currently unavailable. Please try again later."}
            {error === "out-of-range" &&
              "The provided value is out of the valid range. Please ensure the input is within the acceptable boundaries."}
            {error === "unimplemented" &&
              "The requested operation is not implemented. Please check for updates or consider an alternative approach."}
            {error === "data-loss" &&
              "Data loss has occurred during the operation. Please review the data and try again. Ensure data integrity and consider backups."}
            {(error === "unknown" || error === "unknown-error") &&
              "An unexpected error occurred. Please try again later."}
            {/* Size Error */}
            {error === "size-exhausted" &&
              "File size exceeds 1MB. Please choose a smaller file."}
            {/* Storage Errors */}
            {error === "storage/unknown" &&
              "An unknown error occurred while accessing storage. Please try again later."}
            {error === "storage/object-not-found" &&
              "The requested file was not found in storage. Please check the file path and try again."}
            {error === "storage/bucket-not-found" &&
              "The specified storage bucket was not found. Please check the bucket configuration."}
            {error === "storage/project-not-found" &&
              "The associated project for storage was not found. Please check the project settings."}
            {error === "storage/quota-exceeded" &&
              "Storage quota exceeded. Please free up space or upgrade your storage plan."}
            {error === "storage/unauthenticated" &&
              "Access to storage is unauthenticated. Please sign in and try again."}
            {error === "storage/unauthorized" &&
              "Unauthorized access to storage. Please check your permissions and try again."}
            {error === "storage/unauthorized-app" &&
              "Unauthorized access to storage due to invalid app credentials. Please review your app configuration."}
            {error === "storage/retry-limit-exceeded" &&
              "Retry limit exceeded while accessing storage. Please try again later."}
            {error === "storage/invalid-checksum" &&
              "Invalid checksum detected for the file. Please ensure the file is intact and try again."}
            {error === "storage/canceled" &&
              "The storage operation was canceled. Please try again or check your network connection."}
            {error === "storage/invalid-event-name" &&
              "Invalid event name encountered while accessing storage. Please check the request."}
            {error === "storage/invalid-url" &&
              "Invalid URL specified for storage. Please provide a valid URL."}
            {error === "storage/invalid-default-bucket" &&
              "Invalid default storage bucket configuration. Please set a valid default bucket."}
            {error === "storage/no-default-bucket" &&
              "No default storage bucket configured. Please set a default bucket for storage."}
            {error === "storage/cannot-slice-blob" &&
              "Cannot slice the blob in storage. Please check the file type and try again."}
            {error === "storage/server-file-wrong-size" &&
              "The server file has an incorrect size. Please ensure the file is valid and try again."}
            {error === "storage/no-download-url" &&
              "No download URL available for the file. Please check the file existence and permissions."}
            {error === "storage/invalid-argument" &&
              "Invalid argument provided for storage operation. Please check the input and try again."}
            {error === "storage/invalid-argument-count" &&
              "Invalid number of arguments provided for storage operation. Please check the input and try again."}
            {error === "storage/app-deleted" &&
              "The associated Firebase app has been deleted. Please review your app configuration."}
            {error === "storage/invalid-root-operation" &&
              "Invalid root operation detected while accessing storage. Please check the request."}
            {error === "storage/invalid-format" &&
              "Invalid file format detected in storage. Please ensure the file format is supported."}
            {error === "storage/internal-error" &&
              "An internal error occurred while accessing storage. Please try again later."}
            {error === "storage/unsupported-environment" &&
              "Unsupported environment for storage operation. Please ensure compatibility with the storage service."}
          </p>
        </Modal.Body>
        <Modal.Footer className="border-0 pt-0 p-3">
          <Button
            variant="dark"
            className="rounded-pill"
            onClick={handleCloseModifyTweetErrorsModal}
          >
            Back
          </Button>
        </Modal.Footer>
      </Alert>
    </Modal>
  );
}
