import { User } from "firebase/auth";
import ChangeUsername from "./change-username/change-username";
import { ITweet } from "../../tweets/query/detail/tweet";

export interface UsernameTitleProps {
  user: User | null;
  showModifyModal: boolean;
  setShowModifyModal: React.Dispatch<React.SetStateAction<boolean>>;
  handleShowModifyModal: () => void;
  tweets: ITweet[];
}

export default function UsernameTitle({
  user,
  showModifyModal,
  setShowModifyModal,
  handleShowModifyModal,
  tweets,
}: UsernameTitleProps) {
  return (
    <div className="w-100">
      <div className="d-flex justify-content-between align-items-center px-2">
        <h1
          className="btn btn-link text-decoration-none text-dark p-0 fs-5 fw-bold"
          onClick={handleShowModifyModal}
        >
          {user?.displayName ?? "Anonymous"}
        </h1>
        <span className="text-muted pe-2">
          {tweets.length} {tweets.length > 1 ? "Posts" : "Post"}
        </span>
      </div>
      <ChangeUsername
        showModifyModal={showModifyModal}
        setShowModifyModal={setShowModifyModal}
      />
    </div>
  );
}
