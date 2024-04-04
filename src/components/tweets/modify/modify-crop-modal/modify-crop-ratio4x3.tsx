import { Button } from "react-bootstrap";

export interface ModifyCropRatio4x3Props {
  modifyRatio4x3: boolean;
  handleModifyRatio4x3: () => void;
}

export default function ModifyCropRatio4x3({
  modifyRatio4x3,
  handleModifyRatio4x3,
}: ModifyCropRatio4x3Props) {
  return (
    <Button
      type="button"
      onClick={handleModifyRatio4x3}
      title="4:3"
      variant="outline-secondary"
      className={
        modifyRatio4x3
          ? "d-flex align-items-center border-0 rounded-pill me-3 active"
          : "d-flex align-items-center border-0 rounded-pill me-3"
      }
    >
      4:3
    </Button>
  );
}
