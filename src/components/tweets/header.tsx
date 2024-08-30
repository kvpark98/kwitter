import { Button, Navbar } from "react-bootstrap";
import { ITweet } from "./query/detail/tweet";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import SideBar from "../sidebar/side-bar";
import Back from "./back";
import Title from "./title";
import { User } from "firebase/auth";

export interface HeaderProps {
  user?: User | null;
  tweets?: ITweet[];
  handleShowCreateTweetModal?: () => void;
}

export default function Header({
  user,
  tweets,
  handleShowCreateTweetModal,
}: HeaderProps) {
  const navigate = useNavigate();

  const [showSidebar, setShowSidebar] = useState(false);

  const toggleShowSidebar = () => setShowSidebar((current) => !current);
  const handleCloseSidebar = () => setShowSidebar(false);

  const back = () => {
    navigate(-1);
  };

  return (
    <>
      <Navbar bg="dark" className="d-flex align-items-center" sticky="top">
        <Back back={back} />
        <Title user={user} tweets={tweets} />
        <Button variant="light" onClick={toggleShowSidebar} className="me-2">
          Sidebar
        </Button>
      </Navbar>
      <SideBar
        showSidebar={showSidebar}
        handleCloseSidebar={handleCloseSidebar}
        handleShowCreateTweetModal={handleShowCreateTweetModal}
      />
    </>
  );
}
