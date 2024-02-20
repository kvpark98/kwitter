import { Button, Modal } from "react-bootstrap";

export interface ChangeUsernameFooterProps {
  isLoading: boolean;
  isName: boolean;
  handleCloseModifyModal: () => void;
}

export default function ChangeUsernameFooter({
  isLoading,
  isName,
  handleCloseModifyModal,
}: ChangeUsernameFooterProps) {
  return (
    <Modal.Footer className="border-0 pt-0 p-3">
      <Button
        type="submit"
        className="w-100 m-0 mb-3 fw-bold"
        {...(!isName ? { disabled: true } : { disabled: false })}
      >
        {isLoading ? "Changing..." : "Change"}
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
