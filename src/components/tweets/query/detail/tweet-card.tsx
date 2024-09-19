import { Card } from "react-bootstrap";
import TweetBody from "./tweet-body";
import { User } from "firebase/auth";
import TweetFooter from "./tweet-footer";

export interface TweetCardProps {
  user: User | null;
  tweetAvatar: string;
  timeAgo: string | undefined;
  message: string;
  photo?: string | undefined;
  tweetUserId: string;
  tweetUsername: string;
  likeCount: number;
  isLike: boolean;
  debouncedHandleLikes: (...args: any[]) => void;
  replyCount: number;
  showReplyTweetModal?: boolean;
  handleShowModifyTweetModal: () => void;
  handleShowDeleteTweetModal: () => void;
  handleShowReplyListModal?: () => void;
}

export default function TweetCard({
  user,
  tweetAvatar,
  timeAgo,
  message,
  photo,
  tweetUserId,
  tweetUsername,
  likeCount,
  isLike,
  debouncedHandleLikes,
  replyCount,
  showReplyTweetModal,
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
        showReplyTweetModal={showReplyTweetModal}
        handleShowModifyTweetModal={handleShowModifyTweetModal}
        handleShowDeleteTweetModal={handleShowDeleteTweetModal}
      />
      <TweetFooter
        user={user}
        tweetUserId={tweetUserId}
        likeCount={likeCount}
        isLike={isLike}
        debouncedHandleLikes={debouncedHandleLikes}
        replyCount={replyCount}
        handleShowReplyListModal={handleShowReplyListModal}
      />
    </Card>
  );
}
