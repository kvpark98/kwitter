import { SetStateAction } from "react";
import Reply, {
  IReply,
} from "../../tweets/query/detail/reply/query/detail/reply";
import { User } from "firebase/auth";

export interface UserReplyListProps {
  user: User | null;
  replys: IReply[];
}

export default function UserReplyList({ user, replys }: UserReplyListProps) {
  return (
    <div className="pt-5">
      {replys.map((reply) => {
        return (
          <Reply
            user={user}
            setIsReplyDeleted={function (value: SetStateAction<boolean>): void {
              throw new Error("Function not implemented.");
            }}
            key={reply.id}
            {...reply}
          />
        );
      })}
    </div>
  );
}
