import {
  Alert,
  Button,
  Container,
  Dropdown,
  Modal,
  Nav,
  NavDropdown,
  Navbar,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { useState } from "react";

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
    <Navbar expand="lg" bg="dark" variant="dark" sticky="top">
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
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0" navbarScroll>
            <Nav.Link href="#action1">Pricing</Nav.Link>
            <NavDropdown title="Features" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#action2">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action3">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action4">
                Something else here
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="#">FAQS</Nav.Link>
          </Nav>
          <Nav>
            <Dropdown drop="start">
              <Dropdown.Toggle
                variant="link"
                id="dropdown-basic"
                className="text-decoration-none p-0"
                aria-controls="s"
              >
                <img
                  src="/default-profile.png"
                  alt="Profile image"
                  width="30"
                  height="30"
                  className="rounded-circle align-middle bg-light"
                />
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {auth.currentUser && (
                  <div>
                    <Dropdown.Item
                      className="d-flex align-items-center"
                      disabled
                    >
                      <img
                        src="/default-profile.png"
                        alt="Profile image"
                        width="30"
                        height="30"
                        className="rounded-circle align-middle bg-secondary me-3"
                      />
                      <p>{auth.currentUser.displayName}</p>
                    </Dropdown.Item>
                    <Dropdown.Divider />
                  </div>
                )}
                <Dropdown.Item href="/settings/profile">Settings</Dropdown.Item>
                <Dropdown.Divider />
                {auth.currentUser ? (
                  <Dropdown.Item onClick={handleShowModal}>
                    Sign Out
                  </Dropdown.Item>
                ) : (
                  <Dropdown.Item href="/sign-in">Sign In</Dropdown.Item>
                )}
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Navbar.Collapse>
        <Modal
          show={showModal}
          onHide={handleCloseModal}
          backdrop="static"
          keyboard={false}
        >
          <Alert variant="warning" className="m-0 p-0">
            <Modal.Body>
              <Alert.Heading className="mb-3">Are You Sure?</Alert.Heading>
              <p>
                Signing out will end your current session. Do you want to
                proceed?
              </p>
            </Modal.Body>
            <Modal.Footer className="border-0 pt-0 p-3">
              <Button variant="outline-dark" onClick={handleCloseModal}>
                Cancel
              </Button>
              <Button variant="outline-primary" onClick={signOut}>
                Sign Out
              </Button>
            </Modal.Footer>
          </Alert>
        </Modal>
      </Container>
    </Navbar>
  );
}
