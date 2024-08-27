import { ITweet } from "../detail/tweet";

export interface TweetListTitleProps {
  tweets: ITweet[];
}

export default function TweetListTitle({ tweets }: TweetListTitleProps) {
  return (
    <div className="w-100">
      <h1 className="text-decoration-none text-light p-0 fs-5 fw-bold">
        {tweets.length} Tweets
      </h1>
    </div>
  );
}
