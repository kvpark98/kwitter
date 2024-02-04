import { Alert, Form } from "react-bootstrap";
import SendSignInLinkErrors from "../../alert/error/auth/send-sign-in-link/send-sign-in-link-errors";
import PasswordResetLinkSentWarning from "../../alert/warning/auth/send-sign-in-link/password-reset-link-sent-warning";
import { Wrapper } from "../../styles/auth-components";
import SendSignInLinkSwitcher from "./send-sign-in-link-switcher";
import SendSignInLinkButton from "./send-sign-in-link-button";
import SendSignInLinkEmail from "./send-sign-in-link-email";

export interface SendSignInLinkFormProps {
  emailInputRef: React.RefObject<HTMLInputElement>;
  isLoading: boolean;
  error: string;
  email: string;
  handleEmail: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isEmail: boolean;
  emailErrorMessage: string;
  noSpace: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  reset: () => void;
  sendSignInLink: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
  isPasswordResetLinkSent: boolean;
}

export default function SendSignInLinkForm({
  emailInputRef,
  isLoading,
  error,
  email,
  handleEmail,
  isEmail,
  emailErrorMessage,
  noSpace,
  reset,
  sendSignInLink,
  isPasswordResetLinkSent,
}: SendSignInLinkFormProps) {
  return (
    <Wrapper>
      <h1 className="fs-2 mb-2">Request Sign-in Link</h1>
      {isPasswordResetLinkSent && !error && <PasswordResetLinkSentWarning />}
      {error && <SendSignInLinkErrors error={error} />}
      <Alert variant="light" className="mt-3 px-4 py-4 w-100">
        <Form
          onSubmit={sendSignInLink}
          className="d-flex flex-column row-gap-3"
        >
          <SendSignInLinkEmail
            emailInputRef={emailInputRef}
            email={email}
            handleEmail={handleEmail}
            isEmail={isEmail}
            emailErrorMessage={emailErrorMessage}
            noSpace={noSpace}
          />
          <SendSignInLinkButton isLoading={isLoading} isEmail={isEmail} />
        </Form>
        <SendSignInLinkSwitcher reset={reset} />
      </Alert>
    </Wrapper>
  );
}
