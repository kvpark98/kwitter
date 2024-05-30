import { Modal } from "react-bootstrap";
import SignInWithEmailHeader from "./sign-in-with-email-header";
import SignInWithEmailForm from "./sign-in-with-email-form";

export interface SignInWithEmailProps {
  showSignInWithEmailModal: boolean;
  handleCloseSignInWithEmailModal: () => void;
  emailInputRef: React.RefObject<HTMLInputElement>;
  isLoading: boolean;
  email: string;
  handleEmail: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isEmail: boolean;
  emailErrorMessage: string;
  noSpace: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  resetEmail: () => void;
  signInWithEmail: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
}

export default function SignInWithEmail({
  showSignInWithEmailModal,
  handleCloseSignInWithEmailModal,
  emailInputRef,
  isLoading,
  email,
  handleEmail,
  isEmail,
  emailErrorMessage,
  noSpace,
  resetEmail,
  signInWithEmail,
}: SignInWithEmailProps) {
  return (
    <Modal
      show={showSignInWithEmailModal}
      onHide={handleCloseSignInWithEmailModal}
      backdrop="static"
      keyboard={false}
      className="border-0"
      centered
    >
      <SignInWithEmailHeader />
      <SignInWithEmailForm
        emailInputRef={emailInputRef}
        isLoading={isLoading}
        email={email}
        handleEmail={handleEmail}
        isEmail={isEmail}
        emailErrorMessage={emailErrorMessage}
        noSpace={noSpace}
        resetEmail={resetEmail}
        signInWithEmail={signInWithEmail}
      />
    </Modal>
  );
}
