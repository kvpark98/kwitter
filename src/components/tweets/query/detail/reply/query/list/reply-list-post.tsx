import { Button } from "react-bootstrap";

export interface ReplyListPostProps {
  handleShowCreateReplyModal: () => void;
}

export default function ReplyListPost({
  handleShowCreateReplyModal,
}: ReplyListPostProps) {
  return (
    <Button
      type="button"
      variant="primary"
      className="fw-bold rounded-pill"
      onClick={handleShowCreateReplyModal}
    >
      Post reply
    </Button>
  );
}
