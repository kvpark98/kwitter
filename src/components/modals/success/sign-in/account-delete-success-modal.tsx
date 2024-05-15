import { Alert, Button, Modal } from "react-bootstrap";

export interface AccountDeleteSuccessModalProps {
  showAccountDeleteSuccessModal: boolean;
  handleCloseAccountDeleteSuccessModal: () => void;
}

export default function AccountDeleteSuccessModal({
  showAccountDeleteSuccessModal,
  handleCloseAccountDeleteSuccessModal,
}: AccountDeleteSuccessModalProps) {
  return (
    <Modal
      show={showAccountDeleteSuccessModal}
      onHide={handleCloseAccountDeleteSuccessModal}
      backdrop="static"
      keyboard={false}
    >
      <Alert variant="success" className="m-0 p-0">
        <Modal.Body>
          <Alert.Heading className="mb-3">Success</Alert.Heading>
          <p>Your account has been successfully deleted.</p>
        </Modal.Body>
        <Modal.Footer className="border-0 pt-0 p-3">
          <Button
            variant="dark"
            className="rounded-pill"
            onClick={handleCloseAccountDeleteSuccessModal}
          >
            Close
          </Button>
        </Modal.Footer>
      </Alert>
    </Modal>
  );
}
