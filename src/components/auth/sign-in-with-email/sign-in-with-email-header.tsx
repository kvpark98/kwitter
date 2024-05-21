import { Container, Navbar } from "react-bootstrap";

export default function SignInWithEmailHeader() {
  return (
    <Navbar className="bg-body-light rounded-top border-bottom">
      <Container>
        <Navbar.Brand className="me-0 fw-bold">Sign in with email</Navbar.Brand>
      </Container>
    </Navbar>
  );
}
