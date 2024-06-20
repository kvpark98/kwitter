import { Card } from "react-bootstrap";
import { User } from "firebase/auth";
import ReplyDropdown from "./reply-dropdown";

export interface ReplyBodyContentProps {
  user: User | null;
  reply: string;
  replyUserId: string;
  replyUsername: string;
}

export default function ReplyBodyContent({
  user,
  reply,
  replyUserId,
  replyUsername,
}: ReplyBodyContentProps) {
  return (
    <div className="w-100">
      <Card.Title className="d-flex justify-content-between mb-3">
        <span className="fw-bold">
          {user?.uid === replyUserId ? user?.displayName! : replyUsername}
        </span>
        <ReplyDropdown user={user} replyUserId={replyUserId} />
      </Card.Title>
      <Card.Text>{reply}</Card.Text>
    </div>
  );
}
