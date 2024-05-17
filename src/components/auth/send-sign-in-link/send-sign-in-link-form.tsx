import { Alert, Form } from "react-bootstrap";
import SendSignInLinkEmail from "./send-sign-in-link-email";
import SendSignInLinkFooter from "./send-sign-in-link-footer";

export interface SendSignInLinkFormProps {
  signInLinkEmailInputRef: React.RefObject<HTMLInputElement>;
  isLoading: boolean;
  email: string;
  handleEmail: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isEmail: boolean;
  emailErrorMessage: string;
  noSpace: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  resetSendSignInLink: () => void;
  sendSignInLink: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
}

export default function SendSignInLinkForm({
  signInLinkEmailInputRef,
  isLoading,
  email,
  handleEmail,
  isEmail,
  emailErrorMessage,
  noSpace,
  resetSendSignInLink,
  sendSignInLink,
}: SendSignInLinkFormProps) {
  return (
    <Form onSubmit={sendSignInLink}>
      <Alert
        variant="light"
        className="d-flex flex-column row-gap-3 border-0 m-0 p-4 w-100"
      >
        <SendSignInLinkEmail
          signInLinkEmailInputRef={signInLinkEmailInputRef}
          email={email}
          handleEmail={handleEmail}
          isEmail={isEmail}
          emailErrorMessage={emailErrorMessage}
          noSpace={noSpace}
        />
      </Alert>
      <SendSignInLinkFooter
        isLoading={isLoading}
        isEmail={isEmail}
        resetSendSignInLink={resetSendSignInLink}
      />
    </Form>
  );
}
