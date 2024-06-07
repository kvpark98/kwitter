import { Alert, Form } from "react-bootstrap";
import SignInEmail from "./sign-in-email";
import SignInPassword from "./sign-in-password";
import SignInRememberMe from "./sign-in-remember-me";
import SignInFooter from "./sign-in-footer";

export interface SignInFormProps {
  emailInputRef: React.RefObject<HTMLInputElement>;
  isLoading: boolean;
  email: string;
  handleEmail: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isEmail: boolean;
  emailErrorMessage: string;
  passwordInputType: boolean;
  changePasswordType: () => void;
  password: string;
  handleSignInPassword: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isPassword: boolean;
  handleRememberMe: () => void;
  noSpace: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  resetSignIn: () => void;
  signIn: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
  handleShowSendSignInLinkModal: () => void;
}

export default function SignInForm({
  emailInputRef,
  isLoading,
  email,
  handleEmail,
  isEmail,
  emailErrorMessage,
  passwordInputType,
  changePasswordType,
  password,
  handleSignInPassword,
  isPassword,
  handleRememberMe,
  noSpace,
  resetSignIn,
  signIn,
  handleShowSendSignInLinkModal,
}: SignInFormProps) {
  return (
    <Form onSubmit={signIn}>
      <Alert
        variant="light"
        className="d-flex flex-column row-gap-3 border-0 m-0 p-4 w-100"
      >
        <SignInEmail
          emailInputRef={emailInputRef}
          email={email}
          handleEmail={handleEmail}
          isEmail={isEmail}
          emailErrorMessage={emailErrorMessage}
          noSpace={noSpace}
        />
        <SignInPassword
          passwordInputType={passwordInputType}
          changePasswordType={changePasswordType}
          password={password}
          handleSignInPassword={handleSignInPassword}
          noSpace={noSpace}
          handleShowSendSignInLinkModal={handleShowSendSignInLinkModal}
        />
        <SignInRememberMe handleRememberMe={handleRememberMe} />
      </Alert>
      <SignInFooter
        isLoading={isLoading}
        isEmail={isEmail}
        isPassword={isPassword}
        resetSignIn={resetSignIn}
      />
    </Form>
  );
}
