import {
  Button,
  Container,
  Dropdown,
  Form,
  Nav,
  NavDropdown,
  Navbar,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { Alert, Modal } from "react-bootstrap";
import {
  EmailAuthProvider,
  deleteUser,
  reauthenticateWithCredential,
} from "firebase/auth";
import { useState } from "react";
import { FirebaseError } from "firebase/app";

export default function Header() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const [password, setPassword] = useState("");

  const [isPassword, setIsPassword] = useState(false);

  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const handleShowDeleteModal = () => setShowDeleteModal(true);
  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    reset();
  };

  const [error, setError] = useState("");

  const [showErrorModal, setShowErrorModal] = useState(false);
  const handleShowErrorModal = () => setShowErrorModal(true);
  const handleCloseErrorModal = () => setShowErrorModal(false);

  const goBackModal = () => {
    handleCloseErrorModal();
    handleShowDeleteModal();
  };

  const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setPassword(value.replace(/\s/gi, ""));

    if (value !== "") {
      setIsPassword(true);

      document
        .getElementById("password")
        ?.classList.remove("form-control-invalid");
    } else {
      setPasswordErrorMessage("");
      setIsPassword(false);

      document
        .getElementById("password")
        ?.classList.remove("form-control-invalid");
    }
  };

  const noSpace = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.code === "Space") {
      event.preventDefault();
    }
  };

  const reset = () => {
    setPassword("");

    setIsPassword(false);

    setPasswordErrorMessage("");

    document
      .getElementById("password")
      ?.classList.remove("form-control-invalid");
  };

  const signOut = () => {
    auth.signOut();
    handleCloseDeleteModal();
    navigate("/sign-in");
  };

  const deleteAccount = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (password === "") {
      setPasswordErrorMessage("Please enter your password.");
      setIsPassword(false);

      document
        .getElementById("password")
        ?.classList.add("form-control-invalid");
    }

    if (isLoading || !isPassword) {
      return;
    }

    setError("");

    try {
      setIsLoading(true);

      const credential = EmailAuthProvider.credential(
        auth.currentUser?.email!,
        password
      );

      await reauthenticateWithCredential(auth.currentUser!, credential);

      await deleteUser(auth.currentUser!);

      window.localStorage.setItem("accountDeleted", "true");

      signOut();
    } catch (error) {
      if (error instanceof FirebaseError) {
        setError(error.code);
        console.log(error.code);
        window.localStorage.removeItem("accountDeleted");

        handleCloseDeleteModal();
        handleShowErrorModal();
      }
    } finally {
      setIsLoading(false);
    }
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
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link href="#action1">Home</Nav.Link>
            <Nav.Link href="#action2">Pricing</Nav.Link>
            <NavDropdown title="Features" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action4">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action5">
                Something else here
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="#">FAQS</Nav.Link>
          </Nav>
          {auth.currentUser ? (
            <Nav>
              <Dropdown drop="start">
                <Dropdown.Toggle
                  variant="link"
                  id="dropdown-basic"
                  className="text-decoration-none p-0"
                >
                  <img
                    src="/default-profile.png"
                    alt="Profile image"
                    width="30"
                    height="30"
                    className="rounded-circle align-middle"
                  />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item disabled>
                    {auth.currentUser?.displayName}
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item href="/profile">Profile</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item href="/update-username">
                    Update Username
                  </Dropdown.Item>
                  <Dropdown.Item href="/change-password">
                    Change password
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={signOut}>Sign out</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={handleShowDeleteModal}>
                    Delete account
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Nav>
          ) : (
            <Nav>
              <Link to="/sign-in" className="btn btn-outline-success me-2">
                Sign in
              </Link>
            </Nav>
          )}
        </Navbar.Collapse>
        <Modal
          show={showDeleteModal}
          onHide={handleCloseDeleteModal}
          backdrop="static"
          keyboard={false}
        >
          <Alert variant="warning" className="m-0 p-0">
            <Form onSubmit={deleteAccount}>
              <Modal.Body>
                <Alert.Heading className="mb-3">Delete account</Alert.Heading>
                <Form.Group>
                  <Form.Label htmlFor="password">
                    Please enter your password to delete your account
                  </Form.Label>
                  <Form.Control
                    className="border-none mt-1 mb-1"
                    onChange={handlePassword}
                    onKeyDown={noSpace}
                    id="password"
                    name="password"
                    value={password}
                    type="password"
                    maxLength={20}
                  />
                  {!isPassword && passwordErrorMessage && (
                    <div className="mt-2 text-danger">
                      {passwordErrorMessage}
                    </div>
                  )}
                </Form.Group>
              </Modal.Body>
              <Modal.Footer className="d-flex border-0 pt-0 p-3 w-100">
                <div className="ms-0 me-auto">
                  <Button onClick={reset} type="button" variant="outline-info">
                    Reset
                  </Button>
                </div>
                <div className="me-0">
                  <Button
                    variant="outline-dark"
                    className="me-2"
                    onClick={handleCloseDeleteModal}
                  >
                    Close
                  </Button>
                  <Button type="submit" variant="outline-danger">
                    {isLoading ? "Loading..." : "Delete"}
                  </Button>
                </div>
              </Modal.Footer>
            </Form>
          </Alert>
        </Modal>
        {/* Error Modal */}
        <Modal
          show={showErrorModal}
          onHide={handleCloseErrorModal}
          backdrop="static"
          keyboard={false}
        >
          <Alert variant="danger" className="m-0 p-0">
            <Modal.Body>
              <Alert.Heading className="mb-3">Error</Alert.Heading>
              <p>
                <span>
                  {error === "auth/invalid-login-credentials" &&
                    "Incorrect email or password."}
                  {error === "auth/requires-recent-login" &&
                    "This requires recent sign-in. Please sign in again."}
                  {error === "auth/network-request-failed" &&
                    "A network error has occurred. Please reopen the page."}
                  {error === "auth/invalid-user-token" &&
                    "Your credential is no longer valid. Please sign in again."}
                  {error === "auth/user-token-expired" &&
                    "Your credential has expired. Please sign in again."}
                  {error === "auth/web-storage-unsupported" &&
                    "Your browser does not support web storage. Please try again."}
                </span>
              </p>
            </Modal.Body>
            <Modal.Footer className="border-0 pt-0 p-3">
              <Button variant="outline-dark" onClick={handleCloseErrorModal}>
                Close
              </Button>
              <Button variant="outline-primary" onClick={goBackModal}>
                Back
              </Button>
            </Modal.Footer>
          </Alert>
        </Modal>
      </Container>
    </Navbar>
  );
}
