import SendSignInLinkForm from "./send-sign-in-link-form";
import { Modal } from "react-bootstrap";
import SendSignInLinkHeader from "./send-sign-in-link-header";

export interface SendSignInLinkProps {
  signInLinkEmailInputRef: React.RefObject<HTMLInputElement>;
  showSendSignInLinkModal: boolean;
  handleCloseSendSignInLinkModal: () => void;
  isLoading: boolean;
  email: string;
  handleEmail: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isEmail: boolean;
  emailErrorMessage: string;
  noSpace: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  resetEmail: () => void;
  sendSignInLink: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
}

export default function SendSignInLink({
  signInLinkEmailInputRef,
  showSendSignInLinkModal,
  handleCloseSendSignInLinkModal,
  isLoading,
  email,
  handleEmail,
  isEmail,
  emailErrorMessage,
  noSpace,
  resetEmail,
  sendSignInLink,
}: SendSignInLinkProps) {
  return (
    <Modal
      show={showSendSignInLinkModal}
      onHide={handleCloseSendSignInLinkModal}
      backdrop="static"
      keyboard={false}
      className="border-0"
      centered
    >
      <SendSignInLinkHeader
        handleCloseSendSignInLinkModal={handleCloseSendSignInLinkModal}
      />
      <SendSignInLinkForm
        signInLinkEmailInputRef={signInLinkEmailInputRef}
        isLoading={isLoading}
        email={email}
        handleEmail={handleEmail}
        isEmail={isEmail}
        emailErrorMessage={emailErrorMessage}
        noSpace={noSpace}
        resetEmail={resetEmail}
        sendSignInLink={sendSignInLink}
      />
    </Modal>
  );
}
