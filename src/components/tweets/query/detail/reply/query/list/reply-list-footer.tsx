import { Container, Navbar } from "react-bootstrap";
import ReplyListPost from "./reply-list-post";

export interface ReplyListFooterProps {}

export default function ReplyListFooter({}: ReplyListFooterProps) {
  return (
    <Navbar className="flex-fill rounded-bottom bg-body-light border-top">
      <Container className="d-flex">
        <div className="d-flex justify-content-between w-100">
          <ReplyListPost />
        </div>
      </Container>
    </Navbar>
  );
}
