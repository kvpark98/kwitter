import { Dropdown } from "react-bootstrap";

export interface TweetFooterDropdownMenuReplyProps {
  handleShowReplyModal: () => void;
}

export default function TweetFooterDropdownMenuReply({
  handleShowReplyModal,
}: TweetFooterDropdownMenuReplyProps) {
  return (
    <Dropdown.Item
      className="btn d-flex align-items-center"
      onClick={handleShowReplyModal}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        className="bi bi-reply-fill me-2"
        viewBox="0 0 16 16"
      >
        <path d="M5.921 11.9 1.353 8.62a.72.72 0 0 1 0-1.238L5.921 4.1A.716.716 0 0 1 7 4.719V6c1.5 0 6 0 7 8-2.5-4.5-7-4-7-4v1.281c0 .56-.606.898-1.079.62z" />
      </svg>
      <span>Reply</span>
    </Dropdown.Item>
  );
}
