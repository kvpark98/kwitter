import { Card } from "react-bootstrap";
import { User } from "firebase/auth";
import ReplyBodyProfile from "./reply-body-profile";
import ReplyBodyContent from "./reply-body-content";

export interface ReplyBodyProps {
  user: User | null;
  avatar: string;
  reply: string;
  replyUserId: string;
  replyUsername: string;
}

export default function ReplyBody({
  user,
  avatar,
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
        avatar={avatar}
        replyUserId={replyUserId}
        replyUsername={replyUsername}
      />
      <ReplyBodyContent
        user={user}
        reply={reply}
        replyUserId={replyUserId}
        replyUsername={replyUsername}
      />
    </Card.Body>
  );
}
