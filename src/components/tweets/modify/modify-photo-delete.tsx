import { Button } from "react-bootstrap";

export interface ModifyPhotoDeleteProps {
  deletePhoto: () => Promise<void>;
}

export default function ModifyPhotoDelete({
  deletePhoto,
}: ModifyPhotoDeleteProps) {
  return (
    <Button
      type="button"
      variant="dark"
      className="d-flex align-items-center position-absolute rounded-circle top-0 end-0 p-2"
      title="Delete"
      onClick={deletePhoto}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        className="bi bi-x-lg"
        viewBox="0 0 16 16"
      >
        <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
      </svg>
    </Button>
  );
}
