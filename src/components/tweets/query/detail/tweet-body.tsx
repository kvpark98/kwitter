import { Card } from "react-bootstrap";
import { User } from "firebase/auth";
import TweetBodyProfile from "./tweet-body-profile";
import TweetBodyContent from "./tweet-body-content";

export interface TweetBodyProps {
  user: User | null;
  message: string;
  photo?: string | undefined;
  userId: string;
  username: string;
  handleShowModifyModal: () => void;
  handleShowDeleteModal: () => void;
}

export default function TweetBody({
  user,
  message,
  photo,
  userId,
  username,
  handleShowModifyModal,
  handleShowDeleteModal,
}: TweetBodyProps) {
  return (
    <Card.Body className="d-flex">
      <TweetBodyProfile user={user} userId={userId} username={username} />
      <TweetBodyContent
        user={user}
        message={message}
        photo={photo}
        userId={userId}
        username={username}
        handleShowModifyModal={handleShowModifyModal}
        handleShowDeleteModal={handleShowDeleteModal}
      />
    </Card.Body>
  );
}
