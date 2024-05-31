import { Button } from "react-bootstrap";

export interface ProfileEditButtonProps {
  handleShowModifyProfileModal: () => void;
}

export default function ProfileEditButton({
  handleShowModifyProfileModal,
}: ProfileEditButtonProps) {
  return (
    <div className="d-flex justify-content-end me-2">
      <Button
        type="button"
        variant="dark"
        className="rounded-pill"
        onClick={handleShowModifyProfileModal}
      >
        Edit profile
      </Button>
    </div>
  );
}
