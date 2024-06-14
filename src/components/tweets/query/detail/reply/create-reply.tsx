import { Form, Modal } from "react-bootstrap";
import CreateReplyHeader from "./create-reply-header";
import CreateReplyBody from "./create-reply-body";
import CreateReplyFooter from "./create-reply-footer";

export interface CreateReplyProps {
  showReplyModal: boolean;
  handleCloseReplyModal: () => void;
  isLoading: boolean;
  reply: string;
  isReply: boolean;
  handleReply: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  resetReply: () => void;
  createReply: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
}

export default function CreateReply({
  showReplyModal,
  handleCloseReplyModal,
  isLoading,
  reply,
  isReply,
  handleReply,
  resetReply,
  createReply,
}: CreateReplyProps) {
  return (
    <Modal
      show={showReplyModal}
      onHide={handleCloseReplyModal}
      backdrop="static"
      keyboard={false}
      className="border-0"
      centered
    >
      <CreateReplyHeader handleCloseReplyModal={handleCloseReplyModal} />
      <Form className="w-100" onSubmit={createReply}>
        <CreateReplyBody reply={reply} handleReply={handleReply} />
        <CreateReplyFooter
          isLoading={isLoading}
          isReply={isReply}
          resetReply={resetReply}
        />
      </Form>
    </Modal>
  );
}
