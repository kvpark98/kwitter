import { Card } from "react-bootstrap";
import { User } from "firebase/auth";
import ReplyBody from "./reply-body";
import ReplyFooter from "./reply-footer";

export interface ReplyProps {
  user: User | null;
  avatar: string;
  timeAgo: string | undefined;
  message: string;
  userId: string;
  username: string;
  handleShowModifyTweetModal: () => void;
  handleShowDeleteModal: () => void;
  handleShowCreateReplyModal: () => void;
}

export default function Reply({
  user,
  avatar,
  timeAgo,
  message,
  userId,
  username,
  handleShowModifyTweetModal,
  handleShowDeleteModal,
  handleShowCreateReplyModal,
}: ReplyProps) {
  return (
    <Card className="d-flex rounded-0 border border-0 border-bottom">
      <ReplyBody
        user={user}
        avatar={avatar}
        message={message}
        username={username}
        userId={userId}
        handleShowModifyTweetModal={handleShowModifyTweetModal}
        handleShowDeleteModal={handleShowDeleteModal}
        handleShowCreateReplyModal={handleShowCreateReplyModal}
      />
      <ReplyFooter timeAgo={timeAgo} />
    </Card>
  );
}
