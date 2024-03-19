import { CloseButton, Container, Navbar } from "react-bootstrap";

export interface ModifyProfileHeaderProps {
  handleCloseModifyModal: () => void;
}

export default function ModifyProfileHeader({
  handleCloseModifyModal,
}: ModifyProfileHeaderProps) {
  return (
    <Navbar className="bg-body-light rounded-top border-bottom">
      <Container>
        <Navbar.Brand className="me-0 fw-bold">Edit Profile</Navbar.Brand>
        <CloseButton onClick={handleCloseModifyModal} />
      </Container>
    </Navbar>
  );
}
