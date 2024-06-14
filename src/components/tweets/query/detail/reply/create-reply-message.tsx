import { Form } from "react-bootstrap";
import CreateReplyMessageInput from "./create-reply-message-input";

export interface CreateReplyMessageProps {
  reply: string;
  handleReply: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export default function CreateReplyMessage({
  reply,
  handleReply,
}: CreateReplyMessageProps) {
  return (
    <Form.Group className="w-100">
      <CreateReplyMessageInput reply={reply} handleReply={handleReply} />
    </Form.Group>
  );
}
