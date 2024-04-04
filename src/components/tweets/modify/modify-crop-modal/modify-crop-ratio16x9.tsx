import { Button } from "react-bootstrap";

export interface ModifyCropRatio16x9Props {
  modifyRatio16x9: boolean;
  handleModifyRatio16x9: () => void;
}

export default function ModifyCropRatio16x9({
  modifyRatio16x9,
  handleModifyRatio16x9,
}: ModifyCropRatio16x9Props) {
  return (
    <Button
      type="button"
      onClick={handleModifyRatio16x9}
      title="16:9"
      variant="outline-secondary"
      className={
        modifyRatio16x9
          ? "d-flex align-items-center border-0 rounded-pill active"
          : "d-flex align-items-center border-0 rounded-pill"
      }
    >
      16:9
    </Button>
  );
}
