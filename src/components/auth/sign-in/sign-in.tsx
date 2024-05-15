import SignInForm from "./sign-in-form";
import { Modal } from "react-bootstrap";
import SignInHeader from "./sign-in-header";

export interface SignInProps {
  showSignInModal: boolean;
  handleCloseSignInModal: () => void;
  emailInputRef: React.RefObject<HTMLInputElement>;
  isLoading: boolean;
  email: string;
  handleEmail: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isEmail: boolean;
  emailErrorMessage: string;
  password: string;
  handlePassword: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isPassword: boolean;
  handleRememberMe: () => void;
  noSpace: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  reset: () => void;
  signIn: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
}

export default function SignIn({
  showSignInModal,
  handleCloseSignInModal,
  emailInputRef,
  isLoading,
  email,
  handleEmail,
  isEmail,
  emailErrorMessage,
  password,
  handlePassword,
  isPassword,
  handleRememberMe,
  noSpace,
  reset,
  signIn,
}: SignInProps) {
  return (
    <Modal
      show={showSignInModal}
      onHide={handleCloseSignInModal}
      backdrop="static"
      keyboard={false}
      className="border-0"
      centered
    >
      <SignInHeader handleCloseSignInModal={handleCloseSignInModal} />
      <SignInForm
        emailInputRef={emailInputRef}
        isLoading={isLoading}
        email={email}
        handleEmail={handleEmail}
        isEmail={isEmail}
        emailErrorMessage={emailErrorMessage}
        password={password}
        handlePassword={handlePassword}
        isPassword={isPassword}
        handleRememberMe={handleRememberMe}
        noSpace={noSpace}
        reset={reset}
        signIn={signIn}
      />
    </Modal>
  );
}
