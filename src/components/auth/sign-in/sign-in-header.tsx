import { CloseButton, Container, Navbar } from "react-bootstrap";

export interface SignInHeaderProps {
  handleCloseSignInModal: () => void;
}

export default function SignInHeader({
  handleCloseSignInModal,
}: SignInHeaderProps) {
  return (
    <Navbar className="bg-body-light rounded-top border-bottom">
      <Container>
        <Navbar.Brand className="me-0 fw-bold">Sign in</Navbar.Brand>
        <CloseButton onClick={handleCloseSignInModal} />
      </Container>
    </Navbar>
  );
}
