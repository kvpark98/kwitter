import { Button, Container, Navbar } from "react-bootstrap";

export interface CropAvatarFooterProps {
  handleSaveCroppedAvatar: () => void;
}

export default function CropAvatarFooter({
  handleSaveCroppedAvatar,
}: CropAvatarFooterProps) {
  return (
    <Navbar className="flex-fill rounded-bottom bg-body-light">
      <Container className="d-flex justify-content-end h-100">
        <Button
          type="button"
          variant="primary"
          className="rounded-pill"
          onClick={handleSaveCroppedAvatar}
        >
          Apply
        </Button>
      </Container>
    </Navbar>
  );
}
