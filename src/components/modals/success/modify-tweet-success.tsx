import { Alert, Button, Modal } from "react-bootstrap";

export interface ModifyTweetSuccessProps {
  showModifyTweetSuccessModal: boolean;
  handleCloseModifyTweetSuccessModal: () => void;
}

export default function ModifyTweetSuccess({
  showModifyTweetSuccessModal,
  handleCloseModifyTweetSuccessModal,
}: ModifyTweetSuccessProps) {
  return (
    <Modal
      show={showModifyTweetSuccessModal}
      onHide={handleCloseModifyTweetSuccessModal}
      backdrop="static"
      keyboard={false}
    >
      <Alert variant="success" className="m-0 p-0">
        <Modal.Body>
          <Alert.Heading className="mb-3">Success</Alert.Heading>
          <p>Tweet successfully modified!</p>
        </Modal.Body>
        <Modal.Footer className="border-0 pt-0 p-3">
          <Button
            variant="dark"
            className="rounded-pill"
            onClick={handleCloseModifyTweetSuccessModal}
          >
            Close
          </Button>
        </Modal.Footer>
      </Alert>
    </Modal>
  );
}
