import { Link } from "react-router-dom";
import { User } from "firebase/auth";

export interface TweetBodyProfileProps {
  user: User | null;
  avatar: string;
  userId: string;
  username: string;
}

export default function TweetBodyProfile({
  user,
  avatar,
  userId,
  username,
}: TweetBodyProfileProps) {
  return (
    <div className="me-2">
      {user?.uid === userId ? (
        <Link
          to="/profile"
          title={user?.uid === userId ? user?.displayName! : username}
        >
          <img
            src={user?.photoURL!}
            width="40"
            height="40"
            className="rounded-circle bg-light"
          />
        </Link>
      ) : (
        <img
          src={avatar}
          width="40"
          height="40"
          className="rounded-circle bg-light"
        />
      )}
    </div>
  );
}
