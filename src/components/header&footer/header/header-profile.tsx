import { Dropdown, Nav } from "react-bootstrap";
import HeaderProfileToggle from "./header-profile-toggle";
import HeaderProfileMenu from "./header-profile-menu";

export interface HeaderProfileProps {
  avatar: string | null | undefined;
  handleShowModal: () => void;
}

export default function HeaderProfile({
  avatar,
  handleShowModal,
}: HeaderProfileProps) {
  return (
    <Nav>
      <Dropdown drop="start">
        <HeaderProfileToggle avatar={avatar} />
        <HeaderProfileMenu handleShowModal={handleShowModal} />
      </Dropdown>
    </Nav>
  );
}
