import { Form } from "react-bootstrap";

export interface ModifyMessageProps {
  messageTextAreaRef: React.RefObject<HTMLTextAreaElement>;
  message: string;
  newMessage: string;
  handleNewMessage: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export default function ModifyMessage({
  messageTextAreaRef,
  message,
  newMessage,
  handleNewMessage,
}: ModifyMessageProps) {
  return (
    <Form.Control
      ref={messageTextAreaRef}
      as="textarea"
      onChange={handleNewMessage}
      defaultValue={!newMessage ? message : newMessage}
      rows={5}
      maxLength={180}
      className="mb-4 rounded-4"
      style={{ resize: "none" }}
      placeholder="What is happening?!"
    />
  );
}
