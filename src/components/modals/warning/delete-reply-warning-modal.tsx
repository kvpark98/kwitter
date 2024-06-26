import { Alert, Button, Modal } from "react-bootstrap";

export interface DeleteReplyWarningModalProps {
  isLoading: boolean;
  showReplyDeleteModal: boolean;
  handleCloseReplyDeleteModal: () => void;
  deleteReply: () => Promise<void>;
}

export default function DeleteReplyWarningModal({
  isLoading,
  showReplyDeleteModal,
  handleCloseReplyDeleteModal,
  deleteReply,
}: DeleteReplyWarningModalProps) {
  return (
    <Modal
      show={showReplyDeleteModal}
      onHide={handleCloseReplyDeleteModal}
      backdrop="static"
      keyboard={false}
    >
      <Alert variant="warning" className="m-0 p-0">
        <Modal.Body>
          <Alert.Heading className="mb-3">Alert</Alert.Heading>
          <p>
            Are you sure you want to delete this reply? This action cannot be
            undone.
          </p>
        </Modal.Body>
        <Modal.Footer className="border-0 pt-0 p-3">
          <Button
            type="button"
            variant="dark"
            className="rounded-pill"
            onClick={handleCloseReplyDeleteModal}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="danger"
            className="rounded-pill"
            onClick={deleteReply}
          >
            {isLoading ? "Deleting..." : "Delete"}
          </Button>
        </Modal.Footer>
      </Alert>
    </Modal>
  );
}
