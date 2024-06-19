import { IReply } from "../../../tweet";
import { Modal } from "react-bootstrap";
import ReplyList from "./reply-list";
import { User } from "firebase/auth";
import ReplyListHeader from "./reply-list-header";
import ReplyListFooter from "./reply-list-footer";

export interface ReplyListModalProps {
  replys: IReply[];
  user: User | null;
  avatar: string;
  timeAgo: string | undefined;
  message: string;
  userId: string;
  username: string;
  handleShowModifyTweetModal: () => void;
  handleShowDeleteModal: () => void;
  handleShowCreateReplyModal: () => void;
}

export default function ReplyListModal({
  replys,
  user,
  avatar,
  timeAgo,
  message,
  userId,
  username,
  handleShowModifyTweetModal,
  handleShowDeleteModal,
  handleShowCreateReplyModal,
}: ReplyListModalProps) {
  <Modal
    // show={showCreateReplyModal}
    // onHide={handleCloseCreateReplyModal}
    backdrop="static"
    keyboard={false}
    className="border-0"
    centered
  >
    {/* <ReplyListHeader
      handleCloseCreateReplyModal={handleCloseCreateReplyModal}
    /> */}
    <ReplyList
      replys={replys}
      user={user}
      avatar={avatar}
      timeAgo={timeAgo}
      message={message}
      userId={userId}
      username={username}
      handleShowModifyTweetModal={handleShowModifyTweetModal}
      handleShowDeleteModal={handleShowDeleteModal}
      handleShowCreateReplyModal={handleShowCreateReplyModal}
    />
    <ReplyListFooter />
  </Modal>;
}
