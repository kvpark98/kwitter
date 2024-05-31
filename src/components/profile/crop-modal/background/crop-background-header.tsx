import { CloseButton, Container, Navbar } from "react-bootstrap";

export interface CropBackgroundHeaderProps {
  handleCloseBackgroundCropModal: () => void;
}

export default function CropBackgroundHeader({
  handleCloseBackgroundCropModal,
}: CropBackgroundHeaderProps) {
  return (
    <Navbar className="flex-fill rounded-top bg-body-light border-bottom">
      <Container>
        <Navbar.Brand className="me-0 fw-bold">Edit media</Navbar.Brand>
        <CloseButton onClick={handleCloseBackgroundCropModal} />
      </Container>
    </Navbar>
  );
}
