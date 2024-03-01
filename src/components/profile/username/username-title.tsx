import { User } from "firebase/auth";
import ChangeUsername from "./change-username/change-username";
import UsernameModifyButton from "./username-modify-button";

export interface UsernameTitleProps {
  user: User | null;
  showModifyModal: boolean;
  setShowModifyModal: React.Dispatch<React.SetStateAction<boolean>>;
  handleShowModifyModal: () => void;
}

export default function UsernameTitle({
  user,
  showModifyModal,
  setShowModifyModal,
  handleShowModifyModal,
}: UsernameTitleProps) {
  return (
    <div className="d-flex justify-content-center align-items-center mb-4">
      <h1 className="fs-2 me-2">{user?.displayName ?? "Anonymous"}</h1>
      <UsernameModifyButton handleShowModifyModal={handleShowModifyModal} />
      <ChangeUsername
        showModifyModal={showModifyModal}
        setShowModifyModal={setShowModifyModal}
      />
    </div>
  );
}
