import { Form, Modal } from "react-bootstrap";
import ModifyReplyHeader from "./modify-reply-header";
import ModifyReplyFooter from "./modify-reply-footer";
import ModifyReplyBody from "./modify-reply-body";

export interface ModifyReplyProps {
  isLoading: boolean;
  replyTextAreaRef: React.RefObject<HTMLTextAreaElement>;
  newReply: string;
  handleNewReply: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  isNewReply: boolean;
  resetReply: () => void;
  modifyReply: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
  showModifyReplyModal: boolean;
  handleCloseModifyReplyModal: () => void;
}

export default function ModifyReply({
  isLoading,
  replyTextAreaRef,
  newReply,
  handleNewReply,
  isNewReply,
  resetReply,
  modifyReply,
  showModifyReplyModal,
  handleCloseModifyReplyModal,
}: ModifyReplyProps) {
  return (
    <Modal
      show={showModifyReplyModal}
      onHide={handleCloseModifyReplyModal}
      backdrop="static"
      keyboard={false}
      className="border-0"
      centered
    >
      <ModifyReplyHeader
        handleCloseModifyReplyModal={handleCloseModifyReplyModal}
      />
      <Form className="w-100" onSubmit={modifyReply}>
        <ModifyReplyBody
          replyTextAreaRef={replyTextAreaRef}
          newReply={newReply}
          handleNewReply={handleNewReply}
        />
        <ModifyReplyFooter
          isLoading={isLoading}
          isNewReply={isNewReply}
          resetReply={resetReply}
        />
      </Form>
    </Modal>
  );
}
