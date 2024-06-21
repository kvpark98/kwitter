import { Card } from "react-bootstrap";
import { User } from "firebase/auth";
import ReplyBody from "./reply-body";
import { useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../../../../../firebase";

export interface IReply {
  id: string;
  timeAgo: string | undefined;
  reply: string;
  replyUserId: string;
  replyUsername: string;
  tweetId: string;
}

export interface ReplyProps {
  user: User | null;
  timeAgo: string | undefined;
  reply: string;
  replyUserId: string;
  replyUsername: string;
}

export default function Reply({
  user,
  timeAgo,
  reply,
  replyUserId,
  replyUsername,
}: ReplyProps) {
  const defaultAvatarURL = "/person-circle.svg";

  const [replyAvatar, setReplyAvatar] = useState(defaultAvatarURL);

  const getReplyAvatar = async () => {
    const replyAvatarQuery = query(
      collection(db, "avatars"),
      where("userId", "==", replyUserId)
    );

    const snapshot = await getDocs(replyAvatarQuery);
    snapshot.forEach(async (doc) => {
      const data = doc.data();
      setReplyAvatar(data.avatar);
    });
  };

  getReplyAvatar();

  return (
    <Card className="d-flex rounded-0 border border-0 border-bottom border-secondary-subtle">
      <ReplyBody
        user={user}
        replyAvatar={replyAvatar}
        timeAgo={timeAgo}
        reply={reply}
        replyUserId={replyUserId}
        replyUsername={replyUsername}
      />
    </Card>
  );
}
