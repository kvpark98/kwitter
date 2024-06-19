import { Card } from "react-bootstrap";
import { User } from "firebase/auth";
import TweetFooterDropdown from "../../../tweet-footer-dropdown";

export interface ReplyBodyContentProps {
  user: User | null;
  message: string;
  userId: string;
  username: string;
  handleShowModifyTweetModal: () => void;
  handleShowDeleteModal: () => void;
  handleShowCreateReplyModal: () => void;
}

export default function ReplyBodyContent({
  user,
  message,
  userId,
  username,
  handleShowModifyTweetModal,
  handleShowDeleteModal,
  handleShowCreateReplyModal,
}: ReplyBodyContentProps) {
  return (
    <div className="w-100">
      <Card.Title className="d-flex justify-content-between mb-3">
        <span className="fw-bold">
          {user?.uid === userId ? user?.displayName! : username}
        </span>
        <TweetFooterDropdown
          user={user}
          userId={userId}
          handleShowModifyTweetModal={handleShowModifyTweetModal}
          handleShowDeleteModal={handleShowDeleteModal}
          handleShowCreateReplyModal={handleShowCreateReplyModal}
        />
      </Card.Title>
      <Card.Text>{message}</Card.Text>
    </div>
  );
}
