import { Alert, Button, Modal } from "react-bootstrap";

export interface CreateTweetDiscardModalProps {
  showCreateTweetDiscardModal: boolean;
  handleCloseCreateTweetDiscardModal: () => void;
  handleCloseCreateTweetDiscardBothModal: () => void;
}

export default function CreateTweetDiscardModal({
  showCreateTweetDiscardModal,
  handleCloseCreateTweetDiscardModal,
  handleCloseCreateTweetDiscardBothModal,
}: CreateTweetDiscardModalProps) {
  return (
    <Modal
      show={showCreateTweetDiscardModal}
      onHide={handleCloseCreateTweetDiscardModal}
      backdrop="static"
      keyboard={false}
      size="sm"
      centered
    >
      <Alert variant="light" className="m-0 p-0">
        <Modal.Body className="p-4">
          <Alert.Heading className="mb-4">Discard Changes?</Alert.Heading>
          <p>This can’t be undone and you’ll lose your changes.</p>
          <div className="mt-4 mb-2">
            <Button
              variant="danger"
              className="rounded-pill w-100"
              onClick={handleCloseCreateTweetDiscardBothModal}
            >
              Discard
            </Button>
          </div>
          <div>
            <Button
              variant="dark"
              className="rounded-pill w-100"
              onClick={handleCloseCreateTweetDiscardModal}
            >
              Cancel
            </Button>
          </div>
        </Modal.Body>
      </Alert>
    </Modal>
  );
}
