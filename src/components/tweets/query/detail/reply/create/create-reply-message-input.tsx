import { Form } from "react-bootstrap";

export interface CreateReplyMessageInputProps {
  reply: string;
  handleReply: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export default function CreateReplyMessageInput({
  reply,
  handleReply,
}: CreateReplyMessageInputProps) {
  return (
    <Form.Control
      as="textarea"
      onChange={handleReply}
      value={reply}
      rows={5}
      maxLength={180}
      className="mb-4 rounded-4"
      style={{ resize: "none" }}
      placeholder="Your reply..."
    />
  );
}
