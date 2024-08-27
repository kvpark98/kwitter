import ScrollProfile from "../../scrolls/scrollProfile";
import Tweet, { ITweet } from "../../tweets/query/detail/tweet";

export interface UserTweetListProps {
  tweets: ITweet[];
  setIsTweetDeleted?: React.Dispatch<React.SetStateAction<boolean>>;
  setIsReplyDeleted?: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function UserTweetList({
  tweets,
  setIsTweetDeleted,
  setIsReplyDeleted,
}: UserTweetListProps) {
  return (
    <div className="pt-2">
      {tweets.map((tweet) => {
        return (
          <Tweet
            key={tweet.id}
            setIsTweetDeleted={setIsTweetDeleted}
            setIsReplyDeleted={setIsReplyDeleted}
            {...tweet}
          />
        );
      })}
      <ScrollProfile />
    </div>
  );
}
