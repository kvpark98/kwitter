import { Card } from "react-bootstrap";
import TweetFooterDropdown from "./tweet-footer-dropdown";
import { User } from "firebase/auth";

export interface TweetBodyProps {
  user: User | null;
  message: string;
  photo?: string | undefined;
  username: string;
  userId: string;
  handleShowModifyModal: () => void;
  handleShowDeleteModal: () => void;
}

export default function TweetBody({
  user,
  message,
  photo,
  username,
  userId,
  handleShowModifyModal,
  handleShowDeleteModal,
}: TweetBodyProps) {
  return (
    <Card.Body className="d-block">
      <div className="d-flex justify-content-between mb-3">
        <Card.Title className="fw-bold">{username}</Card.Title>
        {user?.uid === userId && (
          <TweetFooterDropdown
            handleShowModifyModal={handleShowModifyModal}
            handleShowDeleteModal={handleShowDeleteModal}
          />
        )}
      </div>
      <Card.Text>{message}</Card.Text>
      {photo && (
        <Card.Img variant="top" src={photo} className="mt-3 rounded-4" />
      )}
    </Card.Body>
  );
}
