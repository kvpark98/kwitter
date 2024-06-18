import { Alert, Button, Modal } from "react-bootstrap";

export interface CreateReplyDiscardModalProps {
  showCreateReplyDiscardModal: boolean;
  handleCloseCreateReplyDiscardModal: () => void;
  handleCloseCreateReplyDiscardBothModal: () => void;
}

export default function CreateReplyDiscardModal({
  showCreateReplyDiscardModal,
  handleCloseCreateReplyDiscardModal,
  handleCloseCreateReplyDiscardBothModal,
}: CreateReplyDiscardModalProps) {
  return (
    <Modal
      show={showCreateReplyDiscardModal}
      onHide={handleCloseCreateReplyDiscardModal}
      backdrop="static"
      keyboard={false}
      className="border-0"
      size="sm"
      centered
    >
      <Alert variant="light" className="m-0 p-0">
        <Modal.Body className="p-4">
          <Alert.Heading className="mb-4">Discard changes?</Alert.Heading>
          <p>This can’t be undone and you’ll lose your changes.</p>
          <div className="mt-4 mb-2">
            <Button
              variant="danger"
              className="rounded-pill w-100"
              onClick={handleCloseCreateReplyDiscardBothModal}
            >
              Discard
            </Button>
          </div>
          <div>
            <Button
              variant="dark"
              className="rounded-pill w-100"
              onClick={handleCloseCreateReplyDiscardModal}
            >
              Cancel
            </Button>
          </div>
        </Modal.Body>
      </Alert>
    </Modal>
  );
}
