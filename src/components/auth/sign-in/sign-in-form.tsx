import { Alert, Form } from "react-bootstrap";
import EmailNotVerifiedError from "../../alert/error/auth/sign-in/email-not-verified-error";
import SignInErrors from "../../alert/error/auth/sign-in/sign-in-errors";
import PasswordDeleteSuccess from "../../alert/success/auth/sign-in/account-delete-success";
import PasswordChangeSuccess from "../../alert/success/auth/sign-in/password-change-success";
import EmailVerificationNeededWarning from "../../alert/warning/auth/sign-in/email-verification-needed-warning";
import { Wrapper } from "../../styles/auth-components";
import SignInSocialSignIn from "./sign-in-social-sign-in";
import SignInEmail from "./sign-in-email";
import SignInPassword from "./sign-in-password";
import SignInRememberMe from "./sign-in-remember-me";
import SignInButton from "./sign-in-button";
import SignInSwitcher from "./sign-in-switcher";

export interface SignInFormProps {
  isLoading: boolean;
  error: string;
  isVerificationNeeded: string;
  isPasswordChanged: string;
  accountDeleted: string;
  showEmailNotVerified: boolean;
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
  handleRememberMe: () => void;
  noSpace: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  reset: () => void;
  signIn: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
}

export default function SignInForm({
  isLoading,
  error,
  isVerificationNeeded,
  isPasswordChanged,
  accountDeleted,
  showEmailNotVerified,
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
      {accountDeleted && !error && <PasswordDeleteSuccess />}
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
            passwordInputRef={passwordInputRef}
            password={password}
            handlePassword={handlePassword}
            isPassword={isPassword}
            passwordErrorMessage={passwordErrorMessage}
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
      <SignInSocialSignIn />
    </Wrapper>
  );
}
