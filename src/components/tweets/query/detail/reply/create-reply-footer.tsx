import { Container, Navbar } from "react-bootstrap";
import CreateReplyReset from "./create-reply-reset";
import CreateReplySubmit from "./create-reply-submit";

export interface CreateReplyFooterProps {
  isLoading: boolean;
  isReply: boolean;
  resetReply: () => void;
}

export default function CreateReplyFooter({
  isLoading,
  isReply,
  resetReply,
}: CreateReplyFooterProps) {
  return (
    <Navbar className="flex-fill rounded-bottom bg-body-light border-top">
      <Container className="d-flex">
        <div className="d-flex justify-content-between w-100">
          <div className="d-flex">
            <CreateReplyReset resetReply={resetReply} />
          </div>
          <CreateReplySubmit isLoading={isLoading} isReply={isReply} />
        </div>
      </Container>
    </Navbar>
  );
}
