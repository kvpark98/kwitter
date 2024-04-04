import { Button } from "react-bootstrap";

export interface ModifyCropRatio1x1Props {
  modifyRatio1x1: boolean;
  handleModifyRatio1x1: () => void;
}

export default function ModifyCropRatio1x1({
  modifyRatio1x1,
  handleModifyRatio1x1,
}: ModifyCropRatio1x1Props) {
  return (
    <Button
      type="button"
      onClick={handleModifyRatio1x1}
      title="1:1"
      variant="outline-secondary"
      className={
        modifyRatio1x1
          ? "d-flex align-items-center border-0 rounded-pill me-3 active"
          : "d-flex align-items-center border-0 rounded-pill me-3"
      }
    >
      1:1
    </Button>
  );
}
