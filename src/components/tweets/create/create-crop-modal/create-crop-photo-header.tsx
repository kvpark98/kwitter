import { CloseButton, Container, Navbar } from "react-bootstrap";

export interface CreateCropPhotoHeaderProps {
  handleClosePhotoCropModal: () => void;
}

export default function CreateCropPhotoHeader({
  handleClosePhotoCropModal,
}: CreateCropPhotoHeaderProps) {
  return (
    <Navbar className="flex-fill rounded-top bg-body-light border-bottom">
      <Container>
        <Navbar.Brand className="me-0 fw-bold">Edit media</Navbar.Brand>
        <CloseButton onClick={handleClosePhotoCropModal} />
      </Container>
    </Navbar>
  );
}
