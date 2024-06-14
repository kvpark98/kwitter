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
  handleShowReplyModal: () => void;
}

export default function TweetFooterDropdownMenu({
  user,
  userId,
  handleShowModifyTweetModal,
  handleShowDeleteModal,
  handleShowReplyModal,
}: TweetFooterDropdownMenuProps) {
  return (
    <Dropdown.Menu>
      <TweetFooterDropdownMenuReply
        handleShowReplyModal={handleShowReplyModal}
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
