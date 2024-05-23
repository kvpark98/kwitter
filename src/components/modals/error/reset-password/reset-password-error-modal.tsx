import { Alert, Button, Modal } from "react-bootstrap";

export interface ResetPasswordErrorModalProps {
  error: string;
  showResetPasswordErrorModal: boolean;
  handleCloseResetPasswordErrorModal: () => void;
}

export default function ResetPasswordErrorModal({
  error,
  showResetPasswordErrorModal,
  handleCloseResetPasswordErrorModal,
}: ResetPasswordErrorModalProps) {
  return (
    <Modal
      show={showResetPasswordErrorModal}
      onHide={handleCloseResetPasswordErrorModal}
      backdrop="static"
      keyboard={false}
    >
      <Alert variant="danger" className="m-0 p-0">
        <Modal.Body>
          <Alert.Heading className="mb-3">Error</Alert.Heading>
          <p>
            {error === "auth/user-not-found" &&
              "User not found. Please verify your account and try again."}
            {error === "auth/user-disabled" &&
              "Account disabled. Please contact support to re-enable your account."}
            {error === "auth/requires-recent-login" &&
              "Security concern. For this action, recent sign-in is required. Please sign in again."}
            {error === "auth/too-many-requests" &&
              "Excessive attempts. Please retry after a brief delay."}
            {error === "auth/network-request-failed" &&
              "An unexpected network error has occurred. Kindly reopen the page."}
            {error === "auth/invalid-user-token" &&
              "Invalid user token. Please sign in again to obtain a valid token."}
            {error === "auth/web-storage-unsupported" &&
              "Your browser does not support web storage."}
            {error === "auth/internal-error" &&
              "An internal error occurred. Please try again later or contact support for assistance."}
            {error === "auth/unknown" &&
              "An unexpected error occurred. Please try again or contact support."}
          </p>
        </Modal.Body>
        <Modal.Footer className="border-0 pt-0 p-3">
          <Button
            variant="dark"
            className="rounded-pill"
            onClick={handleCloseResetPasswordErrorModal}
          >
            Back
          </Button>
        </Modal.Footer>
      </Alert>
    </Modal>
  );
}
