import { Form } from "react-bootstrap";

export interface SignUpPasswordProps {
  passwordInputRef: React.RefObject<HTMLInputElement>;
  password: string;
  handleSignUpPassword: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isPassword: boolean;
  passwordErrorMessage: string;
  noSpace: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

export default function SignUpPassword({
  passwordInputRef,
  password,
  handleSignUpPassword,
  isPassword,
  passwordErrorMessage,
  noSpace,
}: SignUpPasswordProps) {
  return (
    <Form.Group>
      <Form.Label htmlFor="password">Password</Form.Label>
      <Form.Control
        ref={passwordInputRef}
        className="border-none mt-1 mb-1 rounded-pill"
        onChange={handleSignUpPassword}
        onKeyDown={noSpace}
        id="password"
        name="password"
        value={password}
        type="password"
        maxLength={20}
        autoComplete="password"
      />
      {!isPassword && passwordErrorMessage && (
        <div className="mt-2 text-danger">{passwordErrorMessage}</div>
      )}
    </Form.Group>
  );
}
