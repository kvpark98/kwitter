import { CloseButton, Container, Navbar } from "react-bootstrap";

export interface CreateTweetHeaderProps {
  handleCloseCreateTweetModal: () => void;
}

export default function CreateTweetHeader({
  handleCloseCreateTweetModal,
}: CreateTweetHeaderProps) {
  return (
    <Navbar className="bg-body-light rounded-top border-bottom">
      <Container>
        <Navbar.Brand className="me-0 fw-bold">Post Tweet</Navbar.Brand>
        <CloseButton onClick={handleCloseCreateTweetModal} />
      </Container>
    </Navbar>
  );
}
