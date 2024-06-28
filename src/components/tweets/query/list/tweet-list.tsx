import Tweet, { ITweet } from "../detail/tweet";
import NoTweet from "../../no-tweet";

export interface TweetListProps {
  tweets: ITweet[];
  setIsTweetDeleted: React.Dispatch<React.SetStateAction<boolean>>;
  setIsReplyDeleted: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function TweetList({
  tweets,
  setIsTweetDeleted,
  setIsReplyDeleted,
}: TweetListProps) {
  return tweets.length !== 0 ? (
    <div>
      {tweets.map((tweet) => {
        return (
          <Tweet
            key={tweet.id}
            {...tweet}
            setIsTweetDeleted={setIsTweetDeleted}
            setIsReplyDeleted={setIsReplyDeleted}
          />
        );
      })}
    </div>
  ) : (
    <NoTweet />
  );
}
