import { Container, Navbar } from "react-bootstrap";

export default function ResetPasswordHeader() {
  return (
    <Navbar className="bg-body-light rounded-top border-bottom">
      <Container>
        <Navbar.Brand className="me-0 fw-bold">Reset password</Navbar.Brand>
      </Container>
    </Navbar>
  );
}
