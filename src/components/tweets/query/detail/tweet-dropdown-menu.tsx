import { Dropdown } from "react-bootstrap";
import { User } from "firebase/auth";
import TweetDropdownMenuReplyList from "./tweet-dropdown-menu-reply-list";
import TweetDropdownMenuEdit from "./tweet-dropdown-menu-edit";
import TweetDropdownMenuDelete from "./tweet-dropdown-menu-delete";
import { IReply } from "./reply/query/detail/reply";

export interface TweetDropdownMenuProps {
  user: User | null;
  tweetUserId: string;
  replys: IReply[];
  handleShowModifyTweetModal: () => void;
  handleShowDeleteModal: () => void;
  handleShowReplyListModal: () => void;
}

export default function TweetDropdownMenu({
  user,
  tweetUserId,
  replys,
  handleShowModifyTweetModal,
  handleShowDeleteModal,
  handleShowReplyListModal,
}: TweetDropdownMenuProps) {
  return (
    <Dropdown.Menu>
      <TweetDropdownMenuReplyList
        replys={replys}
        handleShowReplyListModal={handleShowReplyListModal}
      />
      {user?.uid === tweetUserId && (
        <>
          <TweetDropdownMenuEdit
            handleShowModifyTweetModal={handleShowModifyTweetModal}
          />
          <TweetDropdownMenuDelete
            handleShowDeleteModal={handleShowDeleteModal}
          />
        </>
      )}
    </Dropdown.Menu>
  );
}
