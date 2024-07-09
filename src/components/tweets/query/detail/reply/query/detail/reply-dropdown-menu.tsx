import { Dropdown } from "react-bootstrap";
import ReplyDropdownMenuEdit from "./reply-dropdown-menu-edit";
import ReplyDropdownMenuDelete from "./reply-dropdown-menu-delete";

export interface ReplyDropdownMenuProps {
  handleShowModifyReplyModal: () => void;
  handleShowDeleteReplyModal: () => void;
}

export default function ReplyDropdownMenu({
  handleShowModifyReplyModal,
  handleShowDeleteReplyModal,
}: ReplyDropdownMenuProps) {
  return (
    <Dropdown.Menu>
      <ReplyDropdownMenuEdit
        handleShowModifyReplyModal={handleShowModifyReplyModal}
      />
      <ReplyDropdownMenuDelete
        handleShowDeleteReplyModal={handleShowDeleteReplyModal}
      />
    </Dropdown.Menu>
  );
}
