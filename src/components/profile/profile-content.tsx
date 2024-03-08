import ProfileErrors from "../alert/error/profile/profile-errors";
import ScrollProfile from "../scrolls/scrollProfile";
import { User } from "firebase/auth";
import { ITweet } from "../tweets/query/detail/tweet";
import UsernameTitle from "./username/username-title";
import UserTweets from "./user-tweets/user-tweets";
import AvatarForm from "./avatar/avatar-form";
import { Button, Navbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export interface ProfileContentProps {
  user: User | null;
  error: string;
  avatar: string | null | undefined;
  fileInputRef: React.RefObject<HTMLInputElement>;
  showModifyModal: boolean;
  setShowModifyModal: React.Dispatch<React.SetStateAction<boolean>>;
  handleShowModifyModal: () => void;
  handleAvatar: (event: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
  handleDeleteAvatar: () => Promise<void>;
  tweets: ITweet[];
}

export default function ProfileContent({
  user,
  error,
  avatar,
  fileInputRef,
  showModifyModal,
  setShowModifyModal,
  handleShowModifyModal,
  handleAvatar,
  handleDeleteAvatar,
  tweets,
}: ProfileContentProps) {
  const navigate = useNavigate();

  const back = () => {
    navigate(-1);
  };
  return (
    <div className="position-relative">
      <Navbar bg="light" className="d-flex align-items-center">
        <Button
          type="button"
          onClick={back}
          title="Back"
          variant="outline-secondary"
          className="d-flex align-items-center border-0 rounded-circle p-2 mx-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-arrow-left"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"
            />
          </svg>
        </Button>
        <UsernameTitle
          user={user}
          showModifyModal={showModifyModal}
          setShowModifyModal={setShowModifyModal}
          handleShowModifyModal={handleShowModifyModal}
          tweets={tweets}
        />
      </Navbar>
      <div className="position-relative mb-5">
        <img
          src="/JEJU1.jpeg"
          alt="Background Image"
          className="img-fluid"
          style={{ width: "600px", height: "200px" }}
        />
        {error && <ProfileErrors error={error} />}
        <AvatarForm
          fileInputRef={fileInputRef}
          avatar={avatar}
          handleAvatar={handleAvatar}
          handleDeleteAvatar={handleDeleteAvatar}
        />
      </div>
      {tweets.length !== 0 && <UserTweets tweets={tweets} />}
      <ScrollProfile />
    </div>
  );
}
