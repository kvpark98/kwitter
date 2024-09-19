import { Container, Navbar } from "react-bootstrap";
import { User } from "firebase/auth";
import TweetReplyListButton from "./tweet-reply-list-button";
import TweetLikesButton from "./tweet-likes-button";

export interface TweetFooterProps {
  user: User | null;
  tweetUserId: string;
  likeCount: number;
  isLike: boolean;
  debouncedHandleLikes: (...args: any[]) => void;
  replyCount: number;
  handleShowReplyListModal?: () => void;
}

export default function TweetFooter({
  user,
  tweetUserId,
  likeCount,
  isLike,
  debouncedHandleLikes,
  replyCount,
  handleShowReplyListModal,
}: TweetFooterProps) {
  return (
    <Navbar
      {...(user?.uid === tweetUserId
        ? { className: "flex-fill bg-primary-subtle py-3" }
        : { className: "flex-fill bg-body-light py-3" })}
    >
      <Container className="d-flex px-3" fluid>
        <div className="d-flex justify-content-between w-100">
          <TweetReplyListButton
            replyCount={replyCount}
            handleShowReplyListModal={handleShowReplyListModal}
          />
          <TweetLikesButton
            likeCount={likeCount}
            isLike={isLike}
            debouncedHandleLikes={debouncedHandleLikes}
          />
        </div>
      </Container>
    </Navbar>
  );
}
