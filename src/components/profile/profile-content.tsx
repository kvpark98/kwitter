import ScrollProfile from "../scrolls/scrollProfile";
import { User } from "firebase/auth";
import { ITweet } from "../tweets/query/detail/tweet";
import UserTweets from "./user-tweets/user-tweets";
import ProfileHeader from "./profile-header";
import ProfileImages from "./profile-images";
import ProfileEditButton from "./profile-edit-button";
import ProfileNav from "./profile-nav";
import NoTweet from "../tweets/no-tweet";

export interface ProfileContentProps {
  user: User | null;
  avatar: string | null | undefined;

  background: string;
  handleShowModifyProfileModal: () => void;
  isPostActive: boolean;
  postActive: () => void;
  tweets: ITweet[];
  back: () => void;
}

export default function ProfileContent({
  user,
  avatar,
  background,
  handleShowModifyProfileModal,
  isPostActive,
  postActive,
  tweets,
  back,
}: ProfileContentProps) {
  return (
    <div
      className="overflow-y-auto h-100 bg-light border-end"
      style={{ width: "600px", maxHeight: "800px" }}
    >
      <ProfileHeader user={user} tweets={tweets} back={back} />
      <ProfileImages avatar={avatar} background={background} />
      <ProfileEditButton
        handleShowModifyProfileModal={handleShowModifyProfileModal}
      />
      <ProfileNav postActive={postActive} />
      {isPostActive && tweets.length !== 0 && <UserTweets tweets={tweets} />}
      {tweets.length === 0 && <NoTweet />}
      <ScrollProfile />
    </div>
  );
}
