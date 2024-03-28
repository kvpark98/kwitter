import { Button, Container, Navbar } from "react-bootstrap";

export interface ModifyCropPhotoFooterProps {
  handleSaveCroppedPhoto: () => void;
}

export default function ModifyCropPhotoFooter({
  handleSaveCroppedPhoto,
}: ModifyCropPhotoFooterProps) {
  return (
    <Navbar className="flex-fill rounded-bottom bg-body-light">
      <Container className="d-flex justify-content-end h-100">
        <Button
          type="button"
          variant="primary"
          className="rounded-pill"
          onClick={handleSaveCroppedPhoto}
        >
          Apply
        </Button>
      </Container>
    </Navbar>
  );
}
