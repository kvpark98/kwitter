import { Button } from "react-bootstrap";

export interface ProfileEditButtonProps {
  handleShowModifyModal: () => void;
}

export default function ProfileEditButton({
  handleShowModifyModal,
}: ProfileEditButtonProps) {
  return (
    <div className="d-flex justify-content-end">
      <Button
        type="button"
        variant="dark"
        className="rounded-pill"
        onClick={handleShowModifyModal}
      >
        Edit Profile
      </Button>
    </div>
  );
}
