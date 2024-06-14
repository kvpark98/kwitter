import { Dropdown } from "react-bootstrap";
import TweetFooterDropdownToggle from "./tweet-footer-dropdown-toggle";
import TweetFooterDropdownMenu from "./tweet-footer-dropdown-menu";
import { User } from "firebase/auth";

export interface TweetFooterDropdownProps {
  user: User | null;
  userId: string;
  handleShowModifyTweetModal: () => void;
  handleShowDeleteModal: () => void;
  handleShowReplyModal: () => void;
}

export default function TweetFooterDropdown({
  user,
  userId,
  handleShowModifyTweetModal,
  handleShowDeleteModal,
  handleShowReplyModal,
}: TweetFooterDropdownProps) {
  return (
    <Dropdown>
      <TweetFooterDropdownToggle />
      <TweetFooterDropdownMenu
        user={user}
        userId={userId}
        handleShowModifyTweetModal={handleShowModifyTweetModal}
        handleShowDeleteModal={handleShowDeleteModal}
        handleShowReplyModal={handleShowReplyModal}
      />
    </Dropdown>
  );
}
