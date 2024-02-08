import { Dropdown, Nav } from "react-bootstrap";
import HeaderProfileToggle from "./header-profile-toggle";
import HeaderProfileMenu from "./header-profile-menu";

export interface HeaderProfileProps {
  handleShowModal: () => void;
}

export default function HeaderProfile({ handleShowModal }: HeaderProfileProps) {
  return (
    <Nav>
      <Dropdown drop="start">
        <HeaderProfileToggle />
        <HeaderProfileMenu handleShowModal={handleShowModal} />
      </Dropdown>
    </Nav>
  );
}
