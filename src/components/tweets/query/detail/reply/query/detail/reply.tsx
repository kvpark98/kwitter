import { Card } from "react-bootstrap";
import { User } from "firebase/auth";
import ReplyBody from "./reply-body";
import ReplyFooter from "./reply-footer";

export interface IReply {
  user: User | null;
  avatar: string;
  id: string;
  timeAgo?: string | undefined;
  reply: string;
  replyUserId: string;
  replyUsername: string;
}

export default function Reply({
  user,
  avatar,
  id,
  timeAgo,
  reply,
  replyUserId,
  replyUsername,
}: IReply) {
  return (
    <Card className="d-flex rounded-0 border border-0 border-bottom">
      <ReplyBody
        user={user}
        avatar={avatar}
        reply={reply}
        replyUserId={replyUserId}
        replyUsername={replyUsername}
      />
      <ReplyFooter timeAgo={timeAgo} />
    </Card>
  );
}
