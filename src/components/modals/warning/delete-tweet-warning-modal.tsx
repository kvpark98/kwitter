import { Alert, Button, Modal } from "react-bootstrap";
import DeleteTweetErrorModal from "../error/delete-tweet-error-modal";

export interface DeleteTweetWarningModalProps {
  isLoading: boolean;
  error: string;
  showDeleteModal: boolean;
  handleCloseDeleteModal: () => void;
  deleteTweet: () => Promise<void>;
  showDeleteErrorsModal: boolean;
  handleCloseDeleteErrorsModal: () => void;
}

export default function DeleteTweetWarningModal({
  isLoading,
  error,
  showDeleteModal,
  handleCloseDeleteModal,
  deleteTweet,
  showDeleteErrorsModal,
  handleCloseDeleteErrorsModal,
}: DeleteTweetWarningModalProps) {
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
        <DeleteTweetErrorModal
          error={error}
          showDeleteErrorsModal={showDeleteErrorsModal}
          handleCloseDeleteErrorsModal={handleCloseDeleteErrorsModal}
        />
      )}
    </div>
  );
}
