import { Button } from "react-bootstrap";

export interface ModifyButtonCloseProps {
  handleCloseModifyModal: () => void;
}

export default function ModifyButtonClose({
  handleCloseModifyModal,
}: ModifyButtonCloseProps) {
  return (
    <Button
      type="button"
      variant="dark"
      className="me-2 rounded-pill"
      onClick={handleCloseModifyModal}
    >
      Close
    </Button>
  );
}
