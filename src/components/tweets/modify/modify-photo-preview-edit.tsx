import { Button } from "react-bootstrap";

export interface ModifyPhotoPreviewEditProps {
  handleShowModifyPhotoCropModal: () => void;
}

export default function ModifyPhotoPreviewEdit({
  handleShowModifyPhotoCropModal,
}: ModifyPhotoPreviewEditProps) {
  return (
    <Button
      type="button"
      variant="dark"
      className="d-flex align-items-center position-absolute rounded-pill top-0 start-0 px-3"
      title="Edit"
      onClick={handleShowModifyPhotoCropModal}
    >
      Edit
    </Button>
  );
}
