import { Alert, Button, Modal } from "react-bootstrap";

export interface SignOutModalProps {
  showModal: boolean;
  handleCloseModal: () => void;
  signOut: () => void;
}

export default function SignOutModal({
  showModal,
  handleCloseModal,
  signOut,
}: SignOutModalProps) {
  return (
    <Modal
      show={showModal}
      onHide={handleCloseModal}
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
          <Button variant="outline-dark" onClick={handleCloseModal}>
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
