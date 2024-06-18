import { Alert, Button, Modal } from "react-bootstrap";

export interface CreateReplySuccessModalProps {
  showCreateReplySuccessModal: boolean;
  handleCloseCreateReplySuccessModal: () => void;
}

export default function CreateReplySuccessModal({
  showCreateReplySuccessModal,
  handleCloseCreateReplySuccessModal,
}: CreateReplySuccessModalProps) {
  return (
    <Modal
      show={showCreateReplySuccessModal}
      onHide={handleCloseCreateReplySuccessModal}
      backdrop="static"
      keyboard={false}
    >
      <Alert variant="success" className="m-0 p-0">
        <Modal.Body>
          <Alert.Heading className="mb-3">Success</Alert.Heading>
          <p>Reply successfully posted!</p>
        </Modal.Body>
        <Modal.Footer className="border-0 pt-0 p-3">
          <Button
            variant="dark"
            className="rounded-pill"
            onClick={handleCloseCreateReplySuccessModal}
          >
            Close
          </Button>
        </Modal.Footer>
      </Alert>
    </Modal>
  );
}
