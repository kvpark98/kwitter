import { Dropdown } from "react-bootstrap";
import { User } from "firebase/auth";
import ReplyDropdownToggle from "./reply-dropdown-toggle";
import ReplyDropdownMenu from "./reply-dropdown-menu";

export interface ReplyDropdownProps {
  user: User | null;
  userId: string;
  handleShowModifyTweetModal: () => void;
  handleShowDeleteModal: () => void;
}

export default function ReplyDropdown({
  user,
  userId,
  handleShowModifyTweetModal,
  handleShowDeleteModal,
}: ReplyDropdownProps) {
  return (
    <Dropdown>
      <ReplyDropdownToggle />
      <ReplyDropdownMenu
        user={user}
        userId={userId}
        handleShowModifyTweetModal={handleShowModifyTweetModal}
        handleShowDeleteModal={handleShowDeleteModal}
      />
    </Dropdown>
  );
}
