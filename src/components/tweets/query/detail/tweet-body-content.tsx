import { Card } from "react-bootstrap";
import TweetFooterDropdown from "./tweet-footer-dropdown";
import { User } from "firebase/auth";

export interface TweetBodyContentProps {
  user: User | null;
  message: string;
  photo?: string | undefined;
  userId: string;
  username: string;
  handleShowModifyTweetModal: () => void;
  handleShowDeleteModal: () => void;
  handleShowReplyModal: () => void;
}

export default function handleShowTweetModifyModalTweetBodyContent({
  user,
  message,
  photo,
  userId,
  username,
  handleShowModifyTweetModal,
  handleShowDeleteModal,
  handleShowReplyModal,
}: TweetBodyContentProps) {
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
          handleShowReplyModal={handleShowReplyModal}
        />
      </Card.Title>
      <Card.Text>{message}</Card.Text>
      {photo && (
        <Card.Img variant="top" src={photo} className="mt-3 rounded-4" />
      )}
    </div>
  );
}
