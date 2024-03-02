import { Card } from "react-bootstrap";
import TweetFooterDropdown from "./tweet-footer-dropdown";
import { User } from "firebase/auth";

export interface TweetBodyContentProps {
  user: User | null;
  message: string;
  photo?: string | undefined;
  username: string;
  userId: string;
  handleShowModifyModal: () => void;
  handleShowDeleteModal: () => void;
}

export default function TweetBodyContent({
  user,
  message,
  photo,
  username,
  userId,
  handleShowModifyModal,
  handleShowDeleteModal,
}: TweetBodyContentProps) {
  return (
    <div>
      <Card.Title className="d-flex justify-content-between mb-3">
        <span className="fw-bold">{username}</span>
        {user?.uid === userId && (
          <TweetFooterDropdown
            handleShowModifyModal={handleShowModifyModal}
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
