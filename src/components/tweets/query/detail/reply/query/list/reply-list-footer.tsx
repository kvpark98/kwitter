import { Container, Navbar } from "react-bootstrap";
import ReplyListPost from "./reply-list-post";
import ReplyListFilter from "./reply-list-filter";
import { IReply } from "../detail/reply";

export interface ReplyListFooterProps {
  replys: IReply[];
  isOpenReplyTweetModal?: boolean;
  handleShowCreateReplyModal: () => void;
  sortOrder: boolean;
  handleSortOrder: () => void;
}

export default function ReplyListFooter({
  replys,
  isOpenReplyTweetModal,
  handleShowCreateReplyModal,
  sortOrder,
  handleSortOrder,
}: ReplyListFooterProps) {
  return (
    <Navbar className="flex-fill rounded-bottom bg-body-light border-top">
      <Container className="d-flex">
        <div
          className={
            replys.length !== 0
              ? "d-flex justify-content-between w-100"
              : "d-flex justify-content-end w-100"
          }
        >
          {replys.length !== 0 && (
            <ReplyListFilter
              sortOrder={sortOrder}
              handleSortOrder={handleSortOrder}
            />
          )}
          {!isOpenReplyTweetModal && (
            <ReplyListPost
              handleShowCreateReplyModal={handleShowCreateReplyModal}
            />
          )}
        </div>
      </Container>
    </Navbar>
  );
}
