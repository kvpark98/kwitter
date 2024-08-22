import Reply, { IReply } from "../detail/reply";
import NoReply from "../../../../../no-reply";
import { Modal } from "react-bootstrap";
import ReplyListFooter from "./reply-list-footer";
import ReplyListHeader from "./reply-list-header";
import { User } from "firebase/auth";

export interface ReplyListProps {
  user: User | null;
  replys: IReply[];
  showReplyListModal?: boolean;
  isOpenReplyTweetModal?: boolean;
  handleCloseReplyListModal?: () => void;
  handleShowCreateReplyModal: () => void;
  setIsReplyDeleted?: React.Dispatch<React.SetStateAction<boolean>>;
  sortCriteria: string;
  handleSortCriteria: (event: React.MouseEvent<HTMLButtonElement>) => void;
  sortOrder: boolean;
  handleSortOrder: () => void;
  resetCriteria: () => void;
}

export default function ReplyList({
  user,
  replys,
  showReplyListModal,
  isOpenReplyTweetModal,
  handleCloseReplyListModal,
  handleShowCreateReplyModal,
  setIsReplyDeleted,
  sortCriteria,
  handleSortCriteria,
  sortOrder,
  handleSortOrder,
  resetCriteria,
}: ReplyListProps) {
  return (
    <Modal
      show={showReplyListModal}
      onHide={handleCloseReplyListModal}
      backdrop="static"
      keyboard={false}
      className="border-0"
      centered
    >
      <ReplyListHeader
        replys={replys}
        handleCloseReplyListModal={handleCloseReplyListModal}
      />
      {replys.length !== 0 ? (
        <div className="overflow-y-auto" style={{ maxHeight: "500px" }}>
          {replys.map((reply) => {
            return (
              <Reply
                key={reply.id}
                user={user}
                setIsReplyDeleted={setIsReplyDeleted}
                isShowReplyTweetModal={isOpenReplyTweetModal}
                {...reply}
              />
            );
          })}
        </div>
      ) : (
        <NoReply />
      )}
      <ReplyListFooter
        replys={replys}
        isOpenReplyTweetModal={isOpenReplyTweetModal}
        handleShowCreateReplyModal={handleShowCreateReplyModal}
        sortCriteria={sortCriteria}
        handleSortCriteria={handleSortCriteria}
        sortOrder={sortOrder}
        handleSortOrder={handleSortOrder}
        resetCriteria={resetCriteria}
      />
    </Modal>
  );
}
