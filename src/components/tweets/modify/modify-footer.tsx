import { Button, Modal } from "react-bootstrap";

export interface ModifyFooterProps {
  isLoading: boolean;
  isNewMessage: boolean;
  handleCloseModifyModal: () => void;
}

export default function ModifyFooter({
  isLoading,
  isNewMessage,
  handleCloseModifyModal,
}: ModifyFooterProps) {
  return (
    <Modal.Footer className="border-0 pt-0 p-3">
      <Button
        type="submit"
        className="w-100 m-0 mb-3 fw-bold"
        {...(!isNewMessage ? { disabled: true } : { disabled: false })}
      >
        {isLoading ? "Modifying..." : "Modify"}
      </Button>
      <Button
        type="button"
        variant="outline-dark"
        className="w-100 m-0"
        onClick={handleCloseModifyModal}
      >
        Close
      </Button>
    </Modal.Footer>
  );
}
