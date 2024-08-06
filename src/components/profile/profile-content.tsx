import ScrollProfile from "../scrolls/scrollProfile";
import { User } from "firebase/auth";
import { ITweet } from "../tweets/query/detail/tweet";
import ProfileHeader from "./profile-header";
import ProfileImages from "./profile-images";
import ProfileEditButton from "./profile-edit-button";
import ProfileNav from "./profile-nav";
import NoTweet from "../tweets/no-tweet";
import UserTweetList from "./user-tweet-list/user-tweet-list";

export interface ProfileContentProps {
  user: User | null;
  avatar: string | null | undefined;
  background: string;
  handleShowModifyProfileModal: () => void;
  isPostActive: boolean;
  postActive: () => void;
  tweets: ITweet[];
  back: () => void;
  sortCriteria: string;
  handleSortCriteria: (event: React.MouseEvent<HTMLButtonElement>) => void;
  sortOrder: boolean;
  handleSortOrder: () => void;
  resetCriteria: () => void;
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
  sortCriteria,
  handleSortCriteria,
  sortOrder,
  handleSortOrder,
  resetCriteria,
}: ProfileContentProps) {
  return (
    <div className="overflow-y-auto h-100 bg-light" style={{ width: "630px" }}>
      <ProfileHeader user={user} tweets={tweets} back={back} />
      <ProfileImages avatar={avatar} background={background} />
      <ProfileEditButton
        handleShowModifyProfileModal={handleShowModifyProfileModal}
      />
      <ProfileNav
        postActive={postActive}
        tweets={tweets}
        sortCriteria={sortCriteria}
        handleSortCriteria={handleSortCriteria}
        sortOrder={sortOrder}
        handleSortOrder={handleSortOrder}
        resetCriteria={resetCriteria}
      />
      {isPostActive && tweets.length !== 0 && <UserTweetList tweets={tweets} />}
      {tweets.length === 0 && <NoTweet />}
      <ScrollProfile />
    </div>
  );
}
