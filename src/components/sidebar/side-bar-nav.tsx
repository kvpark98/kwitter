import { Nav } from "react-bootstrap";
import Offcanvas from "react-bootstrap/Offcanvas";
import SideBarNavHome from "./side-bar-nav-home";
import SideBarNavProfile from "./side-bar-nav-profile";
import SideBarNavAccount from "./side-bar-nav-account";
import SideBarNavSignOut from "./side-bar-nav-sign-out";
import SideBarNavPost from "./side-bar-nav-post";
import SideBarLogo from "./side-bar-logo";

export interface SideBarNavProps {
  showSidebar: boolean;
  handleCloseSidebar: () => void;
  handleShowSignOutModal: () => void;
  handleShowCreateTweetModal: () => void;
}

export default function SideBarNav({
  showSidebar,
  handleCloseSidebar,
  handleShowSignOutModal,
  handleShowCreateTweetModal,
}: SideBarNavProps) {
  return (
    <Offcanvas show={showSidebar} onHide={handleCloseSidebar} backdrop={true}>
      <Offcanvas.Header>
        <SideBarLogo />
      </Offcanvas.Header>
      <Offcanvas.Body style={{ width: "84px" }}>
        <Nav className="nav-pills flex-column gap-2 fs-5">
          <SideBarNavHome />
          <SideBarNavProfile />
          <SideBarNavAccount />
          {(window.location.href === "https://learn-korean-well.web.app/" ||
            window.location.href ===
              "https://learn-korean-well.firebaseapp.com/") && (
            <SideBarNavPost
              handleShowCreateTweetModal={handleShowCreateTweetModal}
            />
          )}
          <SideBarNavSignOut handleShowSignOutModal={handleShowSignOutModal} />
        </Nav>
      </Offcanvas.Body>
    </Offcanvas>
  );
}
