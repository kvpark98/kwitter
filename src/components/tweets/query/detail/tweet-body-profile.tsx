import { Link } from "react-router-dom";
import { User } from "firebase/auth";

export interface TweetBodyProfileProps {
  user: User | null;
  tweetAvatar: string;
  tweetUserId: string;
  tweetUsername: string;
}

export default function TweetBodyProfile({
  user,
  tweetAvatar,
  tweetUserId,
  tweetUsername,
}: TweetBodyProfileProps) {
  return (
    <div className="me-2">
      {user?.uid === tweetUserId ? (
        <Link
          to="/profile"
          title={user?.uid === tweetUserId ? user?.displayName! : tweetUsername}
        >
          <img
            src={user?.photoURL! ?? "/person-circle.svg"}
            width="40"
            height="40"
            className="rounded-circle bg-light"
          />
        </Link>
      ) : (
        <img
          src={tweetAvatar}
          width="40"
          height="40"
          className="rounded-circle bg-light"
        />
      )}
    </div>
  );
}
