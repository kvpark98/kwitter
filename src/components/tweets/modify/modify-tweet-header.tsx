import { CloseButton, Container, Navbar } from "react-bootstrap";

export interface ModifyTweetHeaderProps {
  handleCloseTweetModifyModal: () => void;
}

export default function ModifyTweetHeader({
  handleCloseTweetModifyModal,
}: ModifyTweetHeaderProps) {
  return (
    <Navbar className="bg-body-light rounded-top border-bottom">
      <Container>
        <Navbar.Brand className="me-0 fw-bold">Edit Tweet</Navbar.Brand>
        <CloseButton onClick={handleCloseTweetModifyModal} />
      </Container>
    </Navbar>
  );
}
