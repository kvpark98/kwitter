import { useNavigate } from "react-router-dom";
import SignOutModal from "../../modals/warning/sign-out-modal";
import { auth } from "../../../firebase";
import { useState } from "react";
import SideBarLogo from "./side-bar-logo";
import SideBarNav from "./side-bar-nav";
import styled from "@emotion/styled";

export interface SideBarProps {
  handleShowCreateTweetModal?: () => void;
}

// 미디어 쿼리를 사용하여 스타일 정의
const StyledDiv = styled.div`
  @media screen and (max-width: 1270px) {
    display: block;
    width: 100px;
    position: absolute;
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
    <div className="d-flex flex-column px-3 pt-3 border bg-light">
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
    </div>
  );
}
