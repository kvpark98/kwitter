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
  handleSignInPassword: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isPassword: boolean;
  handleRememberMe: () => void;
  noSpace: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  resetSignIn: () => void;
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
  handleSignInPassword,
  isPassword,
  handleRememberMe,
  noSpace,
  resetSignIn,
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
        handleSignInPassword={handleSignInPassword}
        isPassword={isPassword}
        handleRememberMe={handleRememberMe}
        noSpace={noSpace}
        resetSignIn={resetSignIn}
        signIn={signIn}
      />
    </Modal>
  );
}
