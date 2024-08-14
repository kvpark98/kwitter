import { Container, Navbar } from "react-bootstrap";
import { IReply } from "./reply/query/detail/reply";
import { User } from "firebase/auth";
import TweetReplyListButton from "./tweet-reply-list-button";
import TweetLikesButton from "./tweet-likes-button";

export interface TweetFooterProps {
  user: User | null;
  tweetUserId: string;
  likeCount: number;
  isLike: boolean;
  debouncedHandleLikes: (...args: any[]) => void;
  replys: IReply[];
  handleShowReplyListModal?: () => void;
}

export default function TweetFooter({
  user,
  tweetUserId,
  likeCount,
  isLike,
  debouncedHandleLikes,
  replys,
  handleShowReplyListModal,
}: TweetFooterProps) {
  return (
    <Navbar
      {...(user?.uid === tweetUserId
        ? { className: "flex-fill bg-primary-subtle" }
        : { className: "flex-fill bg-body-light" })}
    >
      <Container className="d-flex">
        <div className="d-flex justify-content-between w-100">
          <TweetReplyListButton
            replys={replys}
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
