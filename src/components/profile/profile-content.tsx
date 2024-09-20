import { User } from "firebase/auth";
import { ITweet } from "../tweets/query/detail/tweet";
import ProfileImages from "./profile-images";
import ProfileEditButton from "./profile-edit-button";
import ProfileNav from "./profile-nav";
import NoTweet from "../tweets/no-tweet";
import UserTweetList from "./user-tweet-list/user-tweet-list";
import { IReply } from "../tweets/query/detail/reply/query/detail/reply";
import NoReply from "../tweets/no-reply";
import UserReplyList from "./user-reply-list/user-reply-list";
import ScrollProfile from "../scrolls/scrollProfile";
import { useRef } from "react";
import ProfileSort from "./profile-sort";
import Header from "../header/header";

export interface ProfileContentProps {
  user?: User | null;
  avatar: string | null | undefined;
  background: string;
  handleShowModifyProfileModal: () => void;
  isTweetActive: boolean;
  handleTweetActive: () => void;
  handleReplyActive: () => void;
  tweets: ITweet[];
  replys: IReply[];
  sortOrder: boolean;
  handleSortOrder: () => void;
  setIsTweetDeleted?: React.Dispatch<React.SetStateAction<boolean>>;
  setIsReplyDeleted?: React.Dispatch<React.SetStateAction<boolean>>;
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
  sortOrder,
  handleSortOrder,
  setIsTweetDeleted,
  setIsReplyDeleted,
}: ProfileContentProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={scrollContainerRef}
      className="overflow-y-auto h-100 bg-light"
      style={{ width: "700px" }}
    >
      <Header user={user} />
      <ProfileImages avatar={avatar} background={background} />
      <ProfileEditButton
        handleShowModifyProfileModal={handleShowModifyProfileModal}
      />
      <ProfileNav
        handleTweetActive={handleTweetActive}
        handleReplyActive={handleReplyActive}
        tweets={tweets}
        replys={replys}
      />
      <ProfileSort
        isTweetActive={isTweetActive}
        tweets={tweets}
        replys={replys}
        sortOrder={sortOrder}
        handleSortOrder={handleSortOrder}
      />
      {isTweetActive && tweets.length !== 0 && (
        <UserTweetList
          tweets={tweets}
          setIsTweetDeleted={setIsTweetDeleted}
          setIsReplyDeleted={setIsReplyDeleted}
        />
      )}
      {!isTweetActive && replys.length !== 0 && (
        <UserReplyList
          user={user}
          replys={replys}
          isTweetActive={isTweetActive}
          setIsReplyDeleted={setIsReplyDeleted}
        />
      )}
      {isTweetActive && tweets.length === 0 && <NoTweet />}
      {!isTweetActive && replys.length === 0 && <NoReply />}
      <ScrollProfile scrollContainerRef={scrollContainerRef} />
    </div>
  );
}
