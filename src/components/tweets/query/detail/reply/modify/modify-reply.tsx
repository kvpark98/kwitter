import { Form, Modal } from "react-bootstrap";
import ModifyTweetBody from "../../../../modify/modify-tweet-body";
import ModifyReplyHeader from "./modify-reply-header";
import ModifyReplyFooter from "./modify-reply-footer";

export interface ModifyReplyProps {
  isLoading: boolean;
  replyTextAreaRef: React.RefObject<HTMLTextAreaElement>;
  reply: string;
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
  reply,
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
        {/* <ModifyTweetBody
          messageTextAreaRef={messageTextAreaRef}
          message={message}
          newMessage={newMessage}
          handleNewMessage={handleNewMessage}
        /> */}
        <ModifyReplyFooter
          isLoading={isLoading}
          isNewReply={isNewReply}
          resetReply={resetReply}
        />
      </Form>
    </Modal>
  );
}
