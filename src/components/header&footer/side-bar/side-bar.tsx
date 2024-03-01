import { useNavigate } from "react-router-dom";
import SignOutModal from "../../modals/warning/sign-out-modal";
import { auth } from "../../../firebase";
import { useState } from "react";
import SideBarLogo from "./side-bar-logo";
import SideBarNav from "./side-bar-nav";

export interface SideBarProps {
  handleShowCreateModal?: () => void;
}

export default function SideBar({ handleShowCreateModal }: SideBarProps) {
  const navigate = useNavigate();

  const [showSignOutModal, setShowSignOutModal] = useState(false);
  const handleShowSignOutModal = () => setShowSignOutModal(true);
  const handleCloseSignOutModal = () => setShowSignOutModal(false);

  const signOut = () => {
    auth.signOut();
    navigate("/sign-in");
  };

  return (
    <div
      className="d-flex flex-column flex-shrink-0 p-3 text-bg-light h-100"
      style={{ width: "280px", position: "fixed" }}
    >
      <SideBarLogo />
      <hr />
      <SideBarNav
        handleShowSignOutModal={handleShowSignOutModal}
        handleShowCreateModal={handleShowCreateModal!}
      />
      <SignOutModal
        showSignOutModal={showSignOutModal}
        handleCloseSignOutModal={handleCloseSignOutModal}
        signOut={signOut}
      />
    </div>
  );
}
