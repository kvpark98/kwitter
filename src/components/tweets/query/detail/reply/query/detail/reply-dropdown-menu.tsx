import { Dropdown } from "react-bootstrap";
import { User } from "firebase/auth";
import ReplyDropdownMenuEdit from "./reply-dropdown-menu-edit";
import ReplyDropdownMenuDelete from "./reply-dropdown-menu-delete";

export interface ReplyDropdownMenuProps {
  user: User | null;
  userId: string;
  handleShowModifyTweetModal: () => void;
  handleShowDeleteModal: () => void;
}

export default function ReplyDropdownMenu({
  user,
  userId,
  handleShowModifyTweetModal,
  handleShowDeleteModal,
}: ReplyDropdownMenuProps) {
  return (
    <Dropdown.Menu>
      {user?.uid === userId && (
        <>
          <ReplyDropdownMenuEdit
            handleShowModifyTweetModal={handleShowModifyTweetModal}
          />
          <ReplyDropdownMenuDelete
            handleShowDeleteModal={handleShowDeleteModal}
          />
        </>
      )}
    </Dropdown.Menu>
  );
}
