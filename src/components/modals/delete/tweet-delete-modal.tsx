import { Alert, Button, Modal } from "react-bootstrap";

export interface TweetDeleteModalProps {
  showDeleteModal: boolean;
  handleCloseDeleteModal: () => void;
  deleteTweet: () => Promise<void>;
}

export default function TweetDeleteModal({
  showDeleteModal,
  handleCloseDeleteModal,
  deleteTweet,
}: TweetDeleteModalProps) {
  return (
    <Modal
      show={showDeleteModal}
      onHide={handleCloseDeleteModal}
      backdrop="static"
      keyboard={false}
    >
      <Alert variant="warning" className="m-0 p-0">
        <Modal.Body>
          <Alert.Heading className="mb-3">Are You Sure?</Alert.Heading>
          <p>
            Are you sure you want to delete this tweet? This action cannot be
            undone.
          </p>
        </Modal.Body>
        <Modal.Footer className="border-0 pt-0 p-3">
          <Button variant="outline-dark" onClick={handleCloseDeleteModal}>
            Cancel
          </Button>
          <Button variant="outline-danger" onClick={deleteTweet}>
            Delete
          </Button>
        </Modal.Footer>
      </Alert>
    </Modal>
  );
}
