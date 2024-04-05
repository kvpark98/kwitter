import { Dropdown } from "react-bootstrap";
import TweetFooterDropdownToggle from "./tweet-footer-dropdown-toggle";
import TweetFooterDropdownMenu from "./tweet-footer-dropdown-menu";

export interface TweetFooterDropdownProps {
  handleShowModifyTweetModal: () => void;
  handleShowDeleteModal: () => void;
}

export default function TweetFooterDropdown({
  handleShowModifyTweetModal,
  handleShowDeleteModal,
}: TweetFooterDropdownProps) {
  return (
    <Dropdown>
      <TweetFooterDropdownToggle />
      <TweetFooterDropdownMenu
        handleShowModifyTweetModal={handleShowModifyTweetModal}
        handleShowDeleteModal={handleShowDeleteModal}
      />
    </Dropdown>
  );
}
