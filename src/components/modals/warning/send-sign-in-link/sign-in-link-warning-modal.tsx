import { Alert, Button, Modal } from "react-bootstrap";

export interface SignInLinkWarningModalProps {
  showSignInLinkWarningModal: boolean;
  handleCloseSignInLinkWarningModal: () => void;
}

export default function SignInLinkWarningModal({
  showSignInLinkWarningModal,
  handleCloseSignInLinkWarningModal,
}: SignInLinkWarningModalProps) {
  return (
    <Modal
      show={showSignInLinkWarningModal}
      onHide={handleCloseSignInLinkWarningModal}
      backdrop="static"
      keyboard={false}
    >
      <Alert variant="warning" className="m-0 p-0">
        <Modal.Body>
          <Alert.Heading className="mb-3">Alert</Alert.Heading>
          <p>
            Please review your email for a sign-in link. In case it doesn't show
            up within a couple of minutes, kindly inspect your spam folder.
          </p>
        </Modal.Body>
        <Modal.Footer className="border-0 pt-0 p-3">
          <Button
            variant="dark"
            className="rounded-pill"
            onClick={handleCloseSignInLinkWarningModal}
          >
            Close
          </Button>
        </Modal.Footer>
      </Alert>
    </Modal>
  );
}
