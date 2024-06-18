import { CloseButton, Container, Navbar } from "react-bootstrap";

export interface CreateReplyHeaderProps {
  handleCloseCreateReplyModal: () => void;
}

export default function CreateReplyHeader({
  handleCloseCreateReplyModal,
}: CreateReplyHeaderProps) {
  return (
    <Navbar className="bg-body-light rounded-top border-bottom">
      <Container>
        <Navbar.Brand className="me-0 fw-bold">Post reply</Navbar.Brand>
        <CloseButton onClick={handleCloseCreateReplyModal} />
      </Container>
    </Navbar>
  );
}
