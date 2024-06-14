import { Button } from "react-bootstrap";

export interface CreateReplySubmitProps {
  isLoading: boolean;
  isReply: boolean;
}

export default function CreateReplySubmit({
  isLoading,
  isReply,
}: CreateReplySubmitProps) {
  return (
    <Button
      type="submit"
      variant="primary"
      className="fw-bold rounded-pill"
      {...(!isReply ? { disabled: true } : { disabled: false })}
    >
      {isLoading ? "Posting..." : "Post"}
    </Button>
  );
}
