import { Button } from "react-bootstrap";

export interface SideBarNavSignOutProps {
  handleShowSignOutModal: () => void;
}

export default function SideBarNavSignOut({
  handleShowSignOutModal,
}: SideBarNavSignOutProps) {
  return (
    <Button
      type="button"
      variant="danger"
      className="mt-3 rounded-pill fs-5 fw-bold"
      onClick={handleShowSignOutModal}
    >
      Sign Out
    </Button>
  );
}
