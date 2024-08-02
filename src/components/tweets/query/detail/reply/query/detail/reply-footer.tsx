import { Container, Navbar } from "react-bootstrap";
import { User } from "firebase/auth";
import ReplyLikesButton from "./reply-likes-button";

export interface ReplyFooterProps {
  user: User | null;
  replyUserId: string;
  likeCount: number;
  isLike: boolean;
  debouncedHandleLikes: (...args: any[]) => void;
}

export default function ReplyFooter({
  user,
  replyUserId,
  likeCount,
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
