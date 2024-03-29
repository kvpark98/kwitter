import { Button } from "react-bootstrap";

export interface CreateCropRatio4x3Props {
  createRatio4x3: boolean;
  handleCreateRatio4x3: () => void;
}

export default function CreateCropRatio4x3({
  createRatio4x3,
  handleCreateRatio4x3,
}: CreateCropRatio4x3Props) {
  return (
    <Button
      type="button"
      onClick={handleCreateRatio4x3}
      title="4:3"
      variant="outline-secondary"
      className={
        createRatio4x3
          ? "d-flex align-items-center border-0 rounded-pill me-3 active"
          : "d-flex align-items-center border-0 rounded-pill me-3"
      }
    >
      4:3
    </Button>
  );
}
