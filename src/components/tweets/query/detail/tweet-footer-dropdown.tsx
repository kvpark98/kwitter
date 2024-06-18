import { Dropdown } from "react-bootstrap";
import TweetFooterDropdownToggle from "./tweet-footer-dropdown-toggle";
import TweetFooterDropdownMenu from "./tweet-footer-dropdown-menu";
import { User } from "firebase/auth";

export interface TweetFooterDropdownProps {
  user: User | null;
  userId: string;
  handleShowModifyTweetModal: () => void;
  handleShowDeleteModal: () => void;
  handleShowCreateReplyModal: () => void;
}

export default function TweetFooterDropdown({
  user,
  userId,
  handleShowModifyTweetModal,
  handleShowDeleteModal,
  handleShowCreateReplyModal,
}: TweetFooterDropdownProps) {
  return (
    <Dropdown>
      <TweetFooterDropdownToggle />
      <TweetFooterDropdownMenu
        user={user}
        userId={userId}
        handleShowModifyTweetModal={handleShowModifyTweetModal}
        handleShowDeleteModal={handleShowDeleteModal}
        handleShowCreateReplyModal={handleShowCreateReplyModal}
      />
    </Dropdown>
  );
}
