import { Alert, Button, Modal } from "react-bootstrap";

export interface TweetDeleteSuccessModalProps {
  showDeleteTweetSuccessModal: boolean;
  handleCloseDeleteTweetSuccessModal: () => void;
}

export default function TweetDeleteSuccessModal({
  showDeleteTweetSuccessModal,
  handleCloseDeleteTweetSuccessModal,
}: TweetDeleteSuccessModalProps) {
  return (
    <Modal
      show={showDeleteTweetSuccessModal}
      onHide={handleCloseDeleteTweetSuccessModal}
      backdrop="static"
      keyboard={false}
    >
      <Alert variant="success" className="m-0 p-0">
        <Modal.Body>
          <Alert.Heading className="mb-3">Success</Alert.Heading>
          <p>Your tweet has been successfully deleted.</p>
        </Modal.Body>
        <Modal.Footer className="border-0 pt-0 p-3">
          <Button
            variant="dark"
            className="rounded-pill"
            onClick={handleCloseDeleteTweetSuccessModal}
          >
            Close
          </Button>
        </Modal.Footer>
      </Alert>
    </Modal>
  );
}
