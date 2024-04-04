import { Button } from "react-bootstrap";

export interface ModifyCropApplyProps {
  handleSaveCroppedPhoto: () => void;
}

export default function ModifyCropApply({
  handleSaveCroppedPhoto,
}: ModifyCropApplyProps) {
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
