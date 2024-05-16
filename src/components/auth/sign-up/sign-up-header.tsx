import { CloseButton, Container, Navbar } from "react-bootstrap";

export interface SignUpHeaderProps {
  handleCloseSignUpModal: () => void;
}

export default function SignUpHeader({
  handleCloseSignUpModal,
}: SignUpHeaderProps) {
  return (
    <Navbar className="bg-body-light rounded-top border-bottom">
      <Container>
        <Navbar.Brand className="me-0 fw-bold">Sign up</Navbar.Brand>
        <CloseButton onClick={handleCloseSignUpModal} />
      </Container>
    </Navbar>
  );
}
