import { Card } from "react-bootstrap";
import TweetBody from "./tweet-body";
import TweetFooter from "./tweet-footer";
import { User } from "firebase/auth";
import { IReply } from "./reply/query/detail/reply";

export interface TweetCardProps {
  user: User | null;
  avatar: string;
  timeAgo: string | undefined;
  message: string;
  photo?: string | undefined;
  userId: string;
  username: string;
  replys: IReply[];
  handleShowModifyTweetModal: () => void;
  handleShowDeleteModal: () => void;
  handleShowReplyListModal: () => void;
}

export default function TweetCard({
  user,
  avatar,
  timeAgo,
  message,
  photo,
  userId,
  username,
  replys,
  handleShowModifyTweetModal,
  handleShowDeleteModal,
  handleShowReplyListModal,
}: TweetCardProps) {
  return (
    <Card className="d-flex rounded-0 border border-0 border-bottom">
      <TweetBody
        user={user}
        avatar={avatar}
        message={message}
        photo={photo}
        userId={userId}
        username={username}
        replys={replys}
        handleShowModifyTweetModal={handleShowModifyTweetModal}
        handleShowDeleteModal={handleShowDeleteModal}
        handleShowReplyListModal={handleShowReplyListModal}
      />
      <TweetFooter timeAgo={timeAgo} />
    </Card>
  );
}
