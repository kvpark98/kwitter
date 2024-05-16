import { Alert, Button, Modal } from "react-bootstrap";

export interface EmailNotVerifiedErrorModalProps {
  showEmailNotVerifiedErrorModal: boolean;
  handleCloseEmailNotVerifiedErrorModal: () => void;
}

export default function EmailNotVerifiedErrorModal({
  showEmailNotVerifiedErrorModal,
  handleCloseEmailNotVerifiedErrorModal,
}: EmailNotVerifiedErrorModalProps) {
  return (
    <Modal
      show={showEmailNotVerifiedErrorModal}
      onHide={handleCloseEmailNotVerifiedErrorModal}
      backdrop="static"
      keyboard={false}
    >
      <Alert variant="danger" className="m-0 p-0">
        <Modal.Body>
          <Alert.Heading className="mb-3">Error</Alert.Heading>
          <p>
            Your email has not been verified. Please check your email and click
            on the verification link.
          </p>
        </Modal.Body>
        <Modal.Footer className="border-0 pt-0 p-3">
          <Button
            variant="dark"
            className="rounded-pill"
            onClick={handleCloseEmailNotVerifiedErrorModal}
          >
            Back
          </Button>
        </Modal.Footer>
      </Alert>
    </Modal>
  );
}
