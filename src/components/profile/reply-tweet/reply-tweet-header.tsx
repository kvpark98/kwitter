import { CloseButton, Container, Navbar } from "react-bootstrap";

export interface ReplyTweetHeaderProps {
  handleCloseReplyTweetModal?: () => void;
}

export default function ReplyTweetHeader({
  handleCloseReplyTweetModal,
}: ReplyTweetHeaderProps) {
  return (
    <Navbar className="bg-body-light rounded-top border-bottom">
      <Container>
        <Navbar.Brand className="me-0 fw-bold">Tweet</Navbar.Brand>
        <CloseButton onClick={handleCloseReplyTweetModal} />
      </Container>
    </Navbar>
  );
}
