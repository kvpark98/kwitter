import { Alert, Form } from "react-bootstrap";
import SignInWithEmailEmail from "./sign-in-with-email-email";
import SignInWithEmailFooter from "./sign-in-with-email-footer";

export interface SignInWithEmailFormProps {
  emailInputRef: React.RefObject<HTMLInputElement>;
  isLoading: boolean;
  email: string;
  handleEmail: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isEmail: boolean;
  emailErrorMessage: string;
  noSpace: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  resetEmail: () => void;
  signInWithEmail: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
}

export default function SignInWithEmailForm({
  emailInputRef,
  isLoading,
  email,
  handleEmail,
  isEmail,
  emailErrorMessage,
  noSpace,
  resetEmail,
  signInWithEmail,
}: SignInWithEmailFormProps) {
  return (
    <Form onSubmit={signInWithEmail}>
      <Alert
        variant="light"
        className="overflow-y-auto d-flex flex-column row-gap-3 border-0 m-0 p-4 w-100"
        style={{ maxHeight: "500px" }}
      >
        <SignInWithEmailEmail
          emailInputRef={emailInputRef}
          email={email}
          handleEmail={handleEmail}
          isEmail={isEmail}
          emailErrorMessage={emailErrorMessage}
          noSpace={noSpace}
        />
      </Alert>
      <SignInWithEmailFooter
        isLoading={isLoading}
        isEmail={isEmail}
        resetEmail={resetEmail}
      />
    </Form>
  );
}
