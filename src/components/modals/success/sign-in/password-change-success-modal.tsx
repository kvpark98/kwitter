import { Alert, Button, Modal } from "react-bootstrap";

export interface PasswordChangeSuccessModalProps {
  showPassordChangeSuccessModal: boolean;
  handleClosePassordChangeSuccessModal: () => void;
}

export default function PasswordChangeSuccessModal({
  showPassordChangeSuccessModal,
  handleClosePassordChangeSuccessModal,
}: PasswordChangeSuccessModalProps) {
  return (
    <Modal
      show={showPassordChangeSuccessModal}
      onHide={handleClosePassordChangeSuccessModal}
      backdrop="static"
      keyboard={false}
    >
      <Alert variant="success" className="m-0 p-0">
        <Modal.Body>
          <Alert.Heading className="mb-3">Success</Alert.Heading>
          <p>
            Your new password has been set successfully. Please sign in using
            your updated password.
          </p>
        </Modal.Body>
        <Modal.Footer className="border-0 pt-0 p-3">
          <Button
            variant="dark"
            className="rounded-pill"
            onClick={handleClosePassordChangeSuccessModal}
          >
            Close
          </Button>
        </Modal.Footer>
      </Alert>
    </Modal>
  );
}
