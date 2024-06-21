import { Card } from "react-bootstrap";
import TweetBody from "./tweet-body";
import { User } from "firebase/auth";
import { IReply } from "./reply/query/detail/reply";

export interface TweetCardProps {
  user: User | null;
  tweetAvatar: string;
  timeAgo: string | undefined;
  message: string;
  photo?: string | undefined;
  tweetUserId: string;
  tweetUsername: string;
  replys: IReply[];
  handleShowModifyTweetModal: () => void;
  handleShowDeleteModal: () => void;
  handleShowReplyListModal: () => void;
}

export default function TweetCard({
  user,
  tweetAvatar,
  timeAgo,
  message,
  photo,
  tweetUserId,
  tweetUsername,
  replys,
  handleShowModifyTweetModal,
  handleShowDeleteModal,
  handleShowReplyListModal,
}: TweetCardProps) {
  return (
    <Card className="d-flex rounded-0 border-0 border-bottom border-secondary-subtle">
      <TweetBody
        user={user}
        tweetAvatar={tweetAvatar}
        timeAgo={timeAgo}
        message={message}
        photo={photo}
        tweetUserId={tweetUserId}
        tweetUsername={tweetUsername}
        replys={replys}
        handleShowModifyTweetModal={handleShowModifyTweetModal}
        handleShowDeleteModal={handleShowDeleteModal}
        handleShowReplyListModal={handleShowReplyListModal}
      />
    </Card>
  );
}
