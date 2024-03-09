import ProfileErrors from "../alert/error/profile/profile-errors";
import ScrollProfile from "../scrolls/scrollProfile";
import { User } from "firebase/auth";
import { ITweet } from "../tweets/query/detail/tweet";
import UserTweets from "./user-tweets/user-tweets";
import AvatarForm from "./avatar/avatar-form";
import { useNavigate } from "react-router-dom";
import ProfileHeader from "./profile-header";
import { Button } from "react-bootstrap";
import ModifyProfile from "./username/modify/modify-profile";

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
    <div>
      <ProfileHeader user={user} tweets={tweets} back={back} />
      <div className="position-relative mb-4">
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
      {tweets.length !== 0 && <UserTweets tweets={tweets} />}
      <ScrollProfile />
      <ModifyProfile
        showModifyModal={showModifyModal}
        setShowModifyModal={setShowModifyModal}
      />
    </div>
  );
}
