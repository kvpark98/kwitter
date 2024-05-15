import { Alert, Button, Modal } from "react-bootstrap";

export interface EmailVerificationNeededWarningModalProps {
  showEmailVerificationNeededWarningModal: boolean;
  handleCloseEmailVerificationNeededWarningModal: () => void;
}

export default function EmailVerificationNeededWarningModal({
  showEmailVerificationNeededWarningModal,
  handleCloseEmailVerificationNeededWarningModal,
}: EmailVerificationNeededWarningModalProps) {
  return (
    <Modal
      show={showEmailVerificationNeededWarningModal}
      onHide={handleCloseEmailVerificationNeededWarningModal}
      backdrop="static"
      keyboard={false}
    >
      <Alert variant="warning" className="m-0 p-0">
        <Modal.Body>
          <Alert.Heading className="mb-3">Verification Needed</Alert.Heading>
          <p>
            Kindly navigate to your email and click on the provided link for
            verification.
          </p>
        </Modal.Body>
        <Modal.Footer className="border-0 pt-0 p-3">
          <Button
            variant="dark"
            className="rounded-pill"
            onClick={handleCloseEmailVerificationNeededWarningModal}
          >
            Close
          </Button>
        </Modal.Footer>
      </Alert>
    </Modal>
  );
}
