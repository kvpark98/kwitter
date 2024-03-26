import { Button, Container, Navbar } from "react-bootstrap";

export interface CropBackgroundFooterProps {
  handleSaveCroppedBackground: () => void;
}

export default function CropBackgroundFooter({
  handleSaveCroppedBackground,
}: CropBackgroundFooterProps) {
  return (
    <Navbar className="flex-fill rounded-bottom bg-body-light">
      <Container className="d-flex justify-content-end h-100">
        <Button
          type="button"
          variant="primary"
          className="rounded-pill"
          onClick={handleSaveCroppedBackground}
        >
          Apply
        </Button>
      </Container>
    </Navbar>
  );
}
