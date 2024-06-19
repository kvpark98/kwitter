import { IReply } from "../../../tweet";
import Reply from "../detail/reply";
import { User } from "firebase/auth";
import NoReply from "../../../../../no-reply";

export interface ReplyListProps {
  replys: IReply[];
  user: User | null;
  avatar: string;
  timeAgo: string | undefined;
  message: string;
  userId: string;
  username: string;
  handleShowModifyTweetModal: () => void;
  handleShowDeleteModal: () => void;
  handleShowCreateReplyModal: () => void;
}

export default function ReplyList({
  replys,
  user,
  avatar,
  timeAgo,
  message,
  userId,
  username,
  handleShowModifyTweetModal,
  handleShowDeleteModal,
  handleShowCreateReplyModal,
}: ReplyListProps) {
  return replys.length !== 0 ? (
    <div className="overflow-y-auto">
      {replys.map((reply) => {
        return (
          <Reply
            user={user}
            avatar={avatar}
            timeAgo={timeAgo}
            message={message}
            userId={userId}
            username={username}
            handleShowModifyTweetModal={handleShowModifyTweetModal}
            handleShowDeleteModal={handleShowDeleteModal}
            handleShowCreateReplyModal={handleShowCreateReplyModal}
            key={reply.id}
            {...reply}
          />
        );
      })}
    </div>
  ) : (
    <NoReply />
  );
}
