import { SetStateAction } from "react";
import Reply, {
  IReply,
} from "../../tweets/query/detail/reply/query/detail/reply";
import { User } from "firebase/auth";

export interface UserReplyListProps {
  user: User | null;
  replys: IReply[];
  isTweetActive?: boolean;
  handleShowReplyTweetModal?: () => void;
}

export default function UserReplyList({
  user,
  replys,
  isTweetActive,
  handleShowReplyTweetModal,
}: UserReplyListProps) {
  return (
    <div className="pt-2">
      {replys.map((reply) => {
        return (
          <Reply
            user={user}
            key={reply.id}
            {...reply}
            setIsReplyDeleted={function (value: SetStateAction<boolean>): void {
              throw new Error("Function not implemented.");
            }}
            isTweetActive={isTweetActive}
            handleShowReplyTweetModal={handleShowReplyTweetModal}
          />
        );
      })}
    </div>
  );
}
