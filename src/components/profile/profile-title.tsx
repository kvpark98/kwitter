import { User } from "firebase/auth";
import { ITweet } from "../tweets/query/detail/tweet";

export interface ProfileTitleProps {
  user: User | null;
  tweets: ITweet[];
}

export default function ProfileTitle({ user, tweets }: ProfileTitleProps) {
  return (
    <div className="d-flex justify-content-between align-items-center px-2 w-100">
      <h1 className="text-decoration-none text-light p-0 fs-5 fw-bold">
        {user?.displayName ?? "Anonymous"}
      </h1>
      <span className="text-light pe-2">
        {tweets.length} {tweets.length > 1 ? "Tweets" : "Tweet"}
      </span>
    </div>
  );
}
