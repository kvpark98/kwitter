import { Alert, Button, Modal } from "react-bootstrap";

export interface SignUpErrorModalProps {
  error: string;
  showSignUpErrorModal: boolean;
  handleCloseSignUpErrorModal: () => void;
}

export default function SignUpErrorModal({
  error,
  showSignUpErrorModal,
  handleCloseSignUpErrorModal,
}: SignUpErrorModalProps) {
  return (
    <Modal
      show={showSignUpErrorModal}
      onHide={handleCloseSignUpErrorModal}
      backdrop="static"
      keyboard={false}
    >
      <Alert variant="danger" className="m-0 p-0">
        <Modal.Body>
          <Alert.Heading className="mb-3">Error</Alert.Heading>
          <p>
            {error === "auth/invalid-credential" &&
              "The email or password entered is incorrect."}
            {error === "auth/user-not-found" &&
              "No user exists for the provided email."}
            {error === "auth/email-already-in-use" &&
              "This email is already in use."}
            {error === "auth/account-exists-with-different-credential" &&
              "The email is either invalid or already in use."}
            {error === "auth/invalid-email" &&
              "The provided email address is not valid."}
            {error === "auth/user-disabled" &&
              "The user associated with the provided email has been disabled."}
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
        </Modal.Body>
        <Modal.Footer className="border-0 pt-0 p-3">
          <Button
            variant="dark"
            className="rounded-pill"
            onClick={handleCloseSignUpErrorModal}
          >
            Back
          </Button>
        </Modal.Footer>
      </Alert>
    </Modal>
  );
}
