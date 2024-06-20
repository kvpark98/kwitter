import { Container, Navbar } from "react-bootstrap";
import ReplyListPost from "./reply-list-post";

export interface ReplyListFooterProps {
  handleShowCreateReplyModal: () => void;
}

export default function ReplyListFooter({
  handleShowCreateReplyModal,
}: ReplyListFooterProps) {
  return (
    <Navbar className="flex-fill rounded-bottom bg-body-light border-top">
      <Container className="d-flex">
        <div className="d-flex justify-content-end w-100">
          <ReplyListPost
            handleShowCreateReplyModal={handleShowCreateReplyModal}
          />
        </div>
      </Container>
    </Navbar>
  );
}
