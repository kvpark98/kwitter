import { Form } from "react-bootstrap";

export interface CreateMessageProps {
  message: string;
  handleMessage: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export default function CreateMessage({
  message,
  handleMessage,
}: CreateMessageProps) {
  return (
    <Form.Control
      as="textarea"
      onChange={handleMessage}
      value={message}
      rows={5}
      maxLength={180}
      className="mb-4"
      style={{ resize: "none" }}
      placeholder="What is happening?!"
    />
  );
}
