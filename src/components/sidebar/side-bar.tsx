import { useNavigate } from "react-router-dom";
import { useState } from "react";
import SideBarNav from "./side-bar-nav";
import { auth } from "../../firebase";
import SignOutWarningModal from "../modals/warning/sign-out-warning-modal";

export interface SideBarProps {
  showSidebar: boolean;
  handleCloseSidebar: () => void;
  handleShowCreateTweetModal?: () => void;
}

export default function SideBar({
  showSidebar,
  handleCloseSidebar,
  handleShowCreateTweetModal,
}: SideBarProps) {
  const navigate = useNavigate();

  const [showSignOutModal, setShowSignOutModal] = useState(false);
  const handleShowSignOutModal = () => setShowSignOutModal(true);
  const handleCloseSignOutModal = () => setShowSignOutModal(false);

  const signOut = () => {
    auth.signOut();
    navigate("/welcome");
  };

  return (
    <div>
      <SideBarNav
        showSidebar={showSidebar}
        handleCloseSidebar={handleCloseSidebar}
        handleShowSignOutModal={handleShowSignOutModal}
        handleShowCreateTweetModal={handleShowCreateTweetModal!}
      />
      <SignOutWarningModal
        showSignOutModal={showSignOutModal}
        handleCloseSignOutModal={handleCloseSignOutModal}
        signOut={signOut}
      />
    </div>
  );
}
