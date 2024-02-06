import { Form } from "react-bootstrap";

export interface SignInWithEmailEmailProps {
  emailInputRef: React.RefObject<HTMLInputElement>;
  email: string;
  handleEmail: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isEmail: boolean;
  emailErrorMessage: string;
  noSpace: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

export default function SignInWithEmailEmail({
  emailInputRef,
  email,
  handleEmail,
  isEmail,
  emailErrorMessage,
  noSpace,
}: SignInWithEmailEmailProps) {
  return (
    <Form.Group>
      <Form.Label htmlFor="email">
        Please provide the email address to which the initial link was sent.
      </Form.Label>
      <Form.Control
        ref={emailInputRef}
        className="border-none mt-1 mb-1"
        onChange={handleEmail}
        onKeyDown={noSpace}
        id="email"
        name="email"
        value={email}
        type="text"
        maxLength={50}
      />
      {!isEmail && emailErrorMessage && (
        <div className="mt-2 text-danger">{emailErrorMessage}</div>
      )}
    </Form.Group>
  );
}
