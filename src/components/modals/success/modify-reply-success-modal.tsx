import { Alert, Button, Modal } from "react-bootstrap";

export interface ModifyReplySuccessModalProps {
  showModifyReplySuccessModal: boolean;
  handleCloseModifyReplySuccessModal: () => void;
}

export default function ModifyReplySuccessModal({
  showModifyReplySuccessModal,
  handleCloseModifyReplySuccessModal,
}: ModifyReplySuccessModalProps) {
  return (
    <Modal
      show={showModifyReplySuccessModal}
      onHide={handleCloseModifyReplySuccessModal}
      backdrop="static"
      keyboard={false}
    >
      <Alert variant="success" className="m-0 p-0">
        <Modal.Body>
          <Alert.Heading className="mb-3">Success</Alert.Heading>
          <p>Reply successfully modified!</p>
        </Modal.Body>
        <Modal.Footer className="border-0 pt-0 p-3">
          <Button
            variant="dark"
            className="rounded-pill"
            onClick={handleCloseModifyReplySuccessModal}
          >
            Close
          </Button>
        </Modal.Footer>
      </Alert>
    </Modal>
  );
}
