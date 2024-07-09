import { CloseButton, Container, Navbar } from "react-bootstrap";

export interface ModifyReplyHeaderProps {
  handleCloseModifyReplyModal: () => void;
}

export default function ModifyReplyHeader({
  handleCloseModifyReplyModal,
}: ModifyReplyHeaderProps) {
  return (
    <Navbar className="bg-body-light rounded-top border-bottom">
      <Container>
        <Navbar.Brand className="me-0 fw-bold">Edit reply</Navbar.Brand>
        <CloseButton onClick={handleCloseModifyReplyModal} />
      </Container>
    </Navbar>
  );
}
