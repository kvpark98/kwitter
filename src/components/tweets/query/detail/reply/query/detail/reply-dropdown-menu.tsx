import { Dropdown } from "react-bootstrap";
import { User } from "firebase/auth";
import ReplyDropdownMenuEdit from "./reply-dropdown-menu-edit";
import ReplyDropdownMenuDelete from "./reply-dropdown-menu-delete";

export interface ReplyDropdownMenuProps {
  user: User | null;
  replyUserId: string;
}

export default function ReplyDropdownMenu({
  user,
  replyUserId,
}: ReplyDropdownMenuProps) {
  return (
    <Dropdown.Menu>
      {user?.uid === replyUserId && (
        <>
          {/* <ReplyDropdownMenuEdit
            handleShowModifyTweetModal={handleShowModifyTweetModal}
          />
          <ReplyDropdownMenuDelete
            handleShowDeleteModal={handleShowDeleteModal}
          /> */}
        </>
      )}
    </Dropdown.Menu>
  );
}
