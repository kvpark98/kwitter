import { Alert, Button, Modal } from "react-bootstrap";

export interface SignOutWarningModalProps {
  showSignOutModal: boolean;
  handleCloseSignOutModal: () => void;
  signOut: () => void;
}

export default function SignOutWarningModal({
  showSignOutModal,
  handleCloseSignOutModal,
  signOut,
}: SignOutWarningModalProps) {
  return (
    <Modal
      show={showSignOutModal}
      onHide={handleCloseSignOutModal}
      backdrop="static"
      keyboard={false}
    >
      <Alert variant="warning" className="m-0 p-0">
        <Modal.Body>
          <Alert.Heading className="mb-3">Alert</Alert.Heading>
          <p>
            Signing out will end your current session. Do you want to proceed?
          </p>
        </Modal.Body>
        <Modal.Footer className="border-0 pt-0 p-3">
          <Button
            variant="dark"
            className="rounded-pill"
            onClick={handleCloseSignOutModal}
          >
            Cancel
          </Button>
          <Button variant="danger" className="rounded-pill" onClick={signOut}>
            Sign out
          </Button>
        </Modal.Footer>
      </Alert>
    </Modal>
  );
}
