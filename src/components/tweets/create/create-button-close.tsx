import { Button } from "react-bootstrap";

export interface CreateButtonCloseProps {
  handleCloseCreateModal: () => void;
}

export default function CreateButtonClose({
  handleCloseCreateModal,
}: CreateButtonCloseProps) {
  return (
    <Button
      type="button"
      variant="dark"
      className="me-2 rounded-pill"
      onClick={handleCloseCreateModal}
    >
      Close
    </Button>
  );
}
