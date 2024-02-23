import { Dropdown } from "react-bootstrap";
import TweetFooterDropdownMenuEdit from "./tweet-footer-dropdown-menu-edit";
import TweetFooterDropdownMenuDelete from "./tweet-footer-dropdown-menu-delete";

export interface TweetFooterDropdownMenuProps {
  handleShowModifyModal: () => void;
  handleShowDeleteModal: () => void;
}

export default function TweetFooterDropdownMenu({
  handleShowModifyModal,
  handleShowDeleteModal,
}: TweetFooterDropdownMenuProps) {
  return (
    <Dropdown.Menu>
      <TweetFooterDropdownMenuEdit
        handleShowModifyModal={handleShowModifyModal}
      />
      <TweetFooterDropdownMenuDelete
        handleShowDeleteModal={handleShowDeleteModal}
      />
    </Dropdown.Menu>
  );
}
