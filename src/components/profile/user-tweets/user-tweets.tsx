import Tweet, { ITweet } from "../../tweets/query/detail/tweet";

export interface UserTweetsProps {
  tweets: ITweet[];
}

export default function UserTweets({ tweets }: UserTweetsProps) {
  return (
    <div>
      {tweets.map((tweet) => {
        return <Tweet key={tweet.id} {...tweet} />;
      })}
    </div>
  );
}
