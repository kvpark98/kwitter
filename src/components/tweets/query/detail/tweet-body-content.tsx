import { Card } from "react-bootstrap";
import TweetFooterDropdown from "./tweet-footer-dropdown";
import { User } from "firebase/auth";

export interface TweetBodyContentProps {
  user: User | null;
  message: string;
  photo?: string | undefined;
  userId: string;
  username: string;
  handleShowTweetModifyModal: () => void;
  handleShowDeleteModal: () => void;
}

export default function handleShowTweetModifyModalTweetBodyContent({
  user,
  message,
  photo,
  userId,
  username,
  handleShowTweetModifyModal,
  handleShowDeleteModal,
}: TweetBodyContentProps) {
  return (
    <div className="w-100">
      <Card.Title className="d-flex justify-content-between mb-3">
        <span className="fw-bold">
          {user?.uid === userId ? user?.displayName! : username}
        </span>
        {user?.uid === userId && (
          <TweetFooterDropdown
            handleShowTweetModifyModal={handleShowTweetModifyModal}
            handleShowDeleteModal={handleShowDeleteModal}
          />
        )}
      </Card.Title>
      <Card.Text>{message}</Card.Text>
      {photo && (
        <Card.Img variant="top" src={photo} className="mt-3 rounded-4" />
      )}
    </div>
  );
}
