import { CloseButton, Container, Navbar } from "react-bootstrap";

export interface ModifyCropPhotoHeaderProps {
  handleCloseModifyPhotoCropModal: () => void;
}

export default function ModifyCropPhotoHeader({
  handleCloseModifyPhotoCropModal,
}: ModifyCropPhotoHeaderProps) {
  return (
    <Navbar className="flex-fill rounded-top bg-body-light border-bottom">
      <Container>
        <Navbar.Brand className="me-0 fw-bold">Edit media</Navbar.Brand>
        <CloseButton onClick={handleCloseModifyPhotoCropModal} />
      </Container>
    </Navbar>
  );
}
