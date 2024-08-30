import { Container, Navbar } from "react-bootstrap";
import { User } from "firebase/auth";
import ReplyLikesButton from "./reply-likes-button";
import ReplyTweetButton from "./reply-tweet-button";

export interface ReplyFooterProps {
  user?: User | null;
  replyUserId: string;
  likeCount: number;
  isLike: boolean;
  debouncedHandleLikes: (...args: any[]) => void;
  isTweetActive?: boolean;
  handleShowReplyTweetModal?: () => void;
}

export default function ReplyFooter({
  user,
  replyUserId,
  likeCount,
  isLike,
  debouncedHandleLikes,
  isTweetActive,
  handleShowReplyTweetModal,
}: ReplyFooterProps) {
  return (
    <Navbar
      {...(user?.uid === replyUserId
        ? { className: "flex-fill bg-primary-subtle" }
        : { className: "flex-fill bg-body-light" })}
    >
      <Container className="d-flex">
        <div
          className={
            window.location.href.includes("profile") && isTweetActive === false
              ? "d-flex justify-content-between w-100"
              : "d-flex justify-content-end w-100"
          }
        >
          {window.location.href.includes("profile") &&
            isTweetActive === false && (
              <ReplyTweetButton
                handleShowReplyTweetModal={handleShowReplyTweetModal}
              />
            )}
          <ReplyLikesButton
            likeCount={likeCount}
            isLike={isLike}
            debouncedHandleLikes={debouncedHandleLikes}
          />
        </div>
      </Container>
    </Navbar>
  );
}
