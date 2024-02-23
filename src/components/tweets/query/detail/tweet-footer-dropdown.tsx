import { Dropdown } from "react-bootstrap";
import TweetFooterDropdownToggle from "./tweet-footer-dropdown-toggle";
import TweetFooterDropdownMenu from "./tweet-footer-dropdown-menu";

export interface TweetFooterDropdownProps {
  handleShowModifyModal: () => void;
  handleShowDeleteModal: () => void;
}

export default function TweetFooterDropdown({
  handleShowModifyModal,
  handleShowDeleteModal,
}: TweetFooterDropdownProps) {
  return (
    <Dropdown>
      <TweetFooterDropdownToggle />
      <TweetFooterDropdownMenu
        handleShowModifyModal={handleShowModifyModal}
        handleShowDeleteModal={handleShowDeleteModal}
      />
    </Dropdown>
  );
}
