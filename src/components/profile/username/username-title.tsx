import { User } from "firebase/auth";
import { ITweet } from "../../tweets/query/detail/tweet";

export interface UsernameTitleProps {
  user: User | null;
  tweets: ITweet[];
}

export default function UsernameTitle({ user, tweets }: UsernameTitleProps) {
  return (
    <div className="d-flex justify-content-between align-items-center px-2 w-100">
      <h1 className="text-decoration-none text-dark p-0 fs-5 fw-bold">
        {user?.displayName ?? "Anonymous"}
      </h1>
      <span className="text-muted pe-2">
        {tweets.length} {tweets.length > 1 ? "Posts" : "Post"}
      </span>
    </div>
  );
}
