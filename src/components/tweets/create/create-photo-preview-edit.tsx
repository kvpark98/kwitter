import { Button } from "react-bootstrap";

export interface CreatePhotoPreviewEditProps {
  handleShowPhotoCropModal: () => void;
}

export default function CreatePhotoPreviewEdit({
  handleShowPhotoCropModal,
}: CreatePhotoPreviewEditProps) {
  return (
    <Button
      type="button"
      variant="dark"
      className="d-flex align-items-center position-absolute rounded-pill top-0 start-0 px-3"
      title="Edit"
      onClick={handleShowPhotoCropModal}
    >
      Edit
    </Button>
  );
}
