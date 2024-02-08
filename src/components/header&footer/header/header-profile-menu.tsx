import { Dropdown } from "react-bootstrap";
import HeaderProfileItemUser from "./header-profile-item-user";
import HeaderProfileItemSettings from "./header-profile-item-settings";
import HeaderProfileItemSignOut from "./header-profile-item-sign-out";

export interface HeaderProfileMenuProps {
  handleShowModal: () => void;
}

export default function HeaderProfileMenu({
  handleShowModal,
}: HeaderProfileMenuProps) {
  return (
    <Dropdown.Menu>
      <HeaderProfileItemUser />
      <Dropdown.Divider />
      <HeaderProfileItemSettings />
      <Dropdown.Divider />
      <HeaderProfileItemSignOut handleShowModal={handleShowModal} />
    </Dropdown.Menu>
  );
}
