import Tweet, { ITweet } from "../../tweets/query/detail/tweet";

export interface UserTweetsProps {
  tweets: ITweet[];
}

export default function UserTweets({ tweets }: UserTweetsProps) {
  return (
    <div className="pt-5">
      {tweets.map((tweet) => {
        return <Tweet key={tweet.id} {...tweet} />;
      })}
    </div>
  );
}
