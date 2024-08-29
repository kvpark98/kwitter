import { Alert } from "react-bootstrap";
import UserProfile from "../../../../user-profile";
import ModifyReplyInput from "./modify-reply-input";

export interface ModifyReplyBodyProps {
  replyTextAreaRef: React.RefObject<HTMLTextAreaElement>;
  newReply: string;
  handleNewReply: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export default function ModifyReplyBody({
  replyTextAreaRef,
  newReply,
  handleNewReply,
}: ModifyReplyBodyProps) {
  return (
    <Alert
      variant="light"
      className="overflow-y-auto border-0 m-0 p-4"
      style={{ maxHeight: "500px" }}
    >
      <div className="d-flex w-100">
        <UserProfile />
        <ModifyReplyInput
          replyTextAreaRef={replyTextAreaRef}
          newReply={newReply}
          handleNewReply={handleNewReply}
        />
      </div>
    </Alert>
  );
}
