import { Button } from "react-bootstrap";

export interface SignInSubmitProps {
  isLoading: boolean;
  isEmail: boolean;
  isPassword: boolean;
}

export default function SignInSubmit({
  isLoading,
  isEmail,
  isPassword,
}: SignInSubmitProps) {
  return (
    <Button
      type="submit"
      variant="primary"
      className="fw-bold rounded-pill"
      {...(!isEmail || !isPassword ? { disabled: true } : { disabled: false })}
    >
      {isLoading ? "Signing in..." : "Sign in"}
    </Button>
  );
}
