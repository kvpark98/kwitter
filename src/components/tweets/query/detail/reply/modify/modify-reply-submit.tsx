import { Button } from "react-bootstrap";

export interface ModifyReplySubmitProps {
  isLoading: boolean;
  isNewReply: boolean;
}

export default function ModifyReplySubmit({
  isLoading,
  isNewReply,
}: ModifyReplySubmitProps) {
  return (
    <Button
      type="submit"
      variant="primary"
      className="fw-bold rounded-pill"
      {...(!isNewReply ? { disabled: true } : { disabled: false })}
    >
      {isLoading ? "Saving..." : "Save"}
    </Button>
  );
}
