import { Card } from "react-bootstrap";
import { User } from "firebase/auth";
import ReplyDropdown from "./reply-dropdown";

export interface ReplyBodyContentProps {
  user: User | null;
  timeAgo: string | undefined;
  reply: string;
  replyUserId: string;
  replyUsername: string;
  handleShowReplyDeleteModal: () => void;
}

export default function ReplyBodyContent({
  user,
  timeAgo,
  reply,
  replyUserId,
  replyUsername,
  handleShowReplyDeleteModal,
}: ReplyBodyContentProps) {
  return (
    <div className="w-100">
      <Card.Title className="d-flex justify-content-between mb-4">
        <div>
          <p className="fw-bold">
            {user?.uid === replyUserId ? user?.displayName! : replyUsername}
          </p>
          <span className="fs-6 text-muted">{timeAgo}</span>
        </div>
        <ReplyDropdown
          user={user}
          replyUserId={replyUserId}
          handleShowReplyDeleteModal={handleShowReplyDeleteModal}
        />
      </Card.Title>
      <Card.Text>{reply}</Card.Text>
    </div>
  );
}
