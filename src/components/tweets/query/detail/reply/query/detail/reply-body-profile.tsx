import { Link } from "react-router-dom";
import { User } from "firebase/auth";

export interface ReplyBodyProfileProps {
  user: User | null;
  replyAvatar: string;
  replyUserId: string;
  replyUsername: string;
}

export default function ReplyBodyProfile({
  user,
  replyAvatar,
  replyUserId,
  replyUsername,
}: ReplyBodyProfileProps) {
  return (
    <div className="me-2">
      {user?.uid === replyUserId ? (
        <Link
          to="/profile"
          title={user?.uid === replyUserId ? user?.displayName! : replyUsername}
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
          src={replyAvatar}
          width="40"
          height="40"
          className="rounded-circle bg-light"
        />
      )}
    </div>
  );
}
