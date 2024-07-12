import { Dropdown } from "react-bootstrap";
import TweetDropdownMenuEdit from "./tweet-dropdown-menu-edit";
import TweetDropdownMenuDelete from "./tweet-dropdown-menu-delete";

export interface TweetDropdownMenuProps {
  handleShowModifyTweetModal: () => void;
  handleShowDeleteTweetModal: () => void;
}

export default function TweetDropdownMenu({
  handleShowModifyTweetModal,
  handleShowDeleteTweetModal,
}: TweetDropdownMenuProps) {
  return (
    <Dropdown.Menu>
      <TweetDropdownMenuEdit
        handleShowModifyTweetModal={handleShowModifyTweetModal}
      />
      <TweetDropdownMenuDelete
        handleShowDeleteTweetModal={handleShowDeleteTweetModal}
      />
    </Dropdown.Menu>
  );
}
