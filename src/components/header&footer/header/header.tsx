import { Container, Navbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { auth } from "../../../firebase";
import { useState } from "react";
import SignOutModal from "../../modals/warning/sign-out-modal";
import HeaderProfile from "./header-profile";

export default function Header() {
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const signOut = () => {
    auth.signOut();
    navigate("/sign-in");
  };

  return (
    <Navbar bg="dark" variant="dark" sticky="top">
      <Container fluid>
        <Navbar.Brand href="/">
          <img
            src="/vite.svg"
            width="30"
            height="30"
            className="align-middle me-2"
            alt="Learn-Korean-Well"
          />
          <span className="align-middle">Learn-Korean-Well</span>
        </Navbar.Brand>
        {auth.currentUser && (
          <HeaderProfile handleShowModal={handleShowModal} />
        )}
      </Container>
      <SignOutModal
        showModal={showModal}
        handleCloseModal={handleCloseModal}
        signOut={signOut}
      />
    </Navbar>
  );
}
