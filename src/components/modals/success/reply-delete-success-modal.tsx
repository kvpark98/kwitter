import { Alert, Button, Modal } from "react-bootstrap";

export interface ReplyDeleteSuccessModalProps {
  showDeleteReplySuccessModal: boolean;
  handleCloseDeleteReplySuccessModal: () => void;
}

export default function ReplyDeleteSuccessModal({
  showDeleteReplySuccessModal,
  handleCloseDeleteReplySuccessModal,
}: ReplyDeleteSuccessModalProps) {
  return (
    <Modal
      show={showDeleteReplySuccessModal}
      onHide={handleCloseDeleteReplySuccessModal}
      backdrop="static"
      keyboard={false}
    >
      <Alert variant="success" className="m-0 p-0">
        <Modal.Body>
          <Alert.Heading className="mb-3">Success</Alert.Heading>
          <p>Your reply has been successfully deleted.</p>
        </Modal.Body>
        <Modal.Footer className="border-0 pt-0 p-3">
          <Button
            variant="dark"
            className="rounded-pill"
            onClick={handleCloseDeleteReplySuccessModal}
          >
            Close
          </Button>
        </Modal.Footer>
      </Alert>
    </Modal>
  );
}
