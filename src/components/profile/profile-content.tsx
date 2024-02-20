import ProfileErrors from "../alert/error/profile/profile-errors";
import { Wrapper } from "../styles/auth-components";
import ScrollProfile from "../scrolls/scrollProfile";
import { User } from "firebase/auth";
import ProfileForm from "./profile-form";
import { ITweet } from "../tweets/query/detail/tweet";
import ProfileUserTweets from "./profile-user-tweets";
import ProfileTitle from "./profile-title";

export interface ProfileContentProps {
  user: User | null;
  error: string;
  avatar: string | null | undefined;
  fileInputRef: React.RefObject<HTMLInputElement>;
  showModifyModal: boolean;
  handleShowModifyModal: () => void;
  handleCloseModifyModal: () => void;
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
  handleShowModifyModal,
  handleCloseModifyModal,
  handleAvatar,
  handleDeleteAvatar,
  tweets,
}: ProfileContentProps) {
  return (
    <Wrapper>
      <ProfileTitle
        user={user}
        showModifyModal={showModifyModal}
        handleShowModifyModal={handleShowModifyModal}
        handleCloseModifyModal={handleCloseModifyModal}
      />
      {error && <ProfileErrors error={error} />}
      <ProfileForm
        avatar={avatar}
        fileInputRef={fileInputRef}
        handleAvatar={handleAvatar}
        handleDeleteAvatar={handleDeleteAvatar}
      />
      {tweets.length !== 0 && <ProfileUserTweets tweets={tweets} />}
      <ScrollProfile />
    </Wrapper>
  );
}
