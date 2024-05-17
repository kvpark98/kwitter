import { CloseButton, Container, Navbar } from "react-bootstrap";

export interface SendSignInLinkHeaderProps {
  handleCloseSendSignInLinkModal: () => void;
}

export default function SendSignInLinkHeader({
  handleCloseSendSignInLinkModal,
}: SendSignInLinkHeaderProps) {
  return (
    <Navbar className="bg-body-light rounded-top border-bottom">
      <Container>
        <Navbar.Brand className="me-0 fw-bold">Send Sign-in Link</Navbar.Brand>
        <CloseButton onClick={handleCloseSendSignInLinkModal} />
      </Container>
    </Navbar>
  );
}
