import { Button } from "react-bootstrap";

export interface CreateCropApplyProps {
  handleSaveCroppedPhoto: () => void;
}

export default function CreateCropApply({
  handleSaveCroppedPhoto,
}: CreateCropApplyProps) {
  return (
    <Button
      type="button"
      variant="primary"
      className="rounded-pill"
      onClick={handleSaveCroppedPhoto}
    >
      Apply
    </Button>
  );
}
