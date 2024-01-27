import { Button, ButtonGroup } from "react-bootstrap";

export interface CreateResetProps {
  resetPhotoButton: () => void;
  resetMessageButton: () => void;
}

export default function CreateReset({
  resetPhotoButton,
  resetMessageButton,
}: CreateResetProps) {
  return (
    <ButtonGroup className="w-100 mb-4">
      <Button onClick={resetMessageButton} type="button" variant="outline-info">
        Reset Message
      </Button>
      <Button onClick={resetPhotoButton} type="button" variant="outline-info">
        Reset Photo
      </Button>
    </ButtonGroup>
  );
}
