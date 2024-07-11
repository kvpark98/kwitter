import { Form } from "react-bootstrap";

export interface ModifyReplyInputProps {
  replyTextAreaRef: React.RefObject<HTMLTextAreaElement>;
  newReply: string;
  handleNewReply: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export default function ModifyReplyInput({
  replyTextAreaRef,
  newReply,
  handleNewReply,
}: ModifyReplyInputProps) {
  return (
    <Form.Group className="w-100">
      <Form.Control
        ref={replyTextAreaRef}
        as="textarea"
        onChange={handleNewReply}
        defaultValue={newReply}
        rows={5}
        maxLength={180}
        className="mb-4 rounded-4"
        style={{ resize: "none" }}
        placeholder="What is happening?!"
      />
    </Form.Group>
  );
}
