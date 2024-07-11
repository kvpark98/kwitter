import { Alert, Button, Modal } from "react-bootstrap";

export interface ModifyReplyDiscardModalProps {
  showModifyReplyDiscardModal: boolean;
  handleCloseModifyReplyDiscardModal: () => void;
  handleCloseModifyReplyDiscardBothModal: () => void;
}

export default function ModifyReplyDiscardModal({
  showModifyReplyDiscardModal,
  handleCloseModifyReplyDiscardModal,
  handleCloseModifyReplyDiscardBothModal,
}: ModifyReplyDiscardModalProps) {
  return (
    <Modal
      show={showModifyReplyDiscardModal}
      onHide={handleCloseModifyReplyDiscardModal}
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
              onClick={handleCloseModifyReplyDiscardBothModal}
            >
              Discard
            </Button>
          </div>
          <div>
            <Button
              variant="dark"
              className="rounded-pill w-100"
              onClick={handleCloseModifyReplyDiscardModal}
            >
              Cancel
            </Button>
          </div>
        </Modal.Body>
      </Alert>
    </Modal>
  );
}
