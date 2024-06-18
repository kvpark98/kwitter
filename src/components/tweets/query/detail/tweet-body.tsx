import { Card } from "react-bootstrap";
import { User } from "firebase/auth";
import TweetBodyProfile from "./tweet-body-profile";
import TweetBodyContent from "./tweet-body-content";

export interface TweetBodyProps {
  user: User | null;
  avatar: string;
  message: string;
  photo?: string | undefined;
  userId: string;
  username: string;
  handleShowModifyTweetModal: () => void;
  handleShowDeleteModal: () => void;
  handleShowCreateReplyModal: () => void;
}

export default function TweetBody({
  user,
  avatar,
  message,
  photo,
  userId,
  username,
  handleShowModifyTweetModal,
  handleShowDeleteModal,
  handleShowCreateReplyModal,
}: TweetBodyProps) {
  return (
    <Card.Body
      {...(user?.uid === userId
        ? { className: "d-flex bg-primary-subtle" }
        : { className: "d-flex" })}
    >
      <TweetBodyProfile
        user={user}
        avatar={avatar}
        userId={userId}
        username={username}
      />
      <TweetBodyContent
        user={user}
        message={message}
        photo={photo}
        userId={userId}
        username={username}
        handleShowModifyTweetModal={handleShowModifyTweetModal}
        handleShowDeleteModal={handleShowDeleteModal}
        handleShowCreateReplyModal={handleShowCreateReplyModal}
      />
    </Card.Body>
  );
}
