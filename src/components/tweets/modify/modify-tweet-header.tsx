import { CloseButton, Container, Navbar } from "react-bootstrap";

export interface ModifyTweetHeaderProps {
  handleCloseModifyTweetModal: () => void;
}

export default function ModifyTweetHeader({
  handleCloseModifyTweetModal,
}: ModifyTweetHeaderProps) {
  return (
    <Navbar className="bg-body-light rounded-top border-bottom">
      <Container>
        <Navbar.Brand className="me-0 fw-bold">Edit Tweet</Navbar.Brand>
        <CloseButton onClick={handleCloseModifyTweetModal} />
      </Container>
    </Navbar>
  );
}
