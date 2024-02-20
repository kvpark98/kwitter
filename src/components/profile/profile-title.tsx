import { User } from "firebase/auth";
import { Button } from "react-bootstrap";
import ChangeUsername from "./change-username/change-username";

export interface ProfileTitleProps {
  user: User | null;
  showModifyModal: boolean;
  handleShowModifyModal: () => void;
  handleCloseModifyModal: () => void;
}

export default function ProfileTitle({
  user,
  showModifyModal,
  handleShowModifyModal,
  handleCloseModifyModal,
}: ProfileTitleProps) {
  return (
    <div className="d-flex align-items-center mb-4">
      <h1 className="fs-2 me-2">{user?.displayName ?? "Anonymous"}</h1>
      <Button
        type="button"
        variant="success"
        className="d-flex align-items-center rounded-circle p-2"
        style={{ height: "33.6px" }}
        title="Modify Username"
        onClick={handleShowModifyModal}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-pencil-fill"
          viewBox="0 0 16 16"
        >
          <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z" />
        </svg>
      </Button>
      <ChangeUsername
        showModifyModal={showModifyModal}
        handleCloseModifyModal={handleCloseModifyModal}
      />
    </div>
  );
}
