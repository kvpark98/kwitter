import { Alert, Button, Modal } from "react-bootstrap";

export interface SignInWithEmailErrorModalProps {
  showSignInWithEmailErrorModal: boolean;
  handleCloseSignInWithEmailErrorModal: () => void;
  error: string;
}

export default function SignInWithEmailErrorModal({
  showSignInWithEmailErrorModal,
  handleCloseSignInWithEmailErrorModal,
  error,
}: SignInWithEmailErrorModalProps) {
  return (
    <Modal
      show={showSignInWithEmailErrorModal}
      onHide={handleCloseSignInWithEmailErrorModal}
      backdrop="static"
      keyboard={false}
    >
      <Alert variant="danger" className="m-0 p-0">
        <Modal.Body>
          <Alert.Heading className="mb-3">Error</Alert.Heading>
          <p>
            {error === "auth/user-not-found" &&
              "We couldn't find a user corresponding to the provided email link. Make sure the link is correct, or consider signing up if you haven't already."}
            {error === "auth/user-disabled" &&
              "The user associated with the provided email has been disabled."}
            {error === "auth/expired-action-code" &&
              "The email link has expired. Please request a new link and ensure you use it within the specified time limit."}
            {error === "auth/invalid-action-code" &&
              "The provided link is either incorrect or has already been utilized. Please obtain a new link."}
            {error === "auth/account-exists-with-different-credential" &&
              "The email is either invalid or already in use."}
            {error === "auth/invalid-email" &&
              "The provided email does not correspond to the registered sign-in address."}
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
        </Modal.Body>
        <Modal.Footer className="border-0 pt-0 p-3">
          <Button
            variant="dark"
            className="rounded-pill"
            onClick={handleCloseSignInWithEmailErrorModal}
          >
            Back
          </Button>
        </Modal.Footer>
      </Alert>
    </Modal>
  );
}
