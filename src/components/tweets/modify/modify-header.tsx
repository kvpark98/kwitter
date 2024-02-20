import { Alert, Modal } from "react-bootstrap";

export default function ModifyHeader() {
  return (
    <Modal.Header className="d-flex justify-content-center align-items-center border-0 pb-0">
      <Alert.Heading className="m-0 fs-2">Modify Tweet</Alert.Heading>
    </Modal.Header>
  );
}
