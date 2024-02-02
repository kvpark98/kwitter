import { Form } from "react-bootstrap";

export interface SignUpPasswordProps {
  passwordInputRef: React.RefObject<HTMLInputElement>;
  password: string;
  handlePassword: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isPassword: boolean;
  passwordErrorMessage: string;
  noSpace: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

export default function SignUpPassword({
  passwordInputRef,
  password,
  handlePassword,
  isPassword,
  passwordErrorMessage,
  noSpace,
}: SignUpPasswordProps) {
  return (
    <Form.Group>
      <Form.Label htmlFor="password">Password</Form.Label>
      <Form.Control
        ref={passwordInputRef}
        className="border-none mt-1 mb-1"
        onChange={handlePassword}
        onKeyDown={noSpace}
        id="password"
        name="password"
        value={password}
        type="password"
        autoComplete="new-password"
        maxLength={20}
      />
      {!isPassword && passwordErrorMessage && (
        <div className="mt-2 text-danger">{passwordErrorMessage}</div>
      )}
    </Form.Group>
  );
}
