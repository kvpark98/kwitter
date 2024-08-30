import { Button } from "react-bootstrap";
import { IReply } from "./reply/query/detail/reply";

export interface TweetReplyListButtonProps {
  replys: IReply[];
  handleShowReplyListModal?: () => void;
}

export default function TweetReplyListButton({
  replys,
  handleShowReplyListModal,
}: TweetReplyListButtonProps) {
  return (
    <Button
      type="button"
      variant="secondary"
      onClick={handleShowReplyListModal}
      title="Replys"
      className="d-flex align-items-center border-0 rounded-pill"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        className="bi bi-chat-right-text-fill me-2"
        viewBox="0 0 16 16"
      >
        <path d="M16 2a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h9.586a1 1 0 0 1 .707.293l2.853 2.853a.5.5 0 0 0 .854-.353zM3.5 3h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1 0-1m0 2.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1 0-1m0 2.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1 0-1" />
      </svg>
      <span>Replies ({replys.length})</span>
    </Button>
  );
}
