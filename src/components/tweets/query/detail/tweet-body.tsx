import { Card } from "react-bootstrap";
import { User } from "firebase/auth";
import TweetBodyProfile from "./tweet-body-profile";
import TweetBodyContent from "./tweet-body-content";

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
    <Card.Body className="d-flex">
      <TweetBodyProfile />
      <TweetBodyContent
        user={user}
        message={message}
        photo={photo}
        username={username}
        userId={userId}
        handleShowModifyModal={handleShowModifyModal}
        handleShowDeleteModal={handleShowDeleteModal}
      />
    </Card.Body>
  );
}
