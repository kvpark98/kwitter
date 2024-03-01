import { Button } from "react-bootstrap";

export interface SideBarNavPostProps {
  handleShowCreateModal: () => void;
}

export default function SideBarNavPost({
  handleShowCreateModal,
}: SideBarNavPostProps) {
  return (
    <Button
      type="button"
      variant="primary"
      className="mt-2 rounded-pill fs-5 fw-bold"
      onClick={handleShowCreateModal}
    >
      Post
    </Button>
  );
}
