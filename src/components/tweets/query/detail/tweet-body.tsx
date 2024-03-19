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
  handleShowTweetModifyModal: () => void;
  handleShowDeleteModal: () => void;
}

export default function TweetBody({
  user,
  message,
  photo,
  userId,
  username,
  handleShowTweetModifyModal,
  handleShowDeleteModal,
}: TweetBodyProps) {
  return (
    <Card.Body
      {...(user?.uid === userId
        ? { className: "d-flex bg-primary-subtle" }
        : { className: "d-flex" })}
    >
      <TweetBodyProfile user={user} userId={userId} username={username} />
      <TweetBodyContent
        user={user}
        message={message}
        photo={photo}
        userId={userId}
        username={username}
        handleShowTweetModifyModal={handleShowTweetModifyModal}
        handleShowDeleteModal={handleShowDeleteModal}
      />
    </Card.Body>
  );
}
