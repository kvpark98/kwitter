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
  password: string;
  handlePassword: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isPassword: boolean;
  handleRememberMe: () => void;
  noSpace: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  reset: () => void;
  signIn: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
}

export default function SignInForm({
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
          password={password}
          handlePassword={handlePassword}
          noSpace={noSpace}
        />
        <SignInRememberMe handleRememberMe={handleRememberMe} />
      </Alert>
      <SignInFooter
        isLoading={isLoading}
        isEmail={isEmail}
        isPassword={isPassword}
        reset={reset}
      />
    </Form>
  );
}
