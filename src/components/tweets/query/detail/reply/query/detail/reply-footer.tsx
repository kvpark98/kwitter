import { Container, Navbar } from "react-bootstrap";
import { User } from "firebase/auth";
import TweetLikesButton from "../../../tweet-likes-button";

export interface ReplyFooterProps {
  user: User | null;
  replyUserId: string;
  likes: number;
  isLike: boolean;
  debouncedHandleLikes: (...args: any[]) => void;
}

export default function ReplyFooter({
  user,
  replyUserId,
  likes,
  isLike,
  debouncedHandleLikes,
}: ReplyFooterProps) {
  return (
    <Navbar
      {...(user?.uid === replyUserId
        ? { className: "flex-fill bg-primary-subtle" }
        : { className: "flex-fill bg-body-light" })}
    >
      <Container className="d-flex">
        <div className="d-flex justify-content-end w-100">
          <TweetLikesButton
            likes={likes}
            isLike={isLike}
            debouncedHandleLikes={debouncedHandleLikes}
          />
        </div>
      </Container>
    </Navbar>
  );
}
