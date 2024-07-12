import { Dropdown } from "react-bootstrap";
import TweetDropdownToggle from "./tweet-dropdown-toggle";
import TweetDropdownMenu from "./tweet-dropdown-menu";

export interface TweetDropdownProps {
  handleShowModifyTweetModal: () => void;
  handleShowDeleteTweetModal: () => void;
}

export default function TweetDropdown({
  handleShowModifyTweetModal,
  handleShowDeleteTweetModal,
}: TweetDropdownProps) {
  return (
    <Dropdown>
      <TweetDropdownToggle />
      <TweetDropdownMenu
        handleShowModifyTweetModal={handleShowModifyTweetModal}
        handleShowDeleteTweetModal={handleShowDeleteTweetModal}
      />
    </Dropdown>
  );
}
