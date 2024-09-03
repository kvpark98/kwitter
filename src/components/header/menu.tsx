import { Button } from "react-bootstrap";

export interface MenuProps {
  toggleShowSidebar: () => void;
}

export default function Menu({ toggleShowSidebar }: MenuProps) {
  return (
    <Button variant="light" onClick={toggleShowSidebar} className="me-2">
      Menu
    </Button>
  );
}
