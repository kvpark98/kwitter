import { Alert, Button, Modal } from "react-bootstrap";

export interface CreateTweetSuccessModalProps {
  showCreateTweetSuccessModal: boolean;
  handleCloseCreateTweetSuccessModal: () => void;
}

export default function CreateTweetSuccessModal({
  showCreateTweetSuccessModal,
  handleCloseCreateTweetSuccessModal,
}: CreateTweetSuccessModalProps) {
  return (
    <Modal
      show={showCreateTweetSuccessModal}
      onHide={handleCloseCreateTweetSuccessModal}
      backdrop="static"
      keyboard={false}
    >
      <Alert variant="success" className="m-0 p-0">
        <Modal.Body>
          <Alert.Heading className="mb-3">Success</Alert.Heading>
          <p>Tweet successfully posted!</p>
        </Modal.Body>
        <Modal.Footer className="border-0 pt-0 p-3">
          <Button
            variant="dark"
            className="rounded-pill"
            onClick={handleCloseCreateTweetSuccessModal}
          >
            Close
          </Button>
        </Modal.Footer>
      </Alert>
    </Modal>
  );
}
