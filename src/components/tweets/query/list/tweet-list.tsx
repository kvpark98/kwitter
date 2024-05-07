import Tweet, { ITweet } from "../detail/tweet";
import NoTweet from "../../no-tweet";

export interface TweetListProps {
  tweets: ITweet[];
}

export default function TweetList({ tweets }: TweetListProps) {
  return tweets.length !== 0 ? (
    <div>
      {tweets.map((tweet) => {
        return <Tweet key={tweet.id} {...tweet} />;
      })}
    </div>
  ) : (
    <NoTweet />
  );
}
