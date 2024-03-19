import { Dropdown } from "react-bootstrap";
import TweetFooterDropdownToggle from "./tweet-footer-dropdown-toggle";
import TweetFooterDropdownMenu from "./tweet-footer-dropdown-menu";

export interface TweetFooterDropdownProps {
  handleShowTweetModifyModal: () => void;
  handleShowDeleteModal: () => void;
}

export default function TweetFooterDropdown({
  handleShowTweetModifyModal,
  handleShowDeleteModal,
}: TweetFooterDropdownProps) {
  return (
    <Dropdown>
      <TweetFooterDropdownToggle />
      <TweetFooterDropdownMenu
        handleShowTweetModifyModal={handleShowTweetModifyModal}
        handleShowDeleteModal={handleShowDeleteModal}
      />
    </Dropdown>
  );
}
