import { Button, Container, Navbar } from "react-bootstrap";

export interface ReplyTweetFooterProps {
  handleCloseReplyTweetModal?: () => void;
}

export default function ReplyTweetFooter({
  handleCloseReplyTweetModal,
}: ReplyTweetFooterProps) {
  return (
    <Navbar className="flex-fill rounded-bottom bg-body-light border-top">
      <Container className="d-flex justify-content-end">
        <Button
          variant="dark"
          className="rounded-pill"
          onClick={handleCloseReplyTweetModal}
        >
          Close
        </Button>
      </Container>
    </Navbar>
  );
}
