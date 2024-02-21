import Tweet, { ITweet } from "../../tweets/query/detail/tweet";

export interface UserTweetsProps {
  tweets: ITweet[];
}

export default function UserTweets({ tweets }: UserTweetsProps) {
  return (
    <div className="w-100 overflow-y-scroll" style={{ maxHeight: "600px" }}>
      {tweets.map((tweet) => {
        return <Tweet key={tweet.id} {...tweet} />;
      })}
    </div>
  );
}
