import { Dropdown } from "react-bootstrap";
import { User } from "firebase/auth";
import ReplyDropdownToggle from "./reply-dropdown-toggle";
import ReplyDropdownMenu from "./reply-dropdown-menu";

export interface ReplyDropdownProps {
  user: User | null;
  replyUserId: string;
  handleShowModifyReplyModal: () => void;
  handleShowDeleteReplyModal: () => void;
}

export default function ReplyDropdown({
  user,
  replyUserId,
  handleShowModifyReplyModal,
  handleShowDeleteReplyModal,
}: ReplyDropdownProps) {
  return (
    <Dropdown>
      <ReplyDropdownToggle />
      {user?.uid === replyUserId && (
        <ReplyDropdownMenu
          handleShowModifyReplyModal={handleShowModifyReplyModal}
          handleShowDeleteReplyModal={handleShowDeleteReplyModal}
        />
      )}
    </Dropdown>
  );
}
