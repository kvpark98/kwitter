import { useNavigate } from "react-router-dom";
import { useState } from "react";
import SideBarLogo from "./side-bar-logo";
import SideBarNav from "./side-bar-nav";
import styled from "@emotion/styled";
import SignOutModal from "../modals/warning/sign-out-modal";
import { auth } from "../../firebase";

export interface SideBarProps {
  handleShowCreateTweetModal?: () => void;
}

// 미디어 쿼리를 사용하여 스타일 정의
const StyledSidebar = styled.div`
  @media screen and (max-width: 700px) {
    padding: 10px 10px 0 10px !important;
  }
  @media screen and (max-width: 600px) {
    padding: 7px 7px 0 7px !important;
  }
`;

export default function SideBar({ handleShowCreateTweetModal }: SideBarProps) {
  const navigate = useNavigate();

  const [showSignOutModal, setShowSignOutModal] = useState(false);
  const handleShowSignOutModal = () => setShowSignOutModal(true);
  const handleCloseSignOutModal = () => setShowSignOutModal(false);

  const signOut = () => {
    auth.signOut();
    navigate("/sign-in");
  };

  return (
    <StyledSidebar className="d-flex flex-column px-3 pt-3 border bg-light">
      <SideBarLogo />
      <hr />
      <SideBarNav
        handleShowSignOutModal={handleShowSignOutModal}
        handleShowCreateTweetModal={handleShowCreateTweetModal!}
      />
      <SignOutModal
        showSignOutModal={showSignOutModal}
        handleCloseSignOutModal={handleCloseSignOutModal}
        signOut={signOut}
      />
    </StyledSidebar>
  );
}
