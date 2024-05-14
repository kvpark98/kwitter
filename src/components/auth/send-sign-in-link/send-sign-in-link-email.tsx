import { Form } from "react-bootstrap";

export interface SendSignInLinkEmailProps {
  emailInputRef: React.RefObject<HTMLInputElement>;
  email: string;
  handleEmail: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isEmail: boolean;
  emailErrorMessage: string;
  noSpace: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

export default function SendSignInLinkEmail({
  emailInputRef,
  email,
  handleEmail,
  isEmail,
  emailErrorMessage,
  noSpace,
}: SendSignInLinkEmailProps) {
  return (
    <Form.Group>
      <Form.Label htmlFor="email">
        Provide your registered email address, and we'll send you a link for
        signing in.
      </Form.Label>
      <Form.Control
        ref={emailInputRef}
        className="border-none mt-1 mb-1 rounded-pill"
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
