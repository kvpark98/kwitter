import { ITweet } from "./query/detail/tweet";

export interface TweetTitleProps {
  tweets: ITweet[];
}

export default function TweetTitle({ tweets }: TweetTitleProps) {
  return (
    <div className="px-2 w-100">
      <h1 className="text-decoration-none text-light p-0 fs-5 fw-bold">
        Tweets ({tweets.length})
      </h1>
    </div>
  );
}
