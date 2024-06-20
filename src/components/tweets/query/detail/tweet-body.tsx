import { Card } from "react-bootstrap";
import { User } from "firebase/auth";
import TweetBodyProfile from "./tweet-body-profile";
import TweetBodyContent from "./tweet-body-content";
import { IReply } from "./reply/query/detail/reply";

export interface TweetBodyProps {
  user: User | null;
  avatar: string;
  message: string;
  photo?: string | undefined;
  userId: string;
  username: string;
  replys: IReply[];
  handleShowModifyTweetModal: () => void;
  handleShowDeleteModal: () => void;
  handleShowReplyListModal: () => void;
}

export default function TweetBody({
  user,
  avatar,
  message,
  photo,
  userId,
  username,
  replys,
  handleShowModifyTweetModal,
  handleShowDeleteModal,
  handleShowReplyListModal,
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
        replys={replys}
        handleShowModifyTweetModal={handleShowModifyTweetModal}
        handleShowDeleteModal={handleShowDeleteModal}
        handleShowReplyListModal={handleShowReplyListModal}
      />
    </Card.Body>
  );
}
