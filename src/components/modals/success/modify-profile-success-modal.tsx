import { Alert, Button, Modal } from "react-bootstrap";

export interface ModifyProfileSuccessModalProps {
  showModifyProfileSuccessModal: boolean;
  handleCloseModifyProfileSuccessModal: () => void;
}

export default function ModifyProfileSuccessModal({
  showModifyProfileSuccessModal,
  handleCloseModifyProfileSuccessModal,
}: ModifyProfileSuccessModalProps) {
  return (
    <Modal
      show={showModifyProfileSuccessModal}
      onHide={handleCloseModifyProfileSuccessModal}
      backdrop="static"
      keyboard={false}
    >
      <Alert variant="success" className="m-0 p-0">
        <Modal.Body>
          <Alert.Heading className="mb-3">Success</Alert.Heading>
          <p>Your profile has been successfully modified!</p>
        </Modal.Body>
        <Modal.Footer className="border-0 pt-0 p-3">
          <Button
            variant="dark"
            className="rounded-pill"
            onClick={handleCloseModifyProfileSuccessModal}
          >
            Close
          </Button>
        </Modal.Footer>
      </Alert>
    </Modal>
  );
}
