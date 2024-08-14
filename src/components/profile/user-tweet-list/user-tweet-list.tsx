import { SetStateAction } from "react";
import Tweet, { ITweet } from "../../tweets/query/detail/tweet";

export interface UserTweetListProps {
  tweets: ITweet[];
  showReplyListModal?: boolean;
  handleShowReplyListModal?: () => void;
  handleCloseReplyListModal?: () => void;
}

export default function UserTweetList({
  tweets,
  showReplyListModal,
  handleShowReplyListModal,
  handleCloseReplyListModal,
}: UserTweetListProps) {
  return (
    <div className="pt-2">
      {tweets.map((tweet) => {
        return (
          <Tweet
            key={tweet.id}
            {...tweet}
            setIsTweetDeleted={function (value: SetStateAction<boolean>): void {
              throw new Error("Function not implemented.");
            }}
            setIsReplyDeleted={function (value: SetStateAction<boolean>): void {
              throw new Error("Function not implemented.");
            }}
            showReplyListModal={showReplyListModal}
            handleShowReplyListModal={handleShowReplyListModal}
            handleCloseReplyListModal={handleCloseReplyListModal}
          />
        );
      })}
    </div>
  );
}
