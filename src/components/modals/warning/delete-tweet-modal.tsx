import { Alert, Button, Modal } from "react-bootstrap";
import DeleteTweetErrors from "../error/delete-tweet-errors";

export interface DeleteTweetModalProps {
  isLoading: boolean;
  error: string;
  showDeleteModal: boolean;
  handleCloseDeleteModal: () => void;
  deleteTweet: () => Promise<void>;
  showDeleteErrorsModal: boolean;
  handleCloseDeleteErrorsModal: () => void;
}

export default function DeleteTweetModal({
  isLoading,
  error,
  showDeleteModal,
  handleCloseDeleteModal,
  deleteTweet,
  showDeleteErrorsModal,
  handleCloseDeleteErrorsModal,
}: DeleteTweetModalProps) {
  return (
    <div>
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
            <Button
              type="button"
              variant="dark"
              className="rounded-pill"
              onClick={handleCloseDeleteModal}
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
      {error && (
        <DeleteTweetErrors
          error={error}
          showDeleteErrorsModal={showDeleteErrorsModal}
          handleCloseDeleteErrorsModal={handleCloseDeleteErrorsModal}
        />
      )}
    </div>
  );
}
