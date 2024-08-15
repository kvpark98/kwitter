import ScrollProfile from "../scrolls/scrollProfile";
import { User } from "firebase/auth";
import { ITweet } from "../tweets/query/detail/tweet";
import ProfileHeader from "./profile-header";
import ProfileImages from "./profile-images";
import ProfileEditButton from "./profile-edit-button";
import ProfileNav from "./profile-nav";
import NoTweet from "../tweets/no-tweet";
import UserTweetList from "./user-tweet-list/user-tweet-list";
import { IReply } from "../tweets/query/detail/reply/query/detail/reply";
import NoReply from "../tweets/no-reply";
import UserReplyList from "./user-reply-list/user-reply-list";

export interface ProfileContentProps {
  user: User | null;
  avatar: string | null | undefined;
  background: string;
  handleShowModifyProfileModal: () => void;
  isTweetActive: boolean;
  handleTweetActive: () => void;
  handleReplyActive: () => void;
  tweets: ITweet[];
  replys: IReply[];
  back: () => void;
  sortCriteria: string;
  handleSortCriteria: (event: React.MouseEvent<HTMLButtonElement>) => void;
  sortOrder: boolean;
  handleSortOrder: () => void;
  resetCriteria: () => void;
  showReplyListModal?: boolean;
  handleShowReplyListModal?: () => void;
  handleCloseReplyListModal?: () => void;
  showReplyTweetModal?: boolean;
  handleShowReplyTweetModal?: () => void;
  handleCloseReplyTweetModal?: () => void;
}

export default function ProfileContent({
  user,
  avatar,
  background,
  handleShowModifyProfileModal,
  isTweetActive,
  handleTweetActive,
  handleReplyActive,
  tweets,
  replys,
  back,
  sortCriteria,
  handleSortCriteria,
  sortOrder,
  handleSortOrder,
  resetCriteria,
  showReplyListModal,
  handleShowReplyListModal,
  handleCloseReplyListModal,
  showReplyTweetModal,
  handleShowReplyTweetModal,
  handleCloseReplyTweetModal,
}: ProfileContentProps) {
  return (
    <div className="overflow-y-auto h-100 bg-light" style={{ width: "630px" }}>
      <ProfileHeader user={user} tweets={tweets} back={back} />
      <ProfileImages avatar={avatar} background={background} />
      <ProfileEditButton
        handleShowModifyProfileModal={handleShowModifyProfileModal}
      />
      <ProfileNav
        isTweetActive={isTweetActive}
        handleTweetActive={handleTweetActive}
        handleReplyActive={handleReplyActive}
        tweets={tweets}
        replys={replys}
        sortCriteria={sortCriteria}
        handleSortCriteria={handleSortCriteria}
        sortOrder={sortOrder}
        handleSortOrder={handleSortOrder}
        resetCriteria={resetCriteria}
      />
      {isTweetActive && tweets.length !== 0 && (
        <UserTweetList
          tweets={tweets}
          showReplyListModal={showReplyListModal}
          handleShowReplyListModal={handleShowReplyListModal}
          handleCloseReplyListModal={handleCloseReplyListModal}
        />
      )}
      {!isTweetActive && replys.length !== 0 && (
        <UserReplyList
          user={user}
          replys={replys}
          isTweetActive={isTweetActive}
          showReplyListModal={showReplyListModal}
          handleShowReplyListModal={handleShowReplyListModal}
          handleCloseReplyListModal={handleCloseReplyListModal}
          showReplyTweetModal={showReplyTweetModal}
          handleShowReplyTweetModal={handleShowReplyTweetModal}
          handleCloseReplyTweetModal={handleCloseReplyTweetModal}
        />
      )}
      {isTweetActive && tweets.length === 0 && <NoTweet />}
      {!isTweetActive && replys.length === 0 && <NoReply />}
      <ScrollProfile />
    </div>
  );
}
