import Reply, {
  IReply,
} from "../../tweets/query/detail/reply/query/detail/reply";
import { User } from "firebase/auth";

export interface UserReplyListProps {
  user: User | null;
  replys: IReply[];
  isTweetActive?: boolean;
  setIsReplyDeleted?: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function UserReplyList({
  user,
  replys,
  isTweetActive,
  setIsReplyDeleted,
}: UserReplyListProps) {
  return (
    <div className="pt-2">
      {replys.map((reply) => {
        return (
          <Reply
            user={user}
            key={reply.id}
            isTweetActive={isTweetActive}
            setIsReplyDeleted={setIsReplyDeleted}
            {...reply}
          />
        );
      })}
    </div>
  );
}
