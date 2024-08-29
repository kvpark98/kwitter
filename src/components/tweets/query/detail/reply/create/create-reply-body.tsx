import { Alert } from "react-bootstrap";
import CreateReplyMessage from "./create-reply-message";
import UserProfile from "../../../../user-profile";

export interface CreateReplyBodyProps {
  reply: string;
  handleReply: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export default function CreateReplyBody({
  reply,
  handleReply,
}: CreateReplyBodyProps) {
  return (
    <Alert
      variant="light"
      className="overflow-y-auto border-0 m-0 p-4"
      style={{ maxHeight: "500px" }}
    >
      <div className="d-flex w-100">
        <UserProfile />
        <CreateReplyMessage reply={reply} handleReply={handleReply} />
      </div>
    </Alert>
  );
}
