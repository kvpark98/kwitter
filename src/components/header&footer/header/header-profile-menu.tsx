import { Dropdown } from "react-bootstrap";
import HeaderProfileItemUser from "./header-profile-item-user";
import HeaderProfileItemSignOut from "./header-profile-item-sign-out";
import HeaderProfileItemAccount from "./header-profile-item-account";

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
      <HeaderProfileItemAccount />
      <Dropdown.Divider />
      <HeaderProfileItemSignOut handleShowModal={handleShowModal} />
    </Dropdown.Menu>
  );
}
