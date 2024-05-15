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
  @media screen and (min-width: 700px) {
    padding: 6px 12px 0 12px !important;
    min-width: 76px !important;
  }
  @media screen and (max-width: 700px) {
    padding: 6px 9px 0 9px !important;
    min-width: 66px !important;
  }
  @media screen and (max-width: 500px) {
    padding: 6px 6px 0 6px !important;
    min-width: 58px !important;
  }
`;

export default function SideBar({ handleShowCreateTweetModal }: SideBarProps) {
  const navigate = useNavigate();

  const [showSignOutModal, setShowSignOutModal] = useState(false);
  const handleShowSignOutModal = () => setShowSignOutModal(true);
  const handleCloseSignOutModal = () => setShowSignOutModal(false);

  const signOut = () => {
    auth.signOut();
    navigate("/welcome");
  };

  return (
    <StyledSidebar className="overflow-y-auto d-flex flex-column border-end bg-light">
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
