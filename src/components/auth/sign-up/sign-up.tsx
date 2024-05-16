import SignUpForm from "./sign-up-form";
import { Modal } from "react-bootstrap";
import SignUpHeader from "./sign-up-header";

export interface SignUpProps {
  showSignUpModal: boolean;
  handleCloseSignUpModal: () => void;
  isLoading: boolean;
  nameInputRef: React.RefObject<HTMLInputElement>;
  name: string;
  handleName: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isName: boolean;
  nameErrorMessage: string;
  emailInputRef: React.RefObject<HTMLInputElement>;
  email: string;
  handleEmail: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isEmail: boolean;
  emailErrorMessage: string;
  passwordInputRef: React.RefObject<HTMLInputElement>;
  password: string;
  handleSignUpPassword: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isPassword: boolean;
  passwordErrorMessage: string;
  passwordConfirmInputRef: React.RefObject<HTMLInputElement>;
  passwordConfirm: string;
  handleSignUpPasswordConfirm: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
  isPasswordConfirm: boolean;
  passwordConfirmErrorMessage: string;
  noSpace: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  resetSignUp: () => void;
  signUp: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
}

export default function SignUp({
  showSignUpModal,
  handleCloseSignUpModal,
  isLoading,
  nameInputRef,
  name,
  handleName,
  isName,
  nameErrorMessage,
  emailInputRef,
  email,
  handleEmail,
  isEmail,
  emailErrorMessage,
  passwordInputRef,
  password,
  handleSignUpPassword,
  isPassword,
  passwordErrorMessage,
  passwordConfirmInputRef,
  passwordConfirm,
  handleSignUpPasswordConfirm,
  isPasswordConfirm,
  passwordConfirmErrorMessage,
  noSpace,
  resetSignUp,
  signUp,
}: SignUpProps) {
  return (
    <Modal
      show={showSignUpModal}
      onHide={handleCloseSignUpModal}
      backdrop="static"
      keyboard={false}
      className="border-0"
      centered
    >
      <SignUpHeader handleCloseSignUpModal={handleCloseSignUpModal} />
      <SignUpForm
        isLoading={isLoading}
        nameInputRef={nameInputRef}
        name={name}
        handleName={handleName}
        isName={isName}
        nameErrorMessage={nameErrorMessage}
        emailInputRef={emailInputRef}
        email={email}
        handleEmail={handleEmail}
        isEmail={isEmail}
        emailErrorMessage={emailErrorMessage}
        passwordInputRef={passwordInputRef}
        password={password}
        handleSignUpPassword={handleSignUpPassword}
        isPassword={isPassword}
        passwordErrorMessage={passwordErrorMessage}
        passwordConfirmInputRef={passwordConfirmInputRef}
        passwordConfirm={passwordConfirm}
        handleSignUpPasswordConfirm={handleSignUpPasswordConfirm}
        isPasswordConfirm={isPasswordConfirm}
        passwordConfirmErrorMessage={passwordConfirmErrorMessage}
        noSpace={noSpace}
        resetSignUp={resetSignUp}
        signUp={signUp}
      />
    </Modal>
  );
}
