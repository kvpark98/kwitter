import { Dropdown } from "react-bootstrap";
import TweetFooterDropdownMenuEdit from "./tweet-footer-dropdown-menu-edit";
import TweetFooterDropdownMenuDelete from "./tweet-footer-dropdown-menu-delete";

export interface TweetFooterDropdownMenuProps {
  handleShowModifyTweetModal: () => void;
  handleShowDeleteModal: () => void;
}

export default function TweetFooterDropdownMenu({
  handleShowModifyTweetModal,
  handleShowDeleteModal,
}: TweetFooterDropdownMenuProps) {
  return (
    <Dropdown.Menu>
      <TweetFooterDropdownMenuEdit
        handleShowModifyTweetModal={handleShowModifyTweetModal}
      />
      <TweetFooterDropdownMenuDelete
        handleShowDeleteModal={handleShowDeleteModal}
      />
    </Dropdown.Menu>
  );
}
