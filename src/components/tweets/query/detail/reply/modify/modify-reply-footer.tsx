import { Container, Navbar } from "react-bootstrap";
import ModifyReplyReset from "./modify-reply-reset.tsx";
import ModifyReplySubmit from "./modify-reply-submit.tsx";

export interface ModifyReplyFooterProps {
  isLoading: boolean;
  isNewReply: boolean;
  resetReply: () => void;
}

export default function ModifyReplyFooter({
  isLoading,
  isNewReply,
  resetReply,
}: ModifyReplyFooterProps) {
  return (
    <Navbar className="flex-fill rounded-bottom bg-body-light border-top">
      <Container className="d-flex">
        <div className="d-flex justify-content-between w-100">
          <div className="d-flex">
            <ModifyReplyReset resetReply={resetReply} />
          </div>
          <ModifyReplySubmit isLoading={isLoading} isNewReply={isNewReply} />
        </div>
      </Container>
    </Navbar>
  );
}
