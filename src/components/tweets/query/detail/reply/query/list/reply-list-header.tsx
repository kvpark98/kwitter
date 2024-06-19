import { CloseButton, Container, Navbar } from "react-bootstrap";

export interface ReplyListHeaderProps {
  handleCloseCreateReplyModal: () => void;
}

export default function ReplyListHeader({
  handleCloseCreateReplyModal,
}: ReplyListHeaderProps) {
  return (
    <Navbar className="bg-body-light rounded-top border-bottom">
      <Container>
        <Navbar.Brand className="me-0 fw-bold">Replys</Navbar.Brand>
        <CloseButton onClick={handleCloseCreateReplyModal} />
      </Container>
    </Navbar>
  );
}
