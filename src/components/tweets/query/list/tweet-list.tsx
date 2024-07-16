import Tweet, { ITweet } from "../detail/tweet";
import NoTweet from "../../no-tweet";

export interface TweetListProps {
  tweets: ITweet[];
  setLikes: React.Dispatch<React.SetStateAction<number>>;
  setIsTweetDeleted: React.Dispatch<React.SetStateAction<boolean>>;
  setIsReplyDeleted: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function TweetList({
  tweets,
  setLikes,
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
            setLikes={setLikes}
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
