import { CloseButton, Container, Navbar } from "react-bootstrap";
import { IReply } from "../detail/reply";

export interface ReplyListHeaderProps {
  replys: IReply[];
  handleCloseReplyListModal?: () => void;
}

export default function ReplyListHeader({
  replys,
  handleCloseReplyListModal,
}: ReplyListHeaderProps) {
  return (
    <Navbar className="bg-body-light rounded-top border-bottom">
      <Container>
        <Navbar.Brand className="me-0 fw-bold">
          Replies ({replys.length})
        </Navbar.Brand>
        <CloseButton onClick={handleCloseReplyListModal} />
      </Container>
    </Navbar>
  );
}
