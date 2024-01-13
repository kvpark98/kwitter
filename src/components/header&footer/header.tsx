import { Container, Dropdown, Nav, NavDropdown, Navbar } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../firebase";

export default function Header() {
  const navigate = useNavigate();

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
          {auth.currentUser ? (
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
                  <Dropdown.Item className="d-flex align-items-center" disabled>
                    <img
                      src="/default-profile.png"
                      alt="Profile image"
                      width="30"
                      height="30"
                      className="rounded-circle align-middle bg-secondary me-3"
                    />
                    <p>{auth.currentUser?.displayName}</p>
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item href="/profile">Profile</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown drop="start" className="px-3">
                    <Dropdown.Toggle
                      variant="link"
                      id="dropdown-basic"
                      className="text-decoration-none text-dark p-0"
                    >
                      Account
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item href="/change-username">
                        Change Username
                      </Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Item href="/change-password">
                        Change Password
                      </Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Item href="/delete-account">
                        Delete Account
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={signOut}>Sign Out</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Nav>
          ) : (
            <Nav>
              <Link to="/sign-in" className="btn btn-outline-success">
                Sign In
              </Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
