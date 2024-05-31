import { CloseButton, Container, Navbar } from "react-bootstrap";

export interface CropAvatarHeaderProps {
  handleCloseAvatarCropModal: () => void;
}

export default function CropAvatarHeader({
  handleCloseAvatarCropModal,
}: CropAvatarHeaderProps) {
  return (
    <Navbar className="flex-fill rounded-top bg-body-light border-bottom">
      <Container>
        <Navbar.Brand className="me-0 fw-bold">Edit media</Navbar.Brand>
        <CloseButton onClick={handleCloseAvatarCropModal} />
      </Container>
    </Navbar>
  );
}
