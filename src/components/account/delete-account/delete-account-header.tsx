import { CloseButton, Container, Navbar } from "react-bootstrap";

export interface DeleteAccountHeaderProps {
  handleCloseDeleteAccountModal: () => void;
}

export default function DeleteAccountHeader({
  handleCloseDeleteAccountModal,
}: DeleteAccountHeaderProps) {
  return (
    <Navbar className="bg-body-light rounded-top border-bottom">
      <Container>
        <Navbar.Brand className="me-0 fw-bold">Delete account</Navbar.Brand>
        <CloseButton onClick={handleCloseDeleteAccountModal} />
      </Container>
    </Navbar>
  );
}
