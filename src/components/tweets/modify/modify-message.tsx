import { Form } from "react-bootstrap";

export interface ModifyMessageProps {
  message: string;
  handleNewMessage: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export default function ModifyMessage({
  message,
  handleNewMessage,
}: ModifyMessageProps) {
  return (
    <Form.Control
      as="textarea"
      onChange={handleNewMessage}
      defaultValue={message}
      rows={5}
      maxLength={180}
      className="mb-4 rounded-4"
      style={{ resize: "none" }}
      placeholder="What is happening?!"
    />
  );
}
