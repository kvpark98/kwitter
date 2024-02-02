import { Alert, Form } from "react-bootstrap";
import { Wrapper } from "../../styles/auth-components";
import SignUpErrors from "../../alert/error/auth/sign-up/sign-up-errors";
import SignUpSocialSignIn from "./sign-up-social-sign-in";
import SignUpName from "./sign-up-name";
import SignUpEmail from "./sign-up-email";
import SignUpPassword from "./sign-up-password";
import SignUpPasswordConfirm from "./sign-up-password-confirm";
import SignUpButton from "./sign-up-button";
import SignUpSwitcher from "./sign-up-switcher";

export interface SignUpFormProps {
  isLoading: boolean;
  error: string;
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
  handlePassword: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isPassword: boolean;
  passwordErrorMessage: string;
  passwordConfirmInputRef: React.RefObject<HTMLInputElement>;
  passwordConfirm: string;
  handlePasswordConfirm: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isPasswordConfirm: boolean;
  passwordConfirmErrorMessage: string;
  noSpace: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  reset: () => void;
  signUp: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
}

export default function SignUpForm({
  isLoading,
  error,
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
  handlePassword,
  isPassword,
  passwordErrorMessage,
  passwordConfirmInputRef,
  passwordConfirm,
  handlePasswordConfirm,
  isPasswordConfirm,
  passwordConfirmErrorMessage,
  noSpace,
  reset,
  signUp,
}: SignUpFormProps) {
  return (
    <Wrapper>
      <h1 className="fs-2 mb-2">Sign Up</h1>
      {error && <SignUpErrors error={error} />}
      <Alert variant="light" className="mt-3 px-4 py-4 w-100">
        <Form onSubmit={signUp} className="d-flex flex-column row-gap-3">
          <SignUpName
            nameInputRef={nameInputRef}
            name={name}
            handleName={handleName}
            isName={isName}
            nameErrorMessage={nameErrorMessage}
            noSpace={noSpace}
          />
          <SignUpEmail
            emailInputRef={emailInputRef}
            email={email}
            handleEmail={handleEmail}
            isEmail={isEmail}
            emailErrorMessage={emailErrorMessage}
            noSpace={noSpace}
          />
          <SignUpPassword
            passwordInputRef={passwordInputRef}
            password={password}
            handlePassword={handlePassword}
            isPassword={isPassword}
            passwordErrorMessage={passwordErrorMessage}
            noSpace={noSpace}
          />
          <SignUpPasswordConfirm
            passwordConfirmInputRef={passwordConfirmInputRef}
            passwordConfirm={passwordConfirm}
            handlePasswordConfirm={handlePasswordConfirm}
            isPassword={isPassword}
            isPasswordConfirm={isPasswordConfirm}
            passwordConfirmErrorMessage={passwordConfirmErrorMessage}
            noSpace={noSpace}
          />
          <SignUpButton
            isLoading={isLoading}
            isName={isName}
            isEmail={isEmail}
            isPassword={isPassword}
            isPasswordConfirm={isPasswordConfirm}
          />
        </Form>
        <SignUpSwitcher reset={reset} />
      </Alert>
      <SignUpSocialSignIn />
    </Wrapper>
  );
}
