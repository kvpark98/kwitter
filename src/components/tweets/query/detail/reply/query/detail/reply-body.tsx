import { Card } from "react-bootstrap";
import { User } from "firebase/auth";
import ReplyBodyProfile from "./reply-body-profile";
import ReplyBodyContent from "./reply-body-content";

export interface ReplyBodyProps {
  user: User | null;
  replyAvatar: string;
  timeAgo: string | undefined;
  reply: string;
  replyUserId: string;
  replyUsername: string;
}

export default function ReplyBody({
  user,
  replyAvatar,
  timeAgo,
  reply,
  replyUserId,
  replyUsername,
}: ReplyBodyProps) {
  return (
    <Card.Body
      {...(user?.uid === replyUserId
        ? { className: "d-flex bg-primary-subtle" }
        : { className: "d-flex" })}
    >
      <ReplyBodyProfile
        user={user}
        replyAvatar={replyAvatar}
        replyUserId={replyUserId}
        replyUsername={replyUsername}
      />
      <ReplyBodyContent
        user={user}
        timeAgo={timeAgo}
        reply={reply}
        replyUserId={replyUserId}
        replyUsername={replyUsername}
      />
    </Card.Body>
  );
}
