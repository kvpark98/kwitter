import { Button } from "react-bootstrap";

export interface ModifyProfileAvatarRemoveProps {
  resetAvatar: () => void;
}

export default function ModifyProfileAvatarRemove({
  resetAvatar,
}: ModifyProfileAvatarRemoveProps) {
  return (
    <Button
      type="button"
      title="Remove Avatar"
      variant="secondary"
      className="d-flex align-items-center position-absolute top-0 end-0 rounded-circle p-2"
      onClick={resetAvatar}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="22.4"
        height="22.4"
        fill="currentColor"
        className="bi bi-x-lg"
        viewBox="0 0 16 16"
      >
        <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
      </svg>
    </Button>
  );
}
