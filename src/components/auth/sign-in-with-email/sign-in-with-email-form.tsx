import { Alert, Form } from "react-bootstrap";
import SignInWithEmailSwitcher from "./sign-in-with-email-switcher";
import { Wrapper } from "../../styles/auth-components";
import EmailLinkValidatedSuccess from "../../alert/success/auth/sign-in-with-email/email-link-validate-success";
import { isSignInWithEmailLink } from "firebase/auth";
import { auth } from "../../../firebase";
import SignInWithEmailErrors from "../../alert/error/auth/sign-in-with-email/sign-in-with-email-errors";
import SignInWithEmailButton from "./sign-in-with-email-button";
import SignInWithEmailEmail from "./sign-in-with-email-email";

export interface SignInWithEmailFormProps {
  emailInputRef: React.RefObject<HTMLInputElement>;
  isLoading: boolean;
  error: string;
  email: string;
  handleEmail: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isEmail: boolean;
  emailErrorMessage: string;
  noSpace: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  reset: () => void;
  signInWithEmail: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
}

export default function SignInWithEmailForm({
  emailInputRef,
  isLoading,
  error,
  email,
  handleEmail,
  isEmail,
  emailErrorMessage,
  noSpace,
  reset,
  signInWithEmail,
}: SignInWithEmailFormProps) {
  return (
    <Wrapper>
      <h1 className="fs-2 mb-2">Sign In With Email Link</h1>
      {isSignInWithEmailLink(auth, window.location.href) && (
        <EmailLinkValidatedSuccess />
      )}
      {error && <SignInWithEmailErrors error={error} />}
      <Alert variant="light" className="mt-3 px-4 py-4 w-100">
        <Form
          onSubmit={signInWithEmail}
          className="d-flex flex-column row-gap-3"
        >
          <SignInWithEmailEmail
            emailInputRef={emailInputRef}
            email={email}
            handleEmail={handleEmail}
            isEmail={isEmail}
            emailErrorMessage={emailErrorMessage}
            noSpace={noSpace}
          />
          <SignInWithEmailButton isLoading={isLoading} isEmail={isEmail} />
        </Form>
        <SignInWithEmailSwitcher reset={reset} />
      </Alert>
    </Wrapper>
  );
}
