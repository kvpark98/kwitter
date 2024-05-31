import { CloseButton, Container, Navbar } from "react-bootstrap";

export interface ModifyProfileHeaderProps {
  handleCloseModifyProfileModal: () => void;
}

export default function ModifyProfileHeader({
  handleCloseModifyProfileModal,
}: ModifyProfileHeaderProps) {
  return (
    <Navbar className="bg-body-light rounded-top border-bottom">
      <Container>
        <Navbar.Brand className="me-0 fw-bold">Edit profile</Navbar.Brand>
        <CloseButton onClick={handleCloseModifyProfileModal} />
      </Container>
    </Navbar>
  );
}
