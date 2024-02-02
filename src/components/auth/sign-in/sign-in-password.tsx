import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";

export interface SignInPasswordProps {
  passwordInputRef: React.RefObject<HTMLInputElement>;
  password: string;
  handlePassword: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isPassword: boolean;
  passwordErrorMessage: string;
  noSpace: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

export default function SignInPassword({
  passwordInputRef,
  password,
  handlePassword,
  isPassword,
  passwordErrorMessage,
  noSpace,
}: SignInPasswordProps) {
  return (
    <Form.Group>
      <div className="d-flex justify-content-between align-items-center">
        <Form.Label htmlFor="password">Password</Form.Label>
        <Link to="/send-sign-in-link" className="p-0 mb-2 text-decoration-none">
          Forgot Password?
        </Link>
      </div>
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
