import { SetStateAction } from "react";
import Tweet, { ITweet } from "../../tweets/query/detail/tweet";

export interface UserTweetsProps {
  tweets: ITweet[];
}

export default function UserTweets({ tweets }: UserTweetsProps) {
  return (
    <div className="pt-5">
      {tweets.map((tweet) => {
        return (
          <Tweet
            setIsTweetDeleted={function (value: SetStateAction<boolean>): void {
              throw new Error("Function not implemented.");
            }}
            setIsReplyDeleted={function (value: SetStateAction<boolean>): void {
              throw new Error("Function not implemented.");
            }}
            key={tweet.id}
            {...tweet}
          />
        );
      })}
    </div>
  );
}
