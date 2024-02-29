import { Alert, Button, Modal } from "react-bootstrap";

export interface SignOutModalProps {
  showSignOutModal: boolean;
  handleCloseSignOutModal: () => void;
  signOut: () => void;
}

export default function SignOutModal({
  showSignOutModal,
  handleCloseSignOutModal,
  signOut,
}: SignOutModalProps) {
  return (
    <Modal
      show={showSignOutModal}
      onHide={handleCloseSignOutModal}
      backdrop="static"
      keyboard={false}
    >
      <Alert variant="warning" className="m-0 p-0">
        <Modal.Body>
          <Alert.Heading className="mb-3">Are You Sure?</Alert.Heading>
          <p>
            Signing out will end your current session. Do you want to proceed?
          </p>
        </Modal.Body>
        <Modal.Footer className="border-0 pt-0 p-3">
          <Button variant="outline-dark" onClick={handleCloseSignOutModal}>
            Cancel
          </Button>
          <Button variant="outline-danger" onClick={signOut}>
            Sign Out
          </Button>
        </Modal.Footer>
      </Alert>
    </Modal>
  );
}
