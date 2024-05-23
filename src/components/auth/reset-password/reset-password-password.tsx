import { Form } from "react-bootstrap";

export interface ResetPasswordPasswordProps {
  passwordInputRef: React.RefObject<HTMLInputElement>;
  password: string;
  handlePassword: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isPassword: boolean;
  passwordErrorMessage: string;
  noSpace: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

export default function ResetPasswordPassword({
  passwordInputRef,
  password,
  handlePassword,
  isPassword,
  passwordErrorMessage,
  noSpace,
}: ResetPasswordPasswordProps) {
  return (
    <Form.Group>
      <Form.Label htmlFor="password">New Password</Form.Label>
      <Form.Control
        ref={passwordInputRef}
        className="border-none mt-1 mb-1 rounded-pill"
        onChange={handlePassword}
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
