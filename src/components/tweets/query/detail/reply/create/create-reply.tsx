import { Form, Modal } from "react-bootstrap";
import CreateReplyHeader from "./create-reply-header";
import CreateReplyBody from "./create-reply-body";
import CreateReplyFooter from "./create-reply-footer";

export interface CreateReplyProps {
  showCreateReplyModal: boolean;
  handleCloseCreateReplyModal: () => void;
  isLoading: boolean;
  reply: string;
  isReply: boolean;
  handleReply: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  resetReply: () => void;
  createReply: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
}

export default function CreateReply({
  showCreateReplyModal,
  handleCloseCreateReplyModal,
  isLoading,
  reply,
  isReply,
  handleReply,
  resetReply,
  createReply,
}: CreateReplyProps) {
  return (
    <Modal
      show={showCreateReplyModal}
      onHide={handleCloseCreateReplyModal}
      backdrop="static"
      keyboard={false}
      className="border-0"
      centered
    >
      <CreateReplyHeader
        handleCloseCreateReplyModal={handleCloseCreateReplyModal}
      />
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
