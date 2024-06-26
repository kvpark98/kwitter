import { Dropdown } from "react-bootstrap";
import { User } from "firebase/auth";
import ReplyDropdownToggle from "./reply-dropdown-toggle";
import ReplyDropdownMenu from "./reply-dropdown-menu";

export interface ReplyDropdownProps {
  user: User | null;
  replyUserId: string;
  handleShowReplyDeleteModal: () => void;
}

export default function ReplyDropdown({
  user,
  replyUserId,
  handleShowReplyDeleteModal,
}: ReplyDropdownProps) {
  return (
    <Dropdown>
      <ReplyDropdownToggle />
      <ReplyDropdownMenu
        user={user}
        replyUserId={replyUserId}
        handleShowReplyDeleteModal={handleShowReplyDeleteModal}
      />
    </Dropdown>
  );
}
