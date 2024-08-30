import { Card } from "react-bootstrap";
import { User } from "firebase/auth";
import ReplyDropdown from "./reply-dropdown";

export interface ReplyBodyContentProps {
  user?: User | null;
  timeAgo: string | undefined;
  reply: string;
  replyUserId: string;
  replyUsername: string;
  showReplyTweetModal?: boolean;
  handleShowModifyReplyModal: () => void;
  handleShowDeleteReplyModal: () => void;
}

export default function ReplyBodyContent({
  user,
  timeAgo,
  reply,
  replyUserId,
  replyUsername,
  showReplyTweetModal,
  handleShowModifyReplyModal,
  handleShowDeleteReplyModal,
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
        {user?.uid === replyUserId && !showReplyTweetModal && (
          <ReplyDropdown
            handleShowModifyReplyModal={handleShowModifyReplyModal}
            handleShowDeleteReplyModal={handleShowDeleteReplyModal}
          />
        )}
      </Card.Title>
      <Card.Text>{reply}</Card.Text>
    </div>
  );
}
