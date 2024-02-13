import { Alert, Form } from "react-bootstrap";
import EmailNotVerifiedError from "../../alert/error/auth/sign-in/email-not-verified-error";
import SignInErrors from "../../alert/error/auth/sign-in/sign-in-errors";
import PasswordChangeSuccess from "../../alert/success/auth/sign-in/password-change-success";
import EmailVerificationNeededWarning from "../../alert/warning/auth/sign-in/email-verification-needed-warning";
import { Wrapper } from "../../styles/auth-components";
import SignInEmail from "./sign-in-email";
import SignInPassword from "./sign-in-password";
import SignInRememberMe from "./sign-in-remember-me";
import SignInButton from "./sign-in-button";
import SignInSwitcher from "./sign-in-switcher";
import AccountDeleteSuccess from "../../alert/success/auth/sign-in/account-delete-success";

export interface SignInFormProps {
  emailInputRef: React.RefObject<HTMLInputElement>;
  isLoading: boolean;
  error: string;
  isVerificationNeeded: string;
  isPasswordChanged: string;
  accountDeleted: string;
  showEmailNotVerified: boolean;
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
  error,
  isVerificationNeeded,
  isPasswordChanged,
  accountDeleted,
  showEmailNotVerified,
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
    <Wrapper>
      <h1 className="fs-2 mb-2">Sign In</h1>
      {isVerificationNeeded && !error && <EmailVerificationNeededWarning />}
      {isPasswordChanged && !error && <PasswordChangeSuccess />}
      {accountDeleted && !error && <AccountDeleteSuccess />}
      {showEmailNotVerified && !error && <EmailNotVerifiedError />}
      {error && <SignInErrors error={error} />}
      <Alert variant="light" className="mt-3 px-4 py-4 w-100">
        <Form onSubmit={signIn} className="d-flex flex-column row-gap-3">
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
          <SignInButton
            isLoading={isLoading}
            isEmail={isEmail}
            isPassword={isPassword}
          />
        </Form>
        <SignInSwitcher reset={reset} />
      </Alert>
    </Wrapper>
  );
}
