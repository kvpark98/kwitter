import { Alert, Button, Modal } from "react-bootstrap";

export interface ResetPasswordWarningModalProps {
  showModal: boolean;
  handleCloseModal: () => void;
  navigateToHome: () => void;
}

export default function ResetPasswordWarningModal({
  showModal,
  handleCloseModal,
  navigateToHome,
}: ResetPasswordWarningModalProps) {
  return (
    <Modal
      show={showModal}
      onHide={handleCloseModal}
      backdrop="static"
      keyboard={false}
    >
      <Alert variant="warning" className="m-0 p-0">
        <Modal.Body>
          <Alert.Heading className="mb-3">Alert</Alert.Heading>
          <p>
            If you don't reset your password now, you'll need to request a new
            link. Would you like to proceed?
          </p>
        </Modal.Body>
        <Modal.Footer className="border-0 pt-0 p-3">
          <Button
            variant="dark"
            className="rounded-pill"
            onClick={handleCloseModal}
          >
            Close
          </Button>
          <Button
            variant="primary"
            className="rounded-pill"
            onClick={navigateToHome}
          >
            Proceed
          </Button>
        </Modal.Footer>
      </Alert>
    </Modal>
  );
}
