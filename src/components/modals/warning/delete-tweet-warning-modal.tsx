import { Alert, Button, Modal } from "react-bootstrap";

export interface DeleteTweetWarningModalProps {
  isLoading: boolean;
  showDeleteTweetModal: boolean;
  handleCloseDeleteTweetModal: () => void;
  deleteTweet: () => Promise<void>;
}

export default function DeleteTweetWarningModal({
  isLoading,
  showDeleteTweetModal,
  handleCloseDeleteTweetModal,
  deleteTweet,
}: DeleteTweetWarningModalProps) {
  return (
    <div>
      <Modal
        show={showDeleteTweetModal}
        onHide={handleCloseDeleteTweetModal}
        backdrop="static"
        keyboard={false}
      >
        <Alert variant="warning" className="m-0 p-0">
          <Modal.Body>
            <Alert.Heading className="mb-3">Alert</Alert.Heading>
            <p>
              Are you sure you want to delete this tweet? This action cannot be
              undone.
            </p>
          </Modal.Body>
          <Modal.Footer className="border-0 pt-0 p-3">
            <Button
              type="button"
              variant="dark"
              className="rounded-pill"
              onClick={handleCloseDeleteTweetModal}
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="danger"
              className="rounded-pill"
              onClick={deleteTweet}
            >
              {isLoading ? "Deleting..." : "Delete"}
            </Button>
          </Modal.Footer>
        </Alert>
      </Modal>
    </div>
  );
}
