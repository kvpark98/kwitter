import { Card } from "react-bootstrap";
import { User } from "firebase/auth";
import ReplyBodyProfile from "./reply-body-profile";
import ReplyBodyContent from "./reply-body-content";

export interface ReplyBodyProps {
  user: User | null;
  avatar: string;
  message: string;
  userId: string;
  username: string;
  handleShowModifyTweetModal: () => void;
  handleShowDeleteModal: () => void;
  handleShowCreateReplyModal: () => void;
}

export default function ReplyBody({
  user,
  avatar,
  message,
  userId,
  username,
  handleShowModifyTweetModal,
  handleShowDeleteModal,
  handleShowCreateReplyModal,
}: ReplyBodyProps) {
  return (
    <Card.Body
      {...(user?.uid === userId
        ? { className: "d-flex bg-primary-subtle" }
        : { className: "d-flex" })}
    >
      <ReplyBodyProfile
        user={user}
        avatar={avatar}
        userId={userId}
        username={username}
      />
      <ReplyBodyContent
        user={user}
        message={message}
        userId={userId}
        username={username}
        handleShowModifyTweetModal={handleShowModifyTweetModal}
        handleShowDeleteModal={handleShowDeleteModal}
        handleShowCreateReplyModal={handleShowCreateReplyModal}
      />
    </Card.Body>
  );
}
