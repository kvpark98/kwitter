import { ITweet } from "./query/detail/tweet";

export interface TweetTitleProps {
  tweets: ITweet[];
}

export default function TweetTitle({ tweets }: TweetTitleProps) {
  return (
    <div className="d-flex justify-content-between align-items-center px-2 w-100">
      <h1 className="text-decoration-none text-light p-0 fs-5 fw-bold">
        Tweets
      </h1>
      <span className="text-light pe-2">
        {tweets.length} {tweets.length > 1 ? "Posts" : "Post"}
      </span>
    </div>
  );
}
