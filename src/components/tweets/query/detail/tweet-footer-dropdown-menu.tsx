import { Dropdown } from "react-bootstrap";
import TweetFooterDropdownMenuEdit from "./tweet-footer-dropdown-menu-edit";
import TweetFooterDropdownMenuDelete from "./tweet-footer-dropdown-menu-delete";

export interface TweetFooterDropdownMenuProps {
  handleShowTweetModifyModal: () => void;
  handleShowDeleteModal: () => void;
}

export default function TweetFooterDropdownMenu({
  handleShowTweetModifyModal,
  handleShowDeleteModal,
}: TweetFooterDropdownMenuProps) {
  return (
    <Dropdown.Menu>
      <TweetFooterDropdownMenuEdit
        handleShowTweetModifyModal={handleShowTweetModifyModal}
      />
      <TweetFooterDropdownMenuDelete
        handleShowDeleteModal={handleShowDeleteModal}
      />
    </Dropdown.Menu>
  );
}
