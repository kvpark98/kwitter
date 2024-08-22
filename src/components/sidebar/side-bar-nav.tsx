import { Nav } from "react-bootstrap";
import SideBarNavHome from "./side-bar-nav-home";
import SideBarNavProfile from "./side-bar-nav-profile";
import SideBarNavAccount from "./side-bar-nav-account";
import SideBarNavSignOut from "./side-bar-nav-sign-out";
import SideBarNavPost from "./side-bar-nav-post";

export interface SideBarNavProps {
  handleShowSignOutModal: () => void;
  handleShowCreateTweetModal: () => void;
}

export default function SideBarNav({
  handleShowSignOutModal,
  handleShowCreateTweetModal,
}: SideBarNavProps) {
  return (
    <Nav className="nav-pills flex-column gap-2 fs-5">
      <SideBarNavHome />
      <SideBarNavProfile />
      <SideBarNavAccount />
      <SideBarNavSignOut handleShowSignOutModal={handleShowSignOutModal} />
      {window.location.href === "https://learn-korean-well.web.app/" && (
        <SideBarNavPost
          handleShowCreateTweetModal={handleShowCreateTweetModal}
        />
      )}
    </Nav>
  );
}
