import { Button } from "react-bootstrap";

export interface ModifyPhotoDeleteProps {
  handleDeletePhoto: () => Promise<void>;
}

export default function ModifyPhotoDelete({
  handleDeletePhoto,
}: ModifyPhotoDeleteProps) {
  return (
    <Button
      type="button"
      variant="danger"
      className="d-flex align-items-center position-absolute rounded-circle top-0 end-0 p-2"
      title="Delete"
      onClick={handleDeletePhoto}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="22.4"
        height="22.4"
        fill="currentColor"
        className="bi bi-trash-fill"
        viewBox="0 0 16 16"
      >
        <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0" />
      </svg>
    </Button>
  );
}
