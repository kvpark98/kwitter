import { Button } from "react-bootstrap";

export interface ReplyTweetButtonProps {
  handleShowReplyTweetModal: () => void;
}

export default function ReplyTweetButton({
  handleShowReplyTweetModal,
}: ReplyTweetButtonProps) {
  return (
    <Button
      type="button"
      variant="secondary"
      onClick={handleShowReplyTweetModal}
      title="Tweet"
      className="d-flex align-items-center border-0 rounded-pill"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        className="bi bi-chat-right-dots-fill me-2"
        viewBox="0 0 16 16"
      >
        <path d="M16 2a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h9.586a1 1 0 0 1 .707.293l2.853 2.853a.5.5 0 0 0 .854-.353zM5 6a1 1 0 1 1-2 0 1 1 0 0 1 2 0m4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0m3 1a1 1 0 1 1 0-2 1 1 0 0 1 0 2" />
      </svg>
      <span>Tweet</span>
    </Button>
  );
}
