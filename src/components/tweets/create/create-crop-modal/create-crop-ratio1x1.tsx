import { Button } from "react-bootstrap";

export interface CreateCropRatio1x1Props {
  createRatio1x1: boolean;
  handleCreateRatio1x1: () => void;
}

export default function CreateCropRatio1x1({
  createRatio1x1,
  handleCreateRatio1x1,
}: CreateCropRatio1x1Props) {
  return (
    <Button
      type="button"
      onClick={handleCreateRatio1x1}
      title="1:1"
      variant="outline-secondary"
      className={
        createRatio1x1
          ? "d-flex align-items-center border-0 rounded-pill me-3 active"
          : "d-flex align-items-center border-0 rounded-pill me-3"
      }
    >
      1:1
    </Button>
  );
}
