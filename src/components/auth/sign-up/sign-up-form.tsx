import { Alert, Form } from "react-bootstrap";
import SignUpName from "./sign-up-name";
import SignUpEmail from "./sign-up-email";
import SignUpPassword from "./sign-up-password";
import SignUpPasswordConfirm from "./sign-up-password-confirm";
import SignUpFooter from "./sign-up-footer";

export interface SignUpFormProps {
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

export default function SignUpForm({
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
}: SignUpFormProps) {
  return (
    <Form onSubmit={signUp}>
      <Alert
        variant="light"
        className="d-flex flex-column row-gap-3 border-0 m-0 p-4 w-100"
      >
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
          handleSignUpPassword={handleSignUpPassword}
          isPassword={isPassword}
          passwordErrorMessage={passwordErrorMessage}
          noSpace={noSpace}
        />
        <SignUpPasswordConfirm
          passwordConfirmInputRef={passwordConfirmInputRef}
          passwordConfirm={passwordConfirm}
          handleSignUpPasswordConfirm={handleSignUpPasswordConfirm}
          isPassword={isPassword}
          isPasswordConfirm={isPasswordConfirm}
          passwordConfirmErrorMessage={passwordConfirmErrorMessage}
          noSpace={noSpace}
        />
      </Alert>
      <SignUpFooter
        isLoading={isLoading}
        isName={isName}
        isEmail={isEmail}
        isPassword={isPassword}
        isPasswordConfirm={isPasswordConfirm}
        resetSignUp={resetSignUp}
      />
    </Form>
  );
}
