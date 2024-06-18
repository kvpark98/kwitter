import { Dropdown } from "react-bootstrap";
import TweetFooterDropdownMenuEdit from "./tweet-footer-dropdown-menu-edit";
import TweetFooterDropdownMenuDelete from "./tweet-footer-dropdown-menu-delete";
import TweetFooterDropdownMenuReply from "./tweet-footer-dropdown-menu-reply";
import { User } from "firebase/auth";

export interface TweetFooterDropdownMenuProps {
  user: User | null;
  userId: string;
  handleShowModifyTweetModal: () => void;
  handleShowDeleteModal: () => void;
  handleShowCreateReplyModal: () => void;
}

export default function TweetFooterDropdownMenu({
  user,
  userId,
  handleShowModifyTweetModal,
  handleShowDeleteModal,
  handleShowCreateReplyModal,
}: TweetFooterDropdownMenuProps) {
  return (
    <Dropdown.Menu>
      <TweetFooterDropdownMenuReply
        handleShowCreateReplyModal={handleShowCreateReplyModal}
      />
      {user?.uid === userId && (
        <>
          <TweetFooterDropdownMenuEdit
            handleShowModifyTweetModal={handleShowModifyTweetModal}
          />
          <TweetFooterDropdownMenuDelete
            handleShowDeleteModal={handleShowDeleteModal}
          />
        </>
      )}
    </Dropdown.Menu>
  );
}
