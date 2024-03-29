import { Button } from "react-bootstrap";

export interface CreateCropRatio16x9Props {
  createRatio16x9: boolean;
  handleCreateRatio16x9: () => void;
}

export default function CreateCropRatio16x9({
  createRatio16x9,
  handleCreateRatio16x9,
}: CreateCropRatio16x9Props) {
  return (
    <Button
      type="button"
      onClick={handleCreateRatio16x9}
      title="16:9"
      variant="outline-secondary"
      className={
        createRatio16x9
          ? "d-flex align-items-center border-0 rounded-pill active"
          : "d-flex align-items-center border-0 rounded-pill"
      }
    >
      16:9
    </Button>
  );
}
