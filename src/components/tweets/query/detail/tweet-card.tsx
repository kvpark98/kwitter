import { Card } from "react-bootstrap";
import TweetBody from "./tweet-body";
import { User } from "firebase/auth";
import { IReply } from "./reply/query/detail/reply";
import TweetFooter from "./tweet-footer";

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
  handleShowDeleteTweetModal: () => void;
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
  handleShowDeleteTweetModal,
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
        handleShowModifyTweetModal={handleShowModifyTweetModal}
        handleShowDeleteTweetModal={handleShowDeleteTweetModal}
      />
      <TweetFooter
        user={user}
        tweetUserId={tweetUserId}
        replys={replys}
        handleShowReplyListModal={handleShowReplyListModal}
      />
    </Card>
  );
}
