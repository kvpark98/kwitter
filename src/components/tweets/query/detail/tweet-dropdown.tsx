import { Dropdown } from "react-bootstrap";
import { User } from "firebase/auth";
import TweetDropdownToggle from "./tweet-dropdown-toggle";
import TweetDropdownMenu from "./tweet-dropdown-menu";
import { IReply } from "./reply/query/detail/reply";

export interface TweetDropdownProps {
  user: User | null;
  tweetUserId: string;
  replys: IReply[];
  handleShowModifyTweetModal: () => void;
  handleShowDeleteTweetModal: () => void;
  handleShowReplyListModal: () => void;
}

export default function TweetDropdown({
  user,
  tweetUserId,
  replys,
  handleShowModifyTweetModal,
  handleShowDeleteTweetModal,
  handleShowReplyListModal,
}: TweetDropdownProps) {
  return (
    <Dropdown>
      <TweetDropdownToggle />
      <TweetDropdownMenu
        user={user}
        tweetUserId={tweetUserId}
        replys={replys}
        handleShowModifyTweetModal={handleShowModifyTweetModal}
        handleShowDeleteTweetModal={handleShowDeleteTweetModal}
        handleShowReplyListModal={handleShowReplyListModal}
      />
    </Dropdown>
  );
}
