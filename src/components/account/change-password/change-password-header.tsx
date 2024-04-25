import { CloseButton, Container, Navbar } from "react-bootstrap";

export interface ChangePasswordHeaderProps {
  handleCloseChangePasswordModal: () => void;
}

export default function ChangePasswordHeader({
  handleCloseChangePasswordModal,
}: ChangePasswordHeaderProps) {
  return (
    <Navbar className="bg-body-light rounded-top border-bottom">
      <Container>
        <Navbar.Brand className="me-0 fw-bold">Change Password</Navbar.Brand>
        <CloseButton onClick={handleCloseChangePasswordModal} />
      </Container>
    </Navbar>
  );
}
