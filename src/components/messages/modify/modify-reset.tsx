import { Button, ButtonGroup } from "react-bootstrap";

export interface ModifyResetProps {
  resetPhotoButton: () => void;
  resetMessageButton: () => void;
}

export default function ModifyReset({
  resetPhotoButton,
  resetMessageButton,
}: ModifyResetProps) {
  return (
    <ButtonGroup className="w-100">
      <Button onClick={resetMessageButton} type="button" variant="outline-info">
        Reset Message
      </Button>
      <Button onClick={resetPhotoButton} type="button" variant="outline-info">
        Reset Photo
      </Button>
    </ButtonGroup>
  );
}
