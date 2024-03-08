import { Button } from "react-bootstrap";

export interface ChangeUsernameCloseProps {
  handleCloseModifyModal: () => void;
}

export default function ChangeUsernameClose({
  handleCloseModifyModal,
}: ChangeUsernameCloseProps) {
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
