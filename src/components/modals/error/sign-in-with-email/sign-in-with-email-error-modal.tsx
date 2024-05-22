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
