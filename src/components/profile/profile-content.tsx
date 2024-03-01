import ProfileErrors from "../alert/error/profile/profile-errors";
import ScrollProfile from "../scrolls/scrollProfile";
import { User } from "firebase/auth";
import { ITweet } from "../tweets/query/detail/tweet";
import UsernameTitle from "./username/username-title";
import UserTweets from "./user-tweets/user-tweets";
import AvatarForm from "./avatar/avatar-form";

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
  return (
    <div className="pt-5">
      <UsernameTitle
        user={user}
        showModifyModal={showModifyModal}
        setShowModifyModal={setShowModifyModal}
        handleShowModifyModal={handleShowModifyModal}
      />
      {error && <ProfileErrors error={error} />}
      <AvatarForm
        avatar={avatar}
        fileInputRef={fileInputRef}
        handleAvatar={handleAvatar}
        handleDeleteAvatar={handleDeleteAvatar}
      />
      {tweets.length !== 0 && <UserTweets tweets={tweets} />}
      <ScrollProfile />
    </div>
  );
}
