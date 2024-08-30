import { User } from "firebase/auth";
import { ITweet } from "./query/detail/tweet";

export interface TitleProps {
  user?: User | null;
  tweets?: ITweet[];
}

export default function Title({ user, tweets }: TitleProps) {
  return (
    <div className="w-100">
      <h1 className="text-decoration-none text-light p-0 fs-5 fw-bold">
        {!(
          window.location.href.includes("profile") ||
          window.location.href.includes("account")
        ) && `${tweets?.length} Tweets`}
        {window.location.href.includes("profile") && user?.displayName}
        {window.location.href.includes("account") && "Account"}
      </h1>
    </div>
  );
}
