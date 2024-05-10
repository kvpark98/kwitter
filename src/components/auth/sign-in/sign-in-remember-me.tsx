import { Form } from "react-bootstrap";

export interface SignInRememberMeProps {
  handleRememberMe: () => void;
}

export default function SignInRememberMe({
  handleRememberMe,
}: SignInRememberMeProps) {
  return (
    <div>
      <Form.Check
        onClick={handleRememberMe}
        type="checkbox"
        id="remember-me"
        label="Remember Me"
        className="m-0 rounded-4"
      />
    </div>
  );
}
