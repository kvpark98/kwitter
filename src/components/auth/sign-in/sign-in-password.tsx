import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";

export interface SignInPasswordProps {
  password: string;
  handleSignInPassword: (event: React.ChangeEvent<HTMLInputElement>) => void;
  noSpace: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

export default function SignInPassword({
  password,
  handleSignInPassword,
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
        className="border-none mt-1 mb-1 rounded-pill"
        onChange={handleSignInPassword}
        onKeyDown={noSpace}
        id="password"
        name="password"
        value={password}
        type="password"
        autoComplete="new-password"
        maxLength={20}
      />
    </Form.Group>
  );
}
