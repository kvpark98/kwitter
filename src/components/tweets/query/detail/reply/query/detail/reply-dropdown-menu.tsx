import { Dropdown } from "react-bootstrap";
import { User } from "firebase/auth";
import ReplyDropdownMenuEdit from "./reply-dropdown-menu-edit";
import ReplyDropdownMenuDelete from "./reply-dropdown-menu-delete";

export interface ReplyDropdownMenuProps {
  user: User | null;
  replyUserId: string;
  handleShowReplyDeleteModal: () => void;
}

export default function ReplyDropdownMenu({
  user,
  replyUserId,
  handleShowReplyDeleteModal,
}: ReplyDropdownMenuProps) {
  return (
    <Dropdown.Menu>
      {user?.uid === replyUserId && (
        <>
          {
            //   <ReplyDropdownMenuEdit
            //   handleShowModifyTweetModal={handleShowModifyTweetModal}
            // />
            <ReplyDropdownMenuDelete
              handleShowReplyDeleteModal={handleShowReplyDeleteModal}
            />
          }
        </>
      )}
    </Dropdown.Menu>
  );
}
