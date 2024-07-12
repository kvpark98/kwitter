import { Dropdown } from "react-bootstrap";
import ReplyDropdownToggle from "./reply-dropdown-toggle";
import ReplyDropdownMenu from "./reply-dropdown-menu";

export interface ReplyDropdownProps {
  handleShowModifyReplyModal: () => void;
  handleShowDeleteReplyModal: () => void;
}

export default function ReplyDropdown({
  handleShowModifyReplyModal,
  handleShowDeleteReplyModal,
}: ReplyDropdownProps) {
  return (
    <Dropdown>
      <ReplyDropdownToggle />
      <ReplyDropdownMenu
        handleShowModifyReplyModal={handleShowModifyReplyModal}
        handleShowDeleteReplyModal={handleShowDeleteReplyModal}
      />
    </Dropdown>
  );
}
