import { Nav } from "react-bootstrap";
import SideBarNavHome from "./side-bar-nav-home";
import SideBarNavProfile from "./side-bar-nav-profile";
import SideBarNavAccount from "./side-bar-nav-account";
import SideBarNavSignOut from "./side-bar-nav-sign-out";
import SideBarNavPost from "./side-bar-nav-post";

export interface SideBarNavProps {
  handleShowSignOutModal: () => void;
  handleShowCreateModal: () => void;
}

export default function SideBarNav({
  handleShowSignOutModal,
  handleShowCreateModal,
}: SideBarNavProps) {
  return (
    <Nav className="nav-pills flex-column gap-3 fs-5">
      <SideBarNavHome />
      <SideBarNavProfile />
      <SideBarNavAccount />
      <SideBarNavSignOut handleShowSignOutModal={handleShowSignOutModal} />
      {window.location.href === "http://127.0.0.1:5173/" && (
        <SideBarNavPost handleShowCreateModal={handleShowCreateModal} />
      )}
    </Nav>
  );
}
