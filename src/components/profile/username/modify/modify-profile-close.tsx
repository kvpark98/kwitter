import { Button } from "react-bootstrap";

export interface ModifyProfileCloseProps {
  handleCloseModifyModal: () => void;
}

export default function ModifyProfileClose({
  handleCloseModifyModal,
}: ModifyProfileCloseProps) {
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
